import productsApi from "@/core/api/productsApi";

export interface OrderRequest {
  fullName: string;
  email: string;
  cel: string;
  identityDocument: string;
  documentType: string;
  fullAddress: string;
  apartmentOrFloor: string;
  district: string;
  province: string;
  department: string;
  reference: string;
  additionalInfo: string;
}

export const getOrders = async (): Promise<[]> => {
  try {
    const { data } = await productsApi.get("/orders");

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const postOrder = async (orders: OrderRequest) => {
  try {
    const { data } = await productsApi.post("/orders", orders); 
    console.log("Respuesta de backend:", data); 

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const createPreference = async (orderId: string) => {
  try {
    const { data } = await productsApi.post(
      `/mercado-pago/preference/${orderId}`
    );

    window.location.href = data; // <- si tu backend retorna un string plano con el init_point
  } catch (error) {
    console.error("Error al generar preferencia de pago:", error);
    throw error;
  }
};
