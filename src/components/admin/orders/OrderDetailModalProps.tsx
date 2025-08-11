"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Order } from "@/core/order/interface/order";

interface OrderDetailModalProps {
  order: Order;
  loading: boolean;
  selectedStatus: string;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
  onApplyStatusChange: () => void;
  updating: boolean;
}

const STATUS_OPTIONS = [
  { value: "PAID", label: "PAGADO", disabled: true },
  { value: "PROCESSING", label: "EN PROCESO", disabled: true },
  { value: "SHIPPED", label: "EN RUTA", disabled: false },
  { value: "DELIVERED", label: "ENTREGADO", disabled: false },
  { value: "CANCELLED", label: "CANCELAR", disabled: false },
];

export function OrderDetailModal({
  order,
  loading,
  selectedStatus,
  onClose,
  onStatusChange,
  onApplyStatusChange,
  updating,
}: OrderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>

        {loading ? (
          <p>Cargando detalles...</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-3">
              Orden #{order.orderId}
            </h2>
            <p className="mb-2">
              Fecha:{" "}
              {format(new Date(order.createdAt), "dd MMM yyyy - HH:mm", {
                locale: es,
              })}
            </p>

            <div className="mb-4">
              <select
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border p-2 rounded mr-2"
              >
                {STATUS_OPTIONS.map(({ value, label, disabled }) => (
                  <option key={value} value={value} disabled={disabled}>
                    {label}
                  </option>
                ))}

                {!STATUS_OPTIONS.some(
                  (opt) => opt.value === selectedStatus
                ) && (
                  <option value={selectedStatus} disabled>
                    {selectedStatus}
                  </option>
                )}
              </select>

              <Button onClick={onApplyStatusChange} disabled={updating}>
                {updating ? "Actualizando..." : "Cambiar estado"}
              </Button>
            </div>

            <div>
              <p>
                <strong>Cliente:</strong> {order.contactInfo.fullName}
              </p>
              <p>
                <strong>Email:</strong> {order.contactInfo.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {order.contactInfo.cel}
              </p>
            </div>

            <div className="mt-4">
              <p>
                <strong>Dirección:</strong> {order.shippingAddress.fullAddress}
              </p>
              <p>
                {order.shippingAddress.district},{" "}
                {order.shippingAddress.province},{" "}
                {order.shippingAddress.department}
              </p>
            </div>

            <div className="mt-4">
              <strong>Productos:</strong>
              <ul className="list-disc ml-5">
                {order.orderItems.map((item) => (
                  <li key={item.productId}>
                    {item.productTitle} x {item.quantity} - S/{" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 font-bold text-right">
              Total: S/ {order.totalPrice.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
