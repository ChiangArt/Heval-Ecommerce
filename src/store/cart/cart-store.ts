// import { create } from "zustand";

// export interface CartItem {
//   id?: number;
//   productId: number;
//   productTitle: string;
//   imageUrl: string[];
//   quantity: number;
//   price: number;
//   discountedPrice: number;
// }

// interface CartState {
//   cartItems: CartItem[];
//   setCart: (items: CartItem[]) => void;
//   addItem: (item: CartItem) => void;
//   removeItem: (productId: number) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartState>((set) => ({
//   cartItems: [],
//   setCart: (items) => set({ cartItems: items }),
//   addItem: (item) =>
//     set((state) => {
//       const existing = state.cartItems.find((i) => i.productId === item.productId);
//       if (existing) {
//         return {
//           cartItems: state.cartItems.map((i) =>
//             i.productId === item.productId
//               ? { ...i, quantity: i.quantity + item.quantity }
//               : i
//           ),
//         };
//       } else {
//         return { cartItems: [...state.cartItems, item] };
//       }
//     }),
//   removeItem: (productId) =>
//     set((state) => ({
//       cartItems: state.cartItems.filter((i) => i.productId !== productId),
//     })),
//   clearCart: () => set({ cartItems: [] }),
// }));
