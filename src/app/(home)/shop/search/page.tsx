"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Botón de regreso */}
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-primario hover:text-primario/80 transition-colors mb-8"
        >
          <FiArrowLeft className="text-lg" />
          <span>Volver a la tienda</span>
        </Link>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Resultados de búsqueda
        </h1>

        {/* Query destacada */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Buscaste: <span className="font-semibold text-primario">{query}</span>
          </p>
        </div>

        {/* Mensaje de no resultados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No encontramos resultados
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              Lo sentimos, no pudimos encontrar productos que coincidan con tu búsqueda.
              Prueba con otros términos o explora nuestra tienda.
            </p>
          </div>
        </div>

        {/* Botón principal para regresar */}
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primario hover:bg-primario/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario"
        >
          Explorar productos
        </Link>
      </div>
    </div>
  );
}