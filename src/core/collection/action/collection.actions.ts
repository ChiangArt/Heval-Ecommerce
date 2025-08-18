import productsApi from "@/core/api/productsApi";
import { Collection } from "../interface/collectionResponse";
import { AxiosError } from "axios";
import { logError } from "@/app/utils/logger";

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const { data } = await productsApi.get("/collections");

    return data;
  } catch (error) {
    logError("Error al obtener las colleciones", error);
    throw error;
  }
};

export const getCollectionById = async (
  collectionId: number
): Promise<Collection | null> => {
  try {
    const { data } = await productsApi.get(`/collections/${collectionId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 404) {
      console.warn(`Colección con ID ${collectionId} no encontrada.`);
      return null;
    }

    logError("Error al obtener colecciones por ID:", error);
    return null;
  }
};

export const postCollection = async (  payload: Omit<Collection, "id" | "createdAt" | "slug" | "active" >
): Promise<Collection[]> => {
  try {
    const { data } = await productsApi.post("/collections", payload);
    return data;
  } catch (error) {
    logError("Error al crear la coleccion", error);
    throw error;
  }
};

export const putCollectionById = async (
  collectionId: number, payload: Omit<Collection, "id" | "createdAt" | "slug">
): Promise<Collection[]> => {
  try {
    const { data } = await productsApi.put(`/collections/${collectionId}`, payload);
    return data;
  } catch (error) {
    logError("Error al crear la coleccion por Id", error);
    throw error;
  }
};

export const deleteCollectionById = async (
  collectionId: number
): Promise<Collection[]> => {
  try {
    const { data } = await productsApi.delete(`/collections/${collectionId}`);
    return data;
  } catch (error) {
    logError("Error al eliminar la coleccion", error);
    throw error;
  }
};
