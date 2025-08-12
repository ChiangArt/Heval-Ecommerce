"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import ContactForm from "@/components/ui/form/ContactForm";
import { QuantitySelector } from "@/components/ui/quantity-selector/QuantitySelector";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import CheckoutProductSkeleton from "@/components/ui/skeleton/CheckoutProductSkeleton";
import {
  applyCouponToCart,
  removeCouponFromCart,
} from "@/core/cart/action/cart.actions";
import { logError } from "@/app/utils/logger";

export default function ContactFormPage() {
  const {
    items: cart,
    updateItem,
    removeItem,
    subtotal,
    discount,
    total,
    loading,
    fetchItems,
    coupon: appliedCoupon,
  } = useUnifiedCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      toast.error("Por favor ingresa un código");
      return;
    }

    try {
      setIsApplying(true);
      await applyCouponToCart(couponInput);
      await fetchItems();
      toast.success("Cupón aplicado exitosamente");
      setCouponInput("");
    } catch (error) {
      logError("❌ Error al aplicar cupón:", error);
      toast.error("Cupón inválido o expirado");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCouponFromCart();
      await fetchItems();
      toast.success("Cupón eliminado");
    } catch (error) {
      logError("❌ Error al eliminar cupón:", error);
      toast.error("No se pudo quitar el cupón");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-30 md:px-3 landscape:px-20">
      {/* Formulario */}
      <section className="bg-white p-5 lg:p-20">
        <ContactForm />
      </section>

      {/* Resumen */}
      <section className="space-y-10">
        <div className="bg-white p-6 text-xs shadow-sm">
          <h3 className="font-bold text-[#001243] mb-4">RESUMEN DE PEDIDO</h3>

          {/* Encabezado */}
          <div className="font-semibold text-gray-500 grid grid-cols-20 border-b pb-2">
            <span className="col-span-8">Producto</span>
            <span className="text-center col-span-5">Precio</span>
            <span className="text-right">Cantidad</span>
          </div>

          {/* Lista de productos */}
          <div className="divide-y">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CheckoutProductSkeleton key={i} />
                ))
              : cart.map((product) => (
                  <div
                    key={product.productId}
                    className="grid grid-cols-20 gap-2 py-4 items-center"
                  >
                    <div className="col-span-8 flex gap-4 items-center">
                      <div className="relative w-[60px] h-[80px] flex-shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover object-center"
                          sizes="60px"
                        />
                      </div>
                      <div className="text-xs text-primario">
                        {product.title}
                      </div>
                    </div>
                    <div className="col-span-5 text-center">
                      <span className="font-bold text-primario">
                        S/ {product.discountedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <QuantitySelector
                        quantity={product.quantity}
                        onQuantityChange={(newQty) =>
                          updateItem(product.productId, newQty)
                        }
                        onRemove={() => removeItem(product.productId)}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Pago */}
        <div className="bg-white p-6 text-xs">
          <h3 className="text-xl font-bold text-[#001243] mb-4">
            CANTIDAD A PAGAR
          </h3>

          {/* Cupón */}
          {appliedCoupon ? (
            <div className="flex justify-between items-center bg-green-50 text-green-700 p-2 border rounded mb-2">
              <span>
                Cupón aplicado:
                <strong>{appliedCoupon.code}</strong> (-
                {appliedCoupon.discountPercentage}%)
              </span>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-500 hover:underline text-sm cursor-pointer"
              >
                Quitar
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ingresa el código"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="border w-full px-3 py-2"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={isApplying}
                className="bg-[#001243] text-white px-4 py-2 hover:bg-opacity-90 transition disabled:opacity-50 cursor-pointer"
              >
                {isApplying ? "Aplicando..." : "AGREGAR CUPÓN"}
              </button>
            </div>
          )}

          <p className="text-gray-500 mb-4">
            Cupón disponible solo por campaña
          </p>

          <div className="space-y-2 border-t pt-2">
            <div className="flex justify-between">
              <span>Sub total</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Descuento</span>
              <span>S/ {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
