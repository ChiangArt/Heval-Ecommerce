import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getProductById } from "@/core/product/action/product.actions";
import toast from "react-hot-toast";

interface GuestCartItem {
  productId: number;
  quantity: number;
}

interface GuestCartState {
  items: GuestCartItem[];
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const isClient = typeof window !== "undefined";

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: async (productId, quantity) => {
        // 1. Traer producto y validar stock antes de cambiar el estado
        const product = await getProductById(productId);
        const stockDisponible = product.quantity;

        const currentItems = useGuestCartStore.getState().items;
        const existing = currentItems.find((i) => i.productId === productId);
        const cantidadActual = existing ? existing.quantity : 0;
        const cantidadFinal = cantidadActual + quantity;

        if (cantidadFinal > stockDisponible) {
          toast.error(`Solo hay ${stockDisponible} unidades disponibles.`);
          return;
        }

        // 2. Ahora actualizar estado SÍNCRONAMENTE con la validación lista
        set((state) => {
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: cantidadFinal }
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

      updateItem: async (productId, quantity) => {
        if (quantity < 1) {
          toast.error("La cantidad mínima es 1");
          return;
        }

        const product = await getProductById(productId);
        const stockDisponible = product.quantity;

        if (quantity > stockDisponible) {
          toast.error(`Solo hay ${stockDisponible} unidades disponibles.`);
          return;
        }

        // Actualizar estado sincronamente
        set((state) => {
          const newItems = state.items
            .map((i) => (i.productId === productId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0);
          return { items: newItems };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "guest-cart",
      storage: createJSONStorage(() =>
        isClient
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
