"use client";

import React from "react";
import Image from "next/image";
import { Order } from "@/core/order/interface/order";
import Link from "next/link";
// import { downloadBoleta } from "@/core/order/action/order.actions";

interface Props {
  order: Order;
}

export default function OrderSummary({ order }: Props) {
  const subtotal = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = order.totalPrice - order.totalDiscountedPrice;

  return (
    <div className="space-y-10">
      {/* Resumen de productos */}
      <div className="bg-white p-6 text-xs">
        <h3 className="font-bold text-[#001243] mb-4">RESUMEN DE PEDIDO</h3>

        {/* Encabezado */}
        <div className="font-semibold text-gray-500 grid grid-cols-20 border-b pb-2">
          <span className="col-span-13">Producto</span>
          <span className="text-center col-span-4">Precio</span>
          <span className="text-right col-span-3">Cantidad</span>
        </div>

        {/* Lista de productos */}
        <div className="divide-y">
          {order.orderItems.map((product) => (
            <div
              key={product.productId}
              className="grid grid-cols-20 gap-2 py-4 items-center"
            >
              <div className="col-span-13 flex gap-4 items-center">
                <div className="relative w-[60px] h-[80px] flex-shrink-0">
                  <Image
                    src={product.imageUrl[0]}
                    alt={product.productTitle}
                    fill
                    className="object-cover object-center"
                    sizes="60px"
                  />
                </div>
                <div className="text-xs text-primario">
                  {product.productTitle}
                </div>
              </div>
              <div className="col-span-4 text-center">
                <span className="font-bold text-primario">
                  S/ {product.discountedPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-right col-span-3 text-primario font-semibold">
                x{product.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pago */}
      <div className="bg-white p-6 text-xs">
        <h3 className="font-bold text-[#001243] mb-4">TOTAL PAGADO</h3>

        <div className="space-y-2 border-t border-secundario pt-2">
          <div className="flex justify-between">
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
          <div className="flex justify-between font-bold border-b border-secundario pt-2">
            <span>Total</span>
            <span>S/ {order.totalDiscountedPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón para seguir comprando */}
        <Link
          href={"/"}
          className="block bg-secundario text-white text-center py-4 mt-10 w-full hover:bg-secundario/80"
        >
          SEGUIR COMPRANDO
        </Link>

        {/* 🔻 Botón para descargar boleta en PDF */}
        {/* <button
          onClick={() => downloadBoleta(order.id)}
          className="block mt-4 text-center bg-[#001243] text-white py-4 w-full hover:bg-opacity-90 transition"
        >
          DESCARGAR BOLETA EN PDF
        </button> */}
      </div>
    </div>
  );
}
