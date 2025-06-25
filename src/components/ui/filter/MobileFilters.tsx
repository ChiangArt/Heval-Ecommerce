"use client";
import React, { useState, Fragment } from "react";
import { FaSliders } from "react-icons/fa6";
import { useFilterStore } from "@/store/ui/filter-store";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

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
    <div className="px-2 text-sm">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3">
        <div
          className="flex items-center text-white gap-2 py-2 px-4 bg-secundario text-xs font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaSliders />
          <p>Filtrar:</p>
        </div>
        <div className="font-bold text-xs bg-[rgba(232,227,222,0.40)] p-2">
          <p>{totalResultados} resultados</p>
        </div>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscurecido */}
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          ></div>

          {/* Contenedor principal del Drawer */}
          <div
            className="relative w-72 bg-white h-full shadow-lg p-4 flex flex-col justify-between animate-slide-in-left z-50"
            onClick={(e) => e.stopPropagation()}
          >
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
                <FaSliders />
                <h2 className="text-md">Filtrar:</h2>
              </div>

              {/* Opciones de filtros */}
              <div className="flex flex-col  gap-2">
                {/* Colección */}
                <div className="w-full ">
                  <Listbox
                    value={Number(coleccion)}
                    onChange={(v) => setColeccion(String(v))}
                  >
                    <ListboxButton className="p-3 w-full cursor-pointer bg-[rgba(232,227,222,0.40)] text-sm">
                      {coleccion
                        ? coleccionesDisponibles.find(
                            (c) => c.id === Number(coleccion)
                          )?.name
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
                      <ListboxOptions className="w-full py-2 items-center  bg-[rgba(232,227,222,0.40)]  relative z-10 mt-1 shadow">
                        {coleccionesDisponibles.map((item) => (
                          <ListboxOption
                            className="px-3 py-1 text-center"
                            key={item.id}
                            value={item.id}
                          >
                            <div className="p-3 cursor-pointer font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                              {item.name.charAt(0).toUpperCase() +
                                item.name.slice(1)}
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>

                {/* Color */}
                <div className="w-full ">
                  <Listbox value={color} onChange={setColor}>
                    <ListboxButton className="p-3 cursor-pointer w-full  bg-[rgba(232,227,222,0.40)]  text-sm rounded">
                      {color
                        ? color.charAt(0).toUpperCase() + color.slice(1)
                        : "Color"}
                    </ListboxButton>
                    <Transition as={Fragment}>
                      <ListboxOptions className="w-full py-2 bg-[rgba(232,227,222,0.40)]  relative  z-10 mt-1 shadow">
                        {coloresDisponibles.map((item) => (
                          <ListboxOption
                            className="px-3  py-1 text-center"
                            key={item}
                            value={item}
                          >
                            <div className="p-3 font-bold cursor-pointer text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>

                {/* Precio */}
                <div className="w-full ">
                  <Listbox value={sortDirection} onChange={setSortDirection}>
                    <ListboxButton className="p-3 w-full cursor-pointer bg-[rgba(232,227,222,0.40)] text-sm">
                      {sortDirection === "asc"
                        ? "De menor a mayor"
                        : sortDirection === "desc"
                        ? "De mayor a menor"
                        : "Precio"}
                    </ListboxButton>
                    <Transition as={Fragment}>
                      <ListboxOptions className="w-full  py-2 bg-[rgba(232,227,222,0.40)]  relative z-10 mt-1 shadow">
                        <ListboxOption
                          className="px-3 cursor-pointer py-1 text-center"
                          value="asc"
                        >
                          <div className="p-3 font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                            De menor a mayor
                          </div>
                        </ListboxOption>
                        <ListboxOption
                          className="px-3 cursor-pointer py-1 text-center"
                          value="desc"
                        >
                          <div className="p-3 font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                            De mayor a menor
                          </div>
                        </ListboxOption>
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex-grow"></div>
            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-gray-200 text-sm font-semibold text-gray-700"
              >
                Limpiar
              </button>
              <button
                onClick={applyFilters}
                className="w-full py-2 bg-secundario text-white text-sm font-semibold"
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
