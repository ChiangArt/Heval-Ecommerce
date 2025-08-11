import productsApi from "@/core/api/productsApi";
import { PaginatedProductsResponse, Product } from "../interface/productResponse";

export interface ProductFilters {
  colors?: string;
  coleccionId?: number;
  sortDirection?: "asc" | "desc";
  searchText?: string; 
}

export interface ProductAdminFilters {
  searchText?: string;
  page?: number;
  size?: number;
}


export interface CreateProductRequest {
  title: string;
  description: string;
  descriptionArchetype: string;
  material: string;
  price: number;
  colors: string[];
  quantity: number;
  discountPercentage: number;
  discountUntil: string; 
  imageUrls: string[];
  collectionId: number;
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

    if (filters.searchText) params.set("searchText", filters.searchText); // 👈 esto es clave

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


export const getAdminProducts = async (
  page = 0,
  size = 20,
  filters: ProductAdminFilters = {}
): Promise<PaginatedProductsResponse> => {
  try {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("size", size.toString());

    if (filters.searchText) {
      params.set("searchText", filters.searchText);
    }

    const { data } = await productsApi.get(`/products/admin?${params.toString()}`);
    return data;
  } catch (error) {
    console.error("Error al obtener productos del admin", error);
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


export const getProductsBySlug = async (
  slug : string 
): Promise<Product> => {
  try {
    const { data } = await productsApi.get(`/products/slug/${slug}`);
    return data;
  } catch (error) {
    console.error("Error al obtener los productos de la collecion por ID", error);
    throw error;
  }
};



export const getProductsByCollectionId = async (
  collectionId : number 
): Promise<Product[]> => {
  try {
    const { data } = await productsApi.get(`/products/by-collection/${collectionId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener los productos de la collecion por ID", error);
    throw error;
  }
};


export const createProduct = async (
  product: CreateProductRequest
): Promise<Product> => {
  try {
    const { data } = await productsApi.post("/products", product);
    return data;
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    throw error;
  }
};


export const updateProduct = async (
  id: number,
  updatedProduct: Partial<CreateProductRequest>
): Promise<Product> => {
  try {
    const { data } = await productsApi.put(`/products/${id}`, updatedProduct);
    return data;
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    throw error;
  }
};



export const deleteProduct = async (
  id: number
): Promise<void> => {
  try {
    await productsApi.delete(`/products/${id}`);
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    throw error;
  }
};
