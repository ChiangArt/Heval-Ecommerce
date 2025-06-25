import productsApi from '@/core/api/productsApi';
import { Cart } from '../interface/cart';

export const addItemToCart = async (
  productId: number,
  quantity: number,
) => {
  try {

    const response = await productsApi.put(
      '/cart/add-item',
      { productId, quantity },
    );
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};


export const getCart = async (): Promise<Cart> => {
try {
  const response = await productsApi.get<Cart>("/cart");
  return response.data;
}catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};
