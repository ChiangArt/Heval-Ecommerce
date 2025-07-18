// src/store/user/use-auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/core/auth/interface/user";
import { jwtDecode } from "jwt-decode"; // ✅ Correcto
import axios from "axios";
import { useGuestCartStore } from "../cart/use-guest-cart-store";
import { useUnifiedCartStore } from "../cart/use-unified-cart-store";

interface TokenPayload {
  userId: number;
  name: string;
  email: string;
  role: string;
  status: string;
  iat: number;
  exp: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  updateUser: (updatedUser: Partial<User>) => void; // ← NUEVO
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setToken: (token: string) => {
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const user = {
            id: decoded.userId,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          };
          set({ user, token });
        } catch (err) {
          console.error("❌ Token inválido al decodificar", err);
          set({ user: null, token: null });
        }
      },

      updateUser: (updatedUser) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedUser } });
        }
      },

      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        useGuestCartStore.getState().clearCart();
        useUnifiedCartStore.getState().fetchItems();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
