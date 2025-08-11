import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Order } from "@/core/order/interface/order";

const STATUS_OPTIONS = [
  { value: "SHIPPED", label: "EN RUTA" },
  { value: "DELIVERED", label: "ENTREGADO" },
  { value: "CANCELLED", label: "CANCELADO" },
];

interface OrdersTableProps {
  orders: Order[];
  onViewDetail: (orderId: string) => void;
}

export function OrdersTable({ orders, onViewDetail }: OrdersTableProps) {
  const statusStyles: Record<string, string> = {
    PAID: "text-green-600 font-semibold",
    SHIPPED: "text-blue-600 font-semibold",
    DELIVERED: "text-purple-600 font-semibold",
    CANCELLED: "text-red-600 font-semibold",
  };

  const statusEmojis: Record<string, string> = {
    PAID: "✅",
    SHIPPED: "🚚",
    DELIVERED: "📦",
    CANCELLED: "❌",
  };

  return (
    <table className="w-full border-collapse border border-gray-300 mb-4">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Fecha</th>
          <th className="border p-2">Estado</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId}>
            <td className="border p-2 text-center">{order.orderId}</td>
            <td className="border p-2 text-center">
              {format(new Date(order.createdAt), "dd MMM yyyy", { locale: es })}
            </td>
            <td
              className={`border p-2 text-center capitalize ${
                statusStyles[order.orderStatus] || ""
              }`}
            >
              <span className="mr-1">{statusEmojis[order.orderStatus]}</span>
              {STATUS_OPTIONS.find((s) => s.value === order.orderStatus)
                ?.label || order.orderStatus}
            </td>

            <td className="border p-2 text-center">
              <Button
                variant="outline"
                onClick={() => onViewDetail(order.orderId)}
              >
                Ver
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
