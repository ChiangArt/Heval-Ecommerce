import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GuestCartItem {
  productId: number;
  quantity: number;
}

interface GuestCartState {
  items: GuestCartItem[];
  addItem: (productId: number, quantity: number) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, quantity) => {
        set((state) => {
          const existing = state.items.find(i => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          } else {
            return {
              items: [...state.items, { productId, quantity }],
            };
          }
        });
      },
      updateItem: (productId, quantity) => {
        set((state) => {
          const newItems = state.items
            .map(i =>
              i.productId === productId
                ? { ...i, quantity }
                : i
            )
            .filter(i => i.quantity > 0);
          return { items: newItems };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(i => i.productId !== productId),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'guest-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : undefined
      ),
    }
  )
);
