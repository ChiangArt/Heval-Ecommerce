import productsApi from '@/core/api/productsApi';
import { Cart } from '../interface/cart';
import { logError } from '@/app/utils/logger';

// 🔹 Agregar item al carrito
export const addItemToCart = async (
  productId: number,
  quantity: number
) => {
  try {
    const response = await productsApi.put('/cart/add-item', {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    logError('Error al agregar al carrito:', error);
    throw error;
  }
};

// 🔹 Obtener carrito actual
export const getCart = async (): Promise<Cart> => {
  try {
    const response = await productsApi.get<Cart>('/cart');
    return response.data;
  } catch (error) {
    logError('Error al obtener el carrito:', error);
    throw error;
  }
};



export const applyCouponToCart = async (couponCode: string) => {
  await productsApi.put("/cart/apply-coupon", null, {
    params: { couponCode },
  });
};

export const removeCouponFromCart = async () => {
  await productsApi.put("/cart/remove-coupon"); 
};

