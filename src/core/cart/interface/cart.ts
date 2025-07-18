import { Coupon } from "@/core/coupon/interface/CouponResponse";

export interface Cart {
  id: number;
  userId: number;
  totalPrice: number;
  totalItem: number;
  totalDiscountPrice: number;
  discount: number;
  couponId: number | null;
  coupon?: Coupon | null;
  cartItems: CartItem[];
}


export interface CartItem {
    id:                 number;
    productId:          number;
    productTitle:       string;
    productDescription: string;
    imageUrl:           string[];
    quantity:           number;
    price:              number;
    discountedPrice:    number;
}
