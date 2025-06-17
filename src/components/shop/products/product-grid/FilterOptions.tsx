"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

interface FiltersProps {
  coleccion: string;
  color: string;
  sortDirection: string;
  setColeccion: (v: string) => void;
  setColor: (v: string) => void;
  setSortDirection: (v: string) => void;
  coleccionesDisponibles: { id: number; name: string }[];
  coloresDisponibles: string[];
}

export default function FilterOptions({
  coleccion,
  color,
  sortDirection,
  setColeccion,
  setColor,
  setSortDirection,
  coleccionesDisponibles,
  coloresDisponibles,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* COLECCIÓN */}
      <Listbox value={Number(coleccion)} onChange={(v) => setColeccion(String(v))}>
        <ListboxButton className="p-2 bg-[rgba(232,227,222,0.40)] text-sm w-full rounded">
          {coleccion
            ? coleccionesDisponibles.find((c) => c.id === Number(coleccion))?.name
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
          <ListboxOptions className="bg-[rgba(232,227,222,0.40)] text-white py-3">
            {coleccionesDisponibles.map((item) => (
              <ListboxOption
                className="px-4 py-1 text-center"
                key={item.id}
                value={item.id}
              >
                <div className="p-3 font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>

      {/* COLOR */}
      <Listbox value={color} onChange={setColor}>
        <ListboxButton className="p-2 bg-[rgba(232,227,222,0.40)] text-sm w-full rounded">
          {color
            ? color.charAt(0).toUpperCase() + color.slice(1)
            : "Color"}
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
          <ListboxOptions className="bg-[rgba(232,227,222,0.40)] text-white py-3">
            {coloresDisponibles.map((item) => (
              <ListboxOption
                className="px-4 py-1 text-center"
                key={item}
                value={item}
              >
                <div className="p-3 font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>

      {/* PRECIO */}
      <Listbox value={sortDirection} onChange={setSortDirection}>
        <ListboxButton className="p-2 bg-[rgba(232,227,222,0.40)] text-sm w-full rounded">
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
          <ListboxOptions className="bg-[rgba(232,227,222,0.40)] text-white py-3">
            <ListboxOption
              className="px-4 py-1 text-center"
              value="asc"
            >
              <div className="p-3 font-bold text-secundario bg-white active:bg-[rgba(9,32,89,0.10)]">
                De menor a mayor
              </div>
            </ListboxOption>
            <ListboxOption
              className="px-4 py-1 text-center"
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
  );
}
