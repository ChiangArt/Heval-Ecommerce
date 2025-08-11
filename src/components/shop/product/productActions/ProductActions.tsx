"use client";
import React, { useState } from "react";
import { QuantitySelector } from "@/components/ui/quantity-selector/QuantitySelector";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import Link from "next/link";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import { useOverlayStore } from "@/store/ui/use-overlay-store";

export default function ProductActions({
  id,
  stock,
}: {
  id: number;
  stock: number;
}) {
  const { openCartSideMenu } = useCartUIStore();
  const { addItem } = useUnifiedCartStore();
  const { showOverlay, hideOverlay } = useOverlayStore();
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const isOutOfStock = !stock || stock <= 0;

  const handleAdd = async () => {
    if (isPending || isOutOfStock) return;
    if (quantity < 1) {
      toast.error("La cantidad debe ser al menos 1");
      return;
    }
    if (quantity > stock) {
      toast.error("No hay suficiente stock");
      return;
    }

    try {
      showOverlay();
      setIsPending(true);
      await addItem(id, quantity);
      toast.success("Producto agregado al carrito 🛒");
    } catch {
      toast.error("Error al agregar al carrito");
    } finally {
      setIsPending(false);
      hideOverlay();
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* Selector de cantidad */}
      <div className="flex items-center">
        <span className="mr-2 font-medium">Cantidad:</span>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={(newQty) => {
            if (newQty < 1) return;
            if (newQty > stock) {
              toast.error("No hay suficiente stock");
              return;
            }
            setQuantity(newQty);
          }}
        />
      </div>

      {/* Botón comprar ahora */}
      <Link
        className={`w-full ${
          isPending || isOutOfStock ? "pointer-events-none cursor-not-allowed" : ""
        }`}
        href={isOutOfStock ? "#" : "/shop/checkout"}
        onClick={(e) => {
          if (isOutOfStock) e.preventDefault();
        }}
      >
        <Button
          loading={isPending}
          title={isOutOfStock ? "SIN STOCK" : "COMPRAR AHORA"}
          loadingVariant="fill"
          className={`w-full font-semibold ${
            isOutOfStock
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-secundario text-white"
          }`}
        />
      </Link>

      {/* Botón agregar al carrito */}
      <Button
        onClick={async () => {
          await handleAdd();
          if (!isOutOfStock) openCartSideMenu();
        }}
        loading={isPending}
        title={
          isOutOfStock
            ? "SIN STOCK"
            : isPending
            ? "AGREGANDO..."
            : "AGREGAR AL CARRITO"
        }
        loadingVariant="fill"
        disabled={isOutOfStock || isPending}
        className={`border-1 font-semibold ${
          isOutOfStock
            ? "bg-gray-400 text-white cursor-not-allowed"
            : isPending
            ? "bg-secundario text-white"
            : "text-secundario"
        }`}
      />

      <p className="text-sm text-gray-500">
        {isOutOfStock ? "Agotado" : `Stock disponible: ${stock}`}
      </p>
    </div>
  );
}
