import productsApi from "@/core/api/productsApi";
import { Banner } from "../interface/bannerResponse";

// Para crear banner (no necesitas el id)
export interface CreateBannerDto {
  urls: string[];
}

// Para actualizar banner
export interface UpdateBannerDto {
  id: number;
  urls: string[];
}


// Crear banner
export const createBanner = async (data: CreateBannerDto): Promise<void> => {
  await productsApi.post("/banners", data);
};

// Actualizar banner
export const updateBanner = async ({ id, urls }: UpdateBannerDto): Promise<void> => {
  await productsApi.put(`/banners/${id}`, { id, urls });
};

// Eliminar banner
export const deleteBanner = async (id: number): Promise<void> => {
  await productsApi.delete(`/banners/${id}`);
};

// Obtener banner por ID
export const getBanner = async (id: number): Promise<Banner[]> => {
  const response = await productsApi.get<Banner[]>(`/banners/${id}`);
  return response.data;
};

// Obtener todos los banners
export const getAllBanners = async (): Promise<Banner[]> => {
  const response = await productsApi.get<Banner[]>("/banners");
  return response.data;
};
