"use client";

import { useRouter } from "next/navigation";
import { RiHomeLine, RiLoginBoxLine } from "react-icons/ri";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-red-600 text-4xl">⚠️</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Algo salió mal!
          </h1>
          <p className="text-gray-600 text-lg">
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta
            nuevamente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RiHomeLine />
            <span>Volver al Inicio</span>
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <RiLoginBoxLine />
            <span>Iniciar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
