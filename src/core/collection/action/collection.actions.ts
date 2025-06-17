import productsApi from "@/core/api/productsApi";
import { Collection } from "../interface/collectionResponse";



export const getCollections = async (): Promise<Collection[]> => {
  try {
    
    const { data } = await productsApi.get("/collections");

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

