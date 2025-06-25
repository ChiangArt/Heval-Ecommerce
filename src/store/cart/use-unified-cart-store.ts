import { CartItemUnified } from "@/core/cart/interface/cart-items";
import { create } from "zustand";
import { useGuestCartStore } from "./use-guest-cart-store";
import { getProductById } from "@/core/product/action/product.actions";
import { addItemToCart, getCart } from "@/core/cart/action/cart.actions";
import {
  deleteCartItem,
  updateCartItem,
} from "@/core/cart/action/cart-item.actions";

interface UnifiedCartState {
  items: CartItemUnified[];
  loading: boolean;
  subtotal: number;
  discount: number;
  total: number;
  fetchItems: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
}

export const useUnifiedCartStore = create<UnifiedCartState>((set, get) => ({
  items: [],
  loading: false,
  subtotal: 0,
  discount: 0,
  total: 0,

  fetchItems: async () => {
    set({ loading: true });

    const token = localStorage.getItem("token");

    let enriched: CartItemUnified[] = [];

    if (!token) {
      const guestItems = useGuestCartStore.getState().items;
      enriched = await Promise.all(
        guestItems.map(async ({ productId, quantity }) => {
          const product = await getProductById(productId);
          return {
            productId,
            quantity,
            title: product.title,
            imageUrl: product.imageUrls[0] || "/no-imagen.png",
            price: product.price,
            discountedPrice: product.currentPrice,
            availableStock: product.quantity,
          };
        })
      );
    } else {
      const cart = await getCart();
      enriched = cart.cartItems.map((item) => ({
        cartItemId: item.id,
        productId: item.productId,
        quantity: item.quantity,
        title: item.productTitle,
        imageUrl: item.imageUrl[0] || "/placeholder.jpg",
        price: item.price,
        discountedPrice: item.discountedPrice,
        availableStock: 99,
      }));
    }

    const subtotal = enriched.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const total = enriched.reduce(
      (acc, item) => acc + item.discountedPrice * item.quantity,
      0
    );

    set({
      items: enriched,
      subtotal,
      total,
      discount: subtotal - total,
      loading: false,
    });
  },

  addItem: async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      useGuestCartStore.getState().addItem(productId, quantity);
    } else {
      await addItemToCart(productId, quantity);
    }
    await get().fetchItems();
  },

  updateItem: async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      useGuestCartStore.getState().updateItem(productId, quantity);
    } else {
      const current = get().items.find((i) => i.productId === productId);
      if (!current || !current.cartItemId) return;

      await updateCartItem({
        cartItemId: current.cartItemId,
        quantity,
        price: current.price,
        discountedPrice: current.discountedPrice,
      });
    }
    await get().fetchItems();
  },

  removeItem: async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      useGuestCartStore.getState().removeItem(productId);
    } else {
      const current = get().items.find((i) => i.productId === productId);
      if (!current || !current.cartItemId) return;
      await deleteCartItem(current.cartItemId);
    }
    await get().fetchItems();
  },
}));
