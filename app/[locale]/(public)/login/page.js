"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RiUserLine,
  RiLockLine,
  RiMailLine,
  RiRocketLine,
  RiCheckLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { createClient } from "@/utils/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { locale } = useLanguage();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push(`/${locale}/private`);
      }
    };
    checkUser();

    // Check for success message
    const message = searchParams.get("message");
    if (message === "signup_success") {
      setShowSuccess(true);
    }
  }, [supabase.auth, router, searchParams, locale]);

  const validateForm = (type) => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Por favor ingresa tu email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!formData.password) {
      newErrors.password = "Por favor ingresa tu contraseña";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (type === "signup" && !formData.confirmPassword) {
      newErrors.confirmPassword = "Por favor confirma tu contraseña";
    } else if (
      type === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm("login")) return;

    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("locale", locale);

    startTransition(async () => {
      try {
        await login(formDataObj);
      } catch (error) {
        // Handle any actual errors (not redirects)
        console.error("Login error:", error);
        setLoading(false);
      }
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm("signup")) return;

    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("locale", locale);

    startTransition(async () => {
      try {
        await signup(formDataObj);
      } catch (error) {
        // Handle any actual errors (not redirects)
        console.error("Signup error:", error);
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <RiRocketLine className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Alisson Rodrigues CV
            </h1>
          </div>
          <p className="text-gray-600">
            Un proyecto base completo y listo para usar con Next.js 15, Tailwind
            CSS 4 y autenticación
          </p>
        </div>

        {/* Success Message */}
        {showSuccess ? (
          <div className="bg-white shadow-xl rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiCheckLine className="text-3xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Cuenta Creada Exitosamente!
              </h2>
              <p className="text-gray-600 mb-6">
                Hemos enviado un enlace de confirmación a tu correo electrónico.
                Por favor, revisa tu bandeja de entrada y haz clic en el enlace
                para activar tu cuenta.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/${locale}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={() => {
                    router.replace(`/${locale}/login`);
                    setShowSuccess(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <RiArrowLeftLine />
                  <span>Volver al Login</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl p-6">
            {/* Tab Navigation */}
            <div className="flex mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors cursor-pointer ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors cursor-pointer ${
                  activeTab === "signup"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Crear Cuenta
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiMailLine className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Email"
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Contraseña"
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || isPending}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading || isPending ? "Cargando..." : "Iniciar Sesión"}
                </button>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiMailLine className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Email"
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Contraseña"
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockLine className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirmar Contraseña"
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || isPending}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading || isPending ? "Cargando..." : "Crear Cuenta"}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Al crear una cuenta o iniciar sesión, aceptas nuestros términos y
            condiciones
          </p>
        </div>
      </div>
    </div>
  );
}
