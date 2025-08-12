import { useGuestCartStore } from "@/store/cart/use-guest-cart-store";
import { addItemToCart } from "../action/cart.actions";
import { logError } from "@/app/utils/logger";

export const syncGuestCartToUserCart = async () => {
  const items = useGuestCartStore.getState().items;

  for (const item of items) {
    try {
      await addItemToCart(item.productId, item.quantity);
    } catch (err) {
      logError(`Error al sincronizar producto ${item.productId}:`, err);
    }
  }

  // Limpia el carrito local una vez sincronizado
  useGuestCartStore.getState().clearCart();
};
