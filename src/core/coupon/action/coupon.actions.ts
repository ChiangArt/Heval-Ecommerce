import productsApi from "@/core/api/productsApi";
import { AxiosError } from "axios";
import { Coupon } from "../interface/CouponResponse";

// 🔹 Obtener todos los cupones
export const getCoupons = async (): Promise<Coupon[]> => {
  try {
    const { data } = await productsApi.get("/coupon");
    return data;
  } catch (error) {
    console.error("Error al obtener los cupones", error);
    throw error;
  }
};

// 🔹 Obtener cupón por ID
export const getCouponById = async (couponId: number): Promise<Coupon | null> => {
  try {
    const { data } = await productsApi.get(`/coupon/${couponId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 404) {
      console.warn(`Cupón con ID ${couponId} no encontrado.`);
      return null;
    }

    console.error("Error al obtener el cupón por ID:", error);
    return null;
  }
};

// 🔹 Crear cupón
export const postCoupon = async (
  payload: Omit<Coupon, "id" | "createdAt">
): Promise<Coupon> => {
  try {
    const { data } = await productsApi.post("/coupon", payload);
    return data;
  } catch (error) {
    console.error("Error al crear el cupón", error);
    throw error;
  }
};

// 🔹 Actualizar cupón por ID
export const putCouponById = async (
  couponId: number,
  payload: Omit<Coupon, "id" | "createdAt">
): Promise<Coupon> => {
  try {
    const { data } = await productsApi.put(`/coupon/${couponId}`, payload);
    return data;
  } catch (error) {
    console.error("Error al actualizar el cupón por ID", error);
    throw error;
  }
};

// 🔹 Eliminar cupón por ID
export const deleteCouponById = async (couponId: number): Promise<Coupon> => {
  try {
    const { data } = await productsApi.delete(`/coupon/${couponId}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar el cupón", error);
    throw error;
  }
};
