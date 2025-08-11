import productsApi from "@/core/api/productsApi";
import { AddressResponse } from "../interface/addressResponse";


interface AddressRequest {
    fullAddress:      string;
    apartmentOrFloor: string;
    district:         string;
    province:         string;
    department:       string;
    reference:        string;
    additionalInfo:   string;
}


export const postAdress = async (payload: AddressRequest
): Promise<AddressResponse> => {
  try {
    
    const { data } = await productsApi.post<AddressResponse>("/shipping-adress", payload);

    return data;
  } catch (error) {
    console.error("Error al enviar los datos", error);
    throw error;
  }
};


export const getAdress = async (): Promise<AddressResponse[]> => {
  try {
    const { data } = await productsApi.get("/shipping-adress");
    return data;
  } catch (error) {
    console.error("Error al obtener las direcciones", error);
    throw error;
  }
};

