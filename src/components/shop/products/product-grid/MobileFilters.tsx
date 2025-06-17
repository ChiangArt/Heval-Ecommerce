"use client";
import React, { useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { useFilterStore } from "@/store/ui/filter-store";
import { useRouter } from "next/navigation";
import FilterOptions from "./FilterOptions";

interface Props {
  coleccionesDisponibles: { id: number; name: string }[];
  coloresDisponibles: string[];
  totalResultados: number;
}

export default function MobileFilters({
  coleccionesDisponibles,
  coloresDisponibles,
  totalResultados,
}: Props) {
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  const resetFilters = () => {
    clearFilters();
    router.push("/shop");
    setOpen(false);
  };

  return (
    <div className="px-2 text-sm md:hidden">
      {/* Encabezado móvil */}
      <div className="flex justify-between items-center mb-3">
        <div
          className="flex items-center text-white gap-2 py-2 px-4 bg-secundario text-xs font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaSliders />
          <p>Filtrar:</p>
        </div>
        <div className="font-bold text-xs bg-[rgba(232,227,222,0.40)] p-2 ">
          <p>{totalResultados} resultados</p>
        </div>
      </div>

      {/* Drawer móvil */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscurecido */}
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setOpen(false)}
          ></div>

          {/* Contenido del Drawer */}
          <div className="relative w-72 bg-white h-full shadow-lg p-4 flex flex-col justify-between animate-slide-in-left z-50">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="text-secundario text-xl"
              >
                ✖
              </button>
            </div>
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2 justify-center bg-secundario text-white py-3 mt-7">
                <FaSliders className="" />
                <h2 className=" text-md">Filtrar:</h2>
              </div>

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
            {/* Botones */}
            <div className="flex-grow"></div>

            {/* Botones al fondo */}
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-gray-200  text-sm font-semibold text-gray-700"
              >
                Limpiar
              </button>
              <button
                onClick={applyFilters}
                className="w-full py-2 bg-secundario text-white  text-sm font-semibold"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
