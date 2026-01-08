import { redirect } from "next/navigation";
import {
  RiUserLine,
  RiRocketLine,
  RiCodeLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <RiRocketLine className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard del Proyecto
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <RiUserLine className="text-white text-sm" />
            </div>
            <span className="text-gray-700">{data.user.email}</span>
          </div>
          <Link href="/">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <RiArrowLeftLine />
              <span>Volver al Inicio</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ¡Bienvenido a tu proyecto!
            </h1>
            <p className="text-lg text-gray-600">
              Esta es una página protegida que demuestra la funcionalidad de
              autenticación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Información del Usuario
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <RiUserLine className="text-white text-xl" />
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>
                    <br />
                    <span>{data.user.email}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RiRocketLine className="text-xl text-green-600" />
                  <div>
                    <span className="font-semibold">Miembro desde:</span>
                    <br />
                    <span>
                      {new Date(data.user.created_at).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                  <RiRocketLine />
                  <span>Crear Nuevo Proyecto</span>
                </button>
                <button className="w-full h-12 border border-gray-300 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                  <RiCodeLine />
                  <span>Ver Código Fuente</span>
                </button>
                <button className="w-full h-12 border border-gray-300 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                  <span>Configuración</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Esta página demuestra que la autenticación está funcionando
              correctamente
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
