import productsApi from "@/core/api/productsApi";

export const upload = async (file: File, folder: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await productsApi.post("/files/upload", formData);
  return response.data;
};
