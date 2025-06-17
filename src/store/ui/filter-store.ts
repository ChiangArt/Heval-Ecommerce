import { create } from "zustand";

interface FilterState {
  coleccion: string;
  color: string;
  sortDirection: string;
  setColeccion: (value: string) => void;
  setColor: (value: string) => void;
  setSortDirection: (value: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  coleccion: "",
  color: "",
  sortDirection: "",
  setColeccion: (value: string) => set(() => ({ coleccion: value })),
  setColor: (value: string) => set(() => ({ color: value })),
  setSortDirection: (value: string) => set(() => ({ sortDirection: value })),
  clearFilters: () => set({ coleccion: "", color: "", sortDirection: "" }),
}));
