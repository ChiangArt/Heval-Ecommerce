"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
    const pathname = usePathname(); 

  const prevPage = currentPage > 0 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : null;

  return (
    <div className="flex justify-between items-center my-4 px-4">
      
      {/* Botón Anterior */}
      {prevPage !== null ? (
        <Link
          href={`/shop?page=${prevPage}`}
          className="px-3 py-1 underline underline-offset-4 text-secundario"
        >
          Anterior
        </Link>
      ) : (
        <span className="px-3 py-1 text-gray-400">Anterior</span>
      )}

      {/* Página actual / Total */}
      <span className="text-sm text-gray-700">
        {currentPage + 1} / {totalPages}
      </span>

      {/* Botón Siguiente */}
      {nextPage !== null ? (
        <Link
          href={`${pathname}?page=${nextPage}`}
          className="px-3 py-1 underline underline-offset-4 text-secundario"
        >
          Siguiente
        </Link>
      ) : (
        <span className="px-3 py-1 text-gray-400">Siguiente</span>
      )}
    </div>
  );
}
