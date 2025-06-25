import productsApi from "@/core/api/productsApi";
interface UpdateCartItemInput {
  cartItemId: number;
  quantity: number;
  price: number;
  discountedPrice: number;
}

export const updateCartItem = async ({
  cartItemId,
  quantity,
  price,
  discountedPrice,
}: UpdateCartItemInput): Promise<void> => {
  await productsApi.put(`/cart-items/${cartItemId}`, {
    id: cartItemId,
    quantity,
    price,
    discountedPrice,
  });
};

export const deleteCartItem = async (cartItemId: number) => {
  const response = await productsApi.delete(`/cart-items/${cartItemId}`);

  return response.data;
};
