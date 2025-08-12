"use client";
import { useEffect, useState } from "react";
import {
  getOrdersByAdmin,
  getOrderById,
  updateOrderStatus,
} from "@/core/order/action/order.actions";
import { Order } from "@/core/order/interface/order";
import { OrderDetailModal } from "@/components/admin/orders/OrderDetailModalProps";
import { OrdersTable } from "@/components/admin/orders/OrdersTable"; // asumiendo que tienes este componente
import { LoadingMessage } from "@/components/ui/loading/LoadingMessage";
import { logError } from "@/app/utils/logger";

const formatDateForInput = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    formatDateForInput(new Date())
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrdersByAdmin(selectedDate, selectedDate);
      const allowedStatuses = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

      const filteredOrders = data.filter((order) =>
        allowedStatuses.includes(order.orderStatus)
      );

      setOrders(filteredOrders);
    } catch (error) {
      logError("Error completo:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  fetchOrders();
}, [selectedDate]);


  const openDetail = (orderId: string) => {
    setLoadingDetail(true);
    getOrderById(orderId)
      .then((order) => {
        setSelectedOrder(order);
        setSelectedStatus(order.orderStatus ?? "");
      })
      .catch(() => setSelectedOrder(null))
      .finally(() => setLoadingDetail(false));
  };

  const applyStatusChange = () => {
    if (!selectedOrder) return;
    setUpdating(true);
    updateOrderStatus(selectedOrder.orderId, selectedStatus)
      .then(() => getOrderById(selectedOrder.orderId))
      .then((updated) => {
        setSelectedOrder(updated);
        setOrders((prev) =>
          prev.map((o) => (o.orderId === updated.orderId ? updated : o))
        );
      })
      .catch(logError)
      .finally(() => setUpdating(false));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Órdenes</h1>

      <input
        type="date"
        max={formatDateForInput(new Date())}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 mb-4 rounded"
      />

      {loading ? (
        <LoadingMessage message="Cargando órdenes..." />
      ) : orders.length === 0 ? (
        <LoadingMessage message="No hay órdenes para esta fecha." />
      ) : (
        <OrdersTable orders={orders} onViewDetail={openDetail} />
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          loading={loadingDetail}
          selectedStatus={selectedStatus}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={setSelectedStatus}
          onApplyStatusChange={applyStatusChange}
          updating={updating}
        />
      )}
    </div>
  );
}
