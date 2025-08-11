import axios from "axios";

import productsApi from "@/core/api/productsApi";

export interface CreateBannerDto {
  urls: string[];
}

export interface UpdateBannerDto {
  id: number;
  urls: string[];
}


export const createBanner = async (data: CreateBannerDto): Promise<void> => {
  await productsApi.post("/banners", data);
};

export const updateBanner = async ({ id, urls }: UpdateBannerDto): Promise<void> => {
  await productsApi.put(`/banners/${id}`, { id, urls });
};

export const deleteBanner = async (id: number): Promise<void> => {
  await productsApi.delete(`/banners/${id}`);
};

export const getBanner = async (id: number) => {
  const response = await productsApi.get(`/banners/${id}`);
  return response.data;
};

export const getAllBanners = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Error al obtener banners", error);
    throw error;
  }
};
