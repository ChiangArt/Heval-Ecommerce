import { useState } from "react";
// import Image from "next/image";
import { Order } from "@/core/order/interface/order";

interface Props {
  order: Order;
  loading: boolean;
}

export default function OrderItem({ order, loading }: Props) {
  const [expanded, setExpanded] = useState(false);

  const orderItems = order.orderItems;

  return (
    <div className="bg-white shadow-sm">
      {/* Encabezado del pedido */}
      <button
        className="w-full text-left px-6 py-4 border-b flex justify-between items-center hover:bg-gray-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xs font-semibold text-gray-700">
          Nro de Orden: {order.orderId}
        </span>
        <span className="text-xs text-white px-2 py-1 rounded bg-blue-500">
          {order.orderStatus.toUpperCase()}
        </span>
      </button>

      {/* Detalles del pedido */}
      {expanded && (
        <div className="p-6 text-xs space-y-6">
          {/* Encabezado productos */}
          <div className=" font-semibold text-gray-500 grid grid-cols-2 border-b pb-2">
            <span>Producto</span>
            <span className="text-center">Precio</span>
          </div>

          {/* Lista de productos */}
          <div className="divide-y">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="py-4 text-center text-gray-400">
                    Cargando...
                  </div>
                ))
              : orderItems.map((product) => (
                  <div
                    key={product.productId}
                    className="grid grid-cols-20 gap-2 py-4 items-center"
                  >
                    <div className="col-span-8 flex gap-4 items-center">
                      {/* <div className="relative w-[60px] h-[80px]">
                        <Image
                          src={product.imageUrl?.[0] ?? "/no-imagen.png"}
                          alt={product.productTitle}
                          fill
                          className="object-cover object-center"
                          sizes="60px"
                        />
                      </div> */}
                      <div className="text-xs text-primario">
                        {product.productTitle}
                      </div>
                    </div>
                    <div className="col-span-5 text-center font-bold text-primario">
                      S/ {product.discountPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
          </div>

          {/* Totales */}
          <div className="space-y-2 border-t pt-2">
            <div className="flex justify-between">
              <span>Sub total</span>
              <span>S/ {order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Descuento</span>
              <span>S/ {order.totalDiscountedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>S/ {order.totalDiscountedPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
