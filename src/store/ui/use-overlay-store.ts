// stores/useOverlayStore.ts
import { create } from 'zustand';

interface OverlayStore {
  isOverlayVisible: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  isOverlayVisible: false,
  showOverlay: () => set({ isOverlayVisible: true }),
  hideOverlay: () => set({ isOverlayVisible: false }),
}));
