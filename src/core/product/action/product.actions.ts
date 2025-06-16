import productsApi from "@/core/api/productsApi";
import { PaginatedProductsResponse, Product } from "../interface/productResponse";



export const getProducts = async (
  page = 0,
  size = 20
): Promise<PaginatedProductsResponse> => {
  try {
    const { data } = await productsApi.get(
      `/products?page=${page}&size=${size}`
    );

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }

  
};

export const getProductById = async (
  id: number | string
): Promise<Product> => {
  try {
    const { data } = await productsApi.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener producto por ID", error);
    throw error;
  }
};