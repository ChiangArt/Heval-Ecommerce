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

export const getOrdersByUser = async (): Promise<Order[]> => {
  try {
    const { data } = await productsApi.get("/orders");
    return data;
  } catch (error) {
    console.error("Error al obtener órdenes del usuario", error);
    throw error;
  }
};

export async function getOrdersByAdmin(startDate: string, endDate: string): Promise<Order[]> {
  try {
    const start = startDate + "T00:00:00";
    const end = endDate + "T23:59:59";

    console.log("Fechas enviadas al backend:", { start, end });

    const { data } = await productsApi.get("/orders/admin", {
      params: { start, end },
    });

    return data;
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    throw error;
  }
}





export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const { data } = await productsApi.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error;
  }
};

export const postOrder = async (orders: OrderRequest) => {
  try {
    const { data } = await productsApi.post("/orders", orders);
    return data;
  } catch (error) {
    console.error("Error al crear orden", error);
    throw error;
  }
};

export const createPreference = async (orderId: string): Promise<string> => {
  try {
    const { data } = await productsApi.post(
      `/mercado-pago/preference/${orderId}`
    );
    return data;
  } catch (error) {
    console.error("Error al generar preferencia de pago:", error);
    throw error;
  }
};

export const retryOrderFromFailedPayment = async (orderId: string) => {
  const order = await getOrderById(orderId);
  const addItem = useUnifiedCartStore.getState().addItem;

  await Promise.all(
    order.orderItems.map(
      async (item: { productId: number; quantity: number }) => {
        await addItem(item.productId, item.quantity);
      }
    )
  );
};



export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const { data } = await productsApi.put(`/orders/status/${orderId}?status=${newStatus}`);
    return data;
  } catch (error) {
    console.error("Error al actualizar el estado de la orden", error);
    throw error;
  }
};

