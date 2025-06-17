"use client";

import React from "react";
import MobileFilters from "./products/product-grid/MobileFilters";
import DesktopFilters from "./products/product-grid/DesktopFilters";


interface FiltersProps {
  coleccionesDisponibles: { id: number; name: string }[];
  coloresDisponibles: string[];
  totalResultados: number;
}

export default function Filters({
  coleccionesDisponibles,
  coloresDisponibles,
  totalResultados,
}: FiltersProps) {
  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="md:hidden pt-10">
        <MobileFilters
          coleccionesDisponibles={coleccionesDisponibles}
          coloresDisponibles={coloresDisponibles}
          totalResultados={totalResultados}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopFilters
          coleccionesDisponibles={coleccionesDisponibles}
          coloresDisponibles={coloresDisponibles}
          totalResultados={totalResultados}
        />
      </div>
    </div>
  );
}
