import productsApi from "@/core/api/productsApi";
import { PaginatedProductsResponse, Product } from "../interface/productResponse";

interface ProductFilters {
  colors?: string;
  coleccionId?: number;
  sortDirection?: "asc" | "desc";
}


export const getProducts = async (
  page = 0,
  size = 20,
  filters: ProductFilters = {}
): Promise<PaginatedProductsResponse> => {
  try {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("size", size.toString());

    if (filters.colors) params.set("colors", filters.colors);
    if (filters.coleccionId) params.set("coleccion", filters.coleccionId.toString());
     if (filters.sortDirection) {
  params.set("sort", `price,${filters.sortDirection}`);
}

    const { data } = await productsApi.get(`/products?${params.toString()}`);

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const getProductById = async (
  id: number 
): Promise<Product> => {
  try {
    const { data } = await productsApi.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener producto por ID", error);
    throw error;
  }
};



export const getCollectionById = async (
  collectionId : number 
): Promise<Product[]> => {
  try {
    const { data } = await productsApi.get(`/products/by-collection/${collectionId }`);
    return data;
  } catch (error) {
    console.error("Error al obtener los productos de la collecion por ID", error);
    throw error;
  }
};