import { create } from "zustand";

interface FilterState {
  coleccion: string;
  color: string;
  precio: string;
  setColeccion: (value: string) => void;
  setColor: (value: string) => void;
  setPrecio: (value: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  coleccion: "",
  color: "",
  precio: "",
  setColeccion: (value) => set({ coleccion: value }),
  setColor: (value) => set({ color: value }),
  setPrecio: (value) => set({ precio: value }),
  clearFilters: () => set({ coleccion: "", color: "", precio: "" }),
}));
