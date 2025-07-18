"use client";
import { useState } from "react";
import Image from "next/image";
import { Order } from "@/core/order/interface/order";
import { AnimatePresence, motion } from "framer-motion";
import StatusStep, {
  mapBackendStatusToStep,
} from "../ui/status-step/StatusStep";
import { retryOrderFromFailedPayment } from "@/core/order/action/order.actions";
import { useRouter } from "next/navigation";

interface Props {
  order: Order;
}

export default function OrderItem({ order }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const currentStatus = mapBackendStatusToStep(order.orderStatus);

  const isFailed =
    order.orderStatus === "FAILED" ||
    order.orderStatus === "CANCELLED" ||
    order.orderStatus === "REFUNDED";

  const statusLabels: Record<string, { label: string; color: string }> = {
    CREATED: { label: "Creado", color: "bg-gray-500" },
    PENDING_PAYMENT: { label: "Pago pendiente", color: "bg-yellow-500" },
    PAID: { label: "Pagado", color: "bg-green-500" },
    PROCESSING: { label: "Procesando", color: "bg-blue-500" },
    SHIPPED: { label: "Enviado", color: "bg-indigo-500" },
    DELIVERED: { label: "Entregado", color: "bg-emerald-600" },
    CANCELLED: { label: "Cancelado", color: "bg-red-500" },
    REFUNDED: { label: "Reembolsado", color: "bg-pink-500" },
    FAILED: { label: "Fallido", color: "bg-red-600" },
  };

  const handleRetry = async () => {
    try {
      await retryOrderFromFailedPayment(order.orderId.toString());
      router.push("/shop/checkout");
    } catch (error) {
      console.error("Error al reintentar pedido:", error);
    }
  };

  const orderItems = order?.orderItems ?? [];
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal - order.totalDiscountedPrice;

  return (
    
    <div className="bg-white shadow-sm overflow-hidden">
    

      <button
        className="w-full text-left px-6 py-4 border-b flex justify-between items-center hover:bg-[rgba(232,227,222,0.40)] transition"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xs font-semibold text-gray-700">
          Nro de Orden: {order.orderId}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs text-white px-2 py-1 rounded ${
              statusLabels[order.orderStatus]?.color || "bg-gray-400"
            }`}
          >
            {statusLabels[order.orderStatus]?.label || "Estado desconocido"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {!isFailed && (
              <div className="flex flex-col mb-3 pb-3 bg-[rgba(232,227,222,0.40)] font-bold pt-10 justify-center px-25 items-center text-center text-xs text-secundario">
                <span>ESTADO DE MI PEDIDO</span>
                <StatusStep
                  status="registrado"
                  currentStatus={currentStatus}
                  label="Registrado"
                  description="La información de tu envío ha sido confirmada."
                  number={1}
                />
                <StatusStep
                  status="en_ruta"
                  currentStatus={currentStatus}
                  label="En ruta"
                  description="¡En marcha! Tu paquete ya está en camino."
                  number={2}
                />
                <StatusStep
                  status="entregado"
                  currentStatus={currentStatus}
                  label="Entregado"
                  description="¡Buenas noticias! Tu envío llegó a su destino."
                  number={3}
                />
              </div>
            )}

            <div className="text-xs">
              <div className="flex flex-col w-full bg-[rgba(232,227,222,0.40)] p-3 gap-5">
                {orderItems.map((product, index) => (
                  <div
                    key={product.productId}
                    className={`grid grid-cols-6 items-center pb-5 ${
                      index !== orderItems.length - 1
                        ? "border-b border-secundario"
                        : ""
                    }`}
                  >
                    <div className="col-span-4 items-center flex gap-3">
                      <div className="relative w-[60px] h-[80px] flex-shrink-0">
                        <Image
                          src={product.imageUrl?.[0] ?? "/no-imagen.png"}
                          alt={product.productTitle}
                          fill
                          className="object-cover object-center"
                          sizes="60px"
                        />
                      </div>
                      <div className="text-sm font-semibold text-primario">
                        {product.productTitle}
                      </div>
                    </div>
                    <div className="text-xs col-span-1 font-bold text-primario text-center">
                      S/ {product.discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-xs font-bold col-span-1 text-gray-700 text-center">
                      x{product.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-3 bg-[rgba(232,227,222,0.40)] p-4">
                <div className="mb-4">
                  <span className="text-secundario font-bold">
                    Total pagado:
                  </span>
                </div>
                <div className="flex justify-between border-t border-secundario pt-2">
                  <span>Sub total</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Descuento</span>
                  <span>- S/ {discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between border-b border-secundario font-bold py-2">
                  <span>Total</span>
                  <span>S/ {order.totalDiscountedPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-gray-700 mt-3 bg-[rgba(232,227,222,0.40)] pb-3 p-3">
                <div>
                  <h4 className="font-semibold text-secundario">📍 Envío</h4>
                  <p>{order.shippingAddress.fullAddress}</p>
                  <p>
                    {order.shippingAddress.district} -{" "}
                    {order.shippingAddress.province},{" "}
                    {order.shippingAddress.department}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secundario">👤 Cliente</h4>
                  <p>{order.contactInfo.fullName}</p>
                  <p>{order.contactInfo.email}</p>
                  <p>{order.contactInfo.cel}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-secundario">💳 Pago</h4>
                  <p>{order.paymentDetails.paymentType}</p>
                  <p>{order.paymentDetails.status}</p>
                  <p>{order.paymentDetails.payerEmail}</p>
                </div>
              </div>
            </div>

            {isFailed && (
              <div className="p-4 bg-red-50 mt-3 text-center text-sm">
                <p className="text-red-600 font-bold mb-2">
                  El pago de esta orden no se procesó correctamente.
                </p>
                <button
                  onClick={handleRetry}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
                >
                  INTENTAR NUEVAMENTE
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
