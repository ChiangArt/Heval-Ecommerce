"use client";

import React from "react";
import { FaSliders } from "react-icons/fa6";
import { useFilterStore } from "@/store/ui/filter-store";
import { useRouter } from "next/navigation";
import FilterOptions from "./FilterOptions";

interface Props {
  coleccionesDisponibles: { id: number; name: string }[];
  coloresDisponibles: string[];
  totalResultados: number;
}

export default function DesktopFilters({
  coleccionesDisponibles,
  coloresDisponibles,
  totalResultados,
}: Props) {
  const {
    coleccion,
    color,
    sortDirection,
    setColeccion,
    setColor,
    setSortDirection,
    clearFilters,
  } = useFilterStore();

  const router = useRouter();

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (coleccion) params.set("coleccion", coleccion);
    if (color) params.set("colors", color);
    if (sortDirection) params.set("sort", `price,${sortDirection}`);
    router.push(`/shop?${params.toString()}`);
  };

  const resetFilters = () => {
    clearFilters();
    router.push("/shop");
  };

  return (
    <div className="hidden md:flex justify-between items-center px-2 text-sm">
      {/* Filtros lado izquierdo */}
      <div className="flex items-center gap-4">
        <div className="flex text-xs items-center gap-2 text-white bg-primario p-3 rounded">
          <FaSliders />
          <span>Filtrar</span>
        </div>

        <div className="flex gap-2 font-bold items-center mt-2">
          <FilterOptions
            coleccion={coleccion}
            color={color}
            sortDirection={sortDirection}
            setColeccion={setColeccion}
            setColor={setColor}
            setSortDirection={setSortDirection}
            coleccionesDisponibles={coleccionesDisponibles}
            coloresDisponibles={coloresDisponibles}
          />
        </div>

        <button
          onClick={applyFilters}
          className="bg-black text-white px-4 py-2 text-xs"
        >
          Aplicar
        </button>
        <button
          onClick={resetFilters}
          className="text-xs underline text-gray-500"
        >
          Limpiar
        </button>
      </div>

      {/* Resultados lado derecho */}
      <div className="font-bold text-secundario text-xs bg-[rgba(232,227,222,0.40)] p-3">
        <p>{totalResultados} resultados</p>
      </div>
    </div>
  );
}
