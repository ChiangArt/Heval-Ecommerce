import OrderItem from "./OrderItem";
import { Order } from "@/core/order/interface/order";

interface Props {
  orders: Order[];
  loading: boolean;
}

export default function OrderGrid({ orders, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <svg
          className="animate-spin h-6 w-6 text-gray-500 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <p className="text-gray-500 font-medium text-sm">
          Cargando tus pedidos...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tienes pedidos registrados.
      </div>
    );
  }

  return (
    <section className="bg-white space-y-6">
      {orders.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </section>
  );
}
