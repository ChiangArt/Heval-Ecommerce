import { create } from "zustand";

export interface CheckoutItem {
  id: number;
  productId: number;
  productTitle: string;
  productDescription: string;
  imageUrl: string[];
  quantity: number;
  price: number;
  discountedPrice: number;
}

export interface CheckoutData {
  id: number;
  userId: number;
  totalPrice: number;
  totalItem: number;
  totalDiscountPrice: number;
  discount: number;
  couponId: number;
  cartItems: CheckoutItem[];
}

interface CheckoutStore {
  checkoutData: CheckoutData | null;
  setCheckoutData: (data: CheckoutData) => void;
  clearCheckoutData: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutData: null,

  setCheckoutData: (data) => set({ checkoutData: data }),

  clearCheckoutData: () => set({ checkoutData: null }),
}));
