import productsApi from "@/core/api/productsApi";
import { Order } from "../interface/order";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";

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

// 🟢 Obtener órdenes del usuario
export const getOrdersByUser = async (): Promise<Order[]> => {
  try {
    const { data } = await productsApi.get("/orders");
    return data;
  } catch (error) {
    console.error("Error al obtener órdenes del usuario", error);
    throw error;
  }
};

// 🟢 Obtener todas las órdenes como admin
export const getOrdersByAdmin = async (): Promise<Order[]> => {
  try {
    const { data } = await productsApi.get("/orders/admin");
    return data;
  } catch (error) {
    console.error("Error al obtener órdenes del admin", error);
    throw error;
  }
};

// 🟢 Obtener orden por ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const { data } = await productsApi.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error;
  }
};

// 🟢 Crear una nueva orden
export const postOrder = async (orders: OrderRequest) => {
  try {
    const { data } = await productsApi.post("/orders", orders);
    return data;
  } catch (error) {
    console.error("Error al crear orden", error);
    throw error;
  }
};

// 🟢 Crear preferencia de pago (MercadoPago)
export const createPreference = async (orderId: string): Promise<string> => {
  try {
    const { data } = await productsApi.post(`/mercado-pago/preference/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error al generar preferencia de pago:", error);
    throw error;
  }
};

// 🟢 Volver a intentar pagar una orden fallida
export const retryOrderFromFailedPayment = async (orderId: string) => {
  const order = await getOrderById(orderId);
  const addItem = useUnifiedCartStore.getState().addItem;

  await Promise.all(
    order.orderItems.map(async (item: { productId: number; quantity: number }) => {
      await addItem(item.productId, item.quantity);
    })
  );
};

// 🟢 Actualizar el estado de una orden (ej: "CANCELLED", "PAID", etc.)
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const { data } = await productsApi.put(`/orders/status/${orderId}`, {
      status: newStatus,
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar el estado de la orden", error);
    throw error;
  }
};


export const downloadBoleta = async (orderId: number) => {
  try {
    const response = await productsApi.get(`/orders/${orderId}/boleta-s3`, {
      responseType: "blob", // 📎 Muy importante para archivos binarios
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `boleta_${orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar la boleta desde S3:", error);
    throw error;
  }
};
