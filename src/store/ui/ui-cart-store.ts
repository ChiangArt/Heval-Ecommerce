import { create } from "zustand";

interface State {
  isSideMenuOpen: boolean;

  openCartSideMenu: () => void;
  closeCartSideMenu: () => void;
  toggleCartSideMenu: () => void;
}

export const useCartUIStore = create<State>((set) => ({
  isSideMenuOpen: false,

  openCartSideMenu: () => set({ isSideMenuOpen: true }),
  closeCartSideMenu: () => set({ isSideMenuOpen: false }),
  toggleCartSideMenu: () =>
    set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
  
}));
