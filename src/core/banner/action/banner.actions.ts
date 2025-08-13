import productsApi from "@/core/api/productsApi";

// Para crear banner (no necesitas el id)
export interface CreateBannerDto {
  url: string[];
}

// Para actualizar banner
export interface UpdateBannerDto {
  id: number;
  url: string[];
}


// Crear banner
export const createBanner = async (data: CreateBannerDto): Promise<void> => {
  await productsApi.post("/banners", data);
};

// Actualizar banner
export const updateBanner = async ({ id, url }: UpdateBannerDto): Promise<void> => {
  await productsApi.put(`/banners/${id}`, { id, url });
};

// Eliminar banner
export const deleteBanner = async (id: number): Promise<void> => {
  await productsApi.delete(`/banners/${id}`);
};

// Obtener banner por ID
export const getBanner = async (id: number) => {
  const response = await productsApi.get(`/banners/${id}`);
  return response.data;
};

// Obtener todos los banners
export const getAllBanners = async () => {
  const response = await productsApi.get("/banners");
  return response.data;
};
