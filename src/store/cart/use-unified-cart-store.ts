import { create } from "zustand";
import { useGuestCartStore } from "./use-guest-cart-store";
import { getProductById } from "@/core/product/action/product.actions";
import {
  addItemToCart,
  getCart,
  applyCouponToCart,
  removeCouponFromCart,
} from "@/core/cart/action/cart.actions";
import { deleteCartItem, updateCartItem } from "@/core/cart/action/cart-item.actions";
import { Coupon } from "@/core/coupon/interface/CouponResponse";
import toast from "react-hot-toast";

interface CartItemUnified {
  cartItemId?: number;
  productId: number;
  quantity: number;
  title: string;
  imageUrl: string;
  price: number;
  discountedPrice: number;
  availableStock: number;
}

interface UnifiedCartState {
  items: CartItemUnified[];
  loading: boolean;
  subtotal: number;
  discount: number;
  total: number;
  coupon: Coupon | null;
  fetchItems: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
}

export const useUnifiedCartStore = create<UnifiedCartState>((set, get) => {
  // Suscribir a cambios en carrito invitado para actualizar el carrito unificado
  useGuestCartStore.subscribe(() => {
    if (!localStorage.getItem("token")) {
      get().fetchItems();
    }
  });

  return {
    items: [],
    loading: false,
    subtotal: 0,
    discount: 0,
    total: 0,
    coupon: null,

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

        const subtotal = enriched.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const total = enriched.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);

        set({
          items: enriched,
          subtotal,
          total,
          discount: subtotal - total,
          loading: false,
          coupon: null,
        });
      } else {
        const cart = await getCart();

        // Aquí consultamos stock real de cada producto
        enriched = await Promise.all(
          cart.cartItems.map(async (item) => {
            const product = await getProductById(item.productId);
            return {
              cartItemId: item.id,
              productId: item.productId,
              quantity: item.quantity,
              title: item.productTitle,
              imageUrl: item.imageUrl[0] || "/placeholder.jpg",
              price: item.price,
              discountedPrice: item.discountedPrice,
              availableStock: product.quantity, // stock real aquí
            };
          })
        );

        const subtotal = cart.totalPrice;
        const total = cart.totalDiscountPrice;

        set({
          items: enriched,
          subtotal,
          total,
          discount: subtotal - total,
          loading: false,
          coupon: cart.coupon || null,
        });
      }
    },

    addItem: async (productId, quantity) => {
      const token = localStorage.getItem("token");

      const existingItem = get().items.find((i) => i.productId === productId);
      let stockDisponible = existingItem?.availableStock;

      if (!stockDisponible) {
        const product = await getProductById(productId);
        stockDisponible = product.quantity;
      }

      const cantidadFinal = (existingItem?.quantity || 0) + quantity;

      if (cantidadFinal > (stockDisponible || 0)) {
        toast.error(`Solo hay ${stockDisponible} unidades disponibles de este producto.`);
        return;
      }

      if (!token) {
        await useGuestCartStore.getState().addItem(productId, quantity);
      } else {
        await addItemToCart(productId, quantity);
      }

      await get().fetchItems();
    },

    updateItem: async (productId, quantity) => {
      const token = localStorage.getItem("token");

      const current = get().items.find((i) => i.productId === productId);
      if (!current) return;

      if (quantity > (current.availableStock || 0)) {
        toast.error(`Solo hay ${current.availableStock} unidades disponibles de este producto.`);
        return;
      }

      if (!token) {
        await useGuestCartStore.getState().updateItem(productId, quantity);
      } else {
        if (!current.cartItemId) return;

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

    applyCoupon: async (couponCode: string) => {
      const token = localStorage.getItem("token");
      if (!token) return;

      await applyCouponToCart(couponCode);
      await get().fetchItems();
    },

    removeCoupon: async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      await removeCouponFromCart();
      await get().fetchItems();
    },
  };
});
