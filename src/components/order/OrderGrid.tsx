import OrderItem from "./OrderItem";
import { Order } from "@/core/order/interface/order";

interface Props {
  orders: Order[];
  loading: boolean;
}

export default function OrderGrid({ orders, loading }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-[#001243]">RESUMEN DE PEDIDOS</h2>

      {orders.map((order) => (
        <OrderItem key={order.orderId} order={order} loading={loading} />
      ))}
    </section>
  );
}
