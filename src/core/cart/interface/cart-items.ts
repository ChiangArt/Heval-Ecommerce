export interface CartItemUnified {
  cartItemId?: number; // ← necesario SOLO para logueado
  productId: number;
  quantity: number;
  title: string;
  imageUrl: string;
  price: number;
  discountedPrice: number;
  availableStock: number;
}