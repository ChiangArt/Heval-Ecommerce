"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSliders } from "react-icons/fa6";
import { useFilterStore } from "@/store/ui/filter-store";
import Filter from "./products/Filter";

export default function Filters() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    coleccion,
    color,
    precio,
    setColeccion,
    setColor,
    setPrecio,
    clearFilters,
  } = useFilterStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4 px-2 text-sm">
      {/* Mobile: Botón para mostrar filtros */}
      <div className="relative md:hidden" ref={menuRef}>
        <div
          className="flex text-xs items-center gap-2 text-white bg-turquesa p-3 cursor-pointer rounded"
          onClick={() => setOpen(!open)}
        >
          <FaSliders />
          <span>Filtrar</span>
        </div>

        {open && (
          <div className="absolute top-14 mt-2 left-0 bg-white shadow-lg rounded-md text-black p-4 w-60 z-0">
            <Filter
              coleccion={coleccion}
              color={color}
              precio={precio}
              setColeccion={setColeccion}
              setColor={setColor}
              setPrecio={setPrecio}
              clearFilters={clearFilters}
            />
          </div>
        )}
      </div>

      {/* Desktop: Filtros siempre visibles */}
      <div className="hidden md:flex items-center gap-4">
        <Filter
          coleccion={coleccion}
          color={color}
          precio={precio}
          setColeccion={setColeccion}
          setColor={setColor}
          setPrecio={setPrecio}
          clearFilters={clearFilters}
        />
      </div>

      {/* Contador de resultados */}
      <div className="mt-3 font-bold text-xs md:mt-0 bg-[#FFF2D9] p-3 rounded">
        <p>20 resultados</p>
      </div>
    </div>
  );
}
