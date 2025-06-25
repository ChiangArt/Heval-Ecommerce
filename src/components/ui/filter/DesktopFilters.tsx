"use client";
import React, { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FaSliders } from "react-icons/fa6";
import { useFilterStore } from "@/store/ui/filter-store";
import { useRouter } from "next/navigation";

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
    <div className="flex justify-between mt-10 font-bold items-center px-2 text-sm">
      {/* Filtros lado izquierdo */}
      <div className="flex flex-nowrap items-center gap-4 w-full">
        <div className="flex items-center gap-2 text-white bg-primario px-4 h-10">
          <FaSliders />
          <span>Filtrar</span>
        </div>

        {/* COLECCIÓN */}
        <div className="relative w-auto">
          <Listbox
            value={Number(coleccion)}
            onChange={(v) => setColeccion(String(v))}
          >
            <div className="relative">
              <ListboxButton className="h-10 cursor-pointer px-4 w-35 bg-[rgba(232,227,222,0.40)] text-sm flex items-center justify-center">
                {coleccion
                  ? coleccionesDisponibles.find((c) => c.id === Number(coleccion))
                      ?.name
                  : "Colección"}
              </ListboxButton>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-3"
              >
                <ListboxOptions className="w-full py-2 bg-[rgba(232,227,222)] absolute left-0 top-full z-10 mt-1 shadow">
                  {coleccionesDisponibles.map((item) => (
                    <ListboxOption
                      key={item.id}
                      value={item.id}
                      className="px-3 py-1 text-center"
                    >
                      <div className="p-3 cursor-pointer font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* COLOR */}
        <div className="relative w-auto">
          <Listbox value={color} onChange={setColor}>
            <div className="relative">
              <ListboxButton className="h-10 cursor-pointer px-4 w-40 bg-[rgba(232,227,222,0.40)] text-sm flex items-center justify-center">
                {color ? color.charAt(0).toUpperCase() + color.slice(1) : "Color"}
              </ListboxButton>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-3"
              >
                <ListboxOptions className="w-full py-2 bg-[rgba(232,227,222)] absolute left-0 top-full z-10 mt-1 shadow">
                  {coloresDisponibles.map((item) => (
                    <ListboxOption
                      key={item}
                      value={item}
                      className="px-3 py-1 text-center"
                    >
                      <div className="p-3 font-bold cursor-pointer text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* PRECIO */}
        <div className="relative w-auto">
          <Listbox value={sortDirection} onChange={setSortDirection}>
            <div className="relative">
              <ListboxButton className="h-10 cursor-pointer px-4 w-50 bg-[rgba(232,227,222,0.40)] text-sm flex items-center justify-center">
                {sortDirection === "asc"
                  ? "De menor a mayor"
                  : sortDirection === "desc"
                  ? "De mayor a menor"
                  : "Precio"}
              </ListboxButton>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-3"
              >
                <ListboxOptions className="w-full py-2 bg-[rgba(232,227,222)] absolute left-0 top-full z-10 mt-1 shadow">
                  <ListboxOption value="asc" className="px-3 py-1 text-center">
                    <div className="p-3 cursor-pointer font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                      De menor a mayor
                    </div>
                  </ListboxOption>
                  <ListboxOption value="desc" className="px-3 py-1 text-center">
                    <div className="p-3 cursor-pointer font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                      De mayor a menor
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Botones */}
        <button
          onClick={applyFilters}
          className="bg-secundario cursor-pointer text-white text-xs h-10 px-4"
        >
          Aplicar
        </button>
        <button
          onClick={resetFilters}
          className="text-xs underline text-black h-10 px-4 cursor-pointer"
        >
          Limpiar
        </button>
      </div>

      {/* Resultados lado derecho */}
      <div className=" text-secundario w-40 text-xs bg-[rgba(232,227,222,0.40)] p-3 text-center">
        <p>{totalResultados} resultados</p>
      </div>
    </div>
  );
}
