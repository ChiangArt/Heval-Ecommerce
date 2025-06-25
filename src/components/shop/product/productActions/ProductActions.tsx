"use client";
import React, { useState } from "react";
import { QuantitySelector } from "@/components/ui/quantity-selector/QuantitySelector";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import Link from "next/link";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";

// Recibe id y stock como props del producto
export default function ProductActions({
  id,
  stock,
}: {
  id: number;
  stock: number;
}) {
  const { openCartSideMenu } = useCartUIStore();
  const { addItem } = useUnifiedCartStore(); // <- uso del store unificado

  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const handleAdd = async () => {
    if (isPending) return;
    if (quantity < 1) {
      toast.error("La cantidad debe ser al menos 1");
      return;
    }
    if (quantity > stock) {
      toast.error("No hay suficiente stock");
      return;
    }

    try {
      setIsPending(true);
      await addItem(id, quantity); 
      toast.success("Producto agregado al carrito 🛒");
    } catch  {
      toast.error( "Error al agregar al carrito");
    } finally {
      setIsPending(false);
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

      <Link
        className={`w-full ${
          isPending ? "pointer-events-none cursor-default" : ""
        }`}
        href={"/shop/checkout"}
      >
        <Button
          loading={isPending}
          title={isPending ? "COMPRAR AHORA" : "COMPRAR AHORA"}
          loadingVariant="fill"
          className="w-full bg-secundario text-white font-semibold"
        />
      </Link>

      <Button
        onClick={async () => {
          await handleAdd();
          openCartSideMenu();
        }}
        loading={isPending}
        title={isPending ? "AGREGANDO..." : "AGREGAR AL CARRITO"}
        loadingVariant="fill"
        className={`border-1 font-semibold ${
          isPending ? "bg-secundario text-white" : "text-secundario"
        }`}
      />

      <p className="text-sm text-gray-500">
        {stock > 0 ? `Stock disponible: ${stock}` : "Agotado"}
      </p>
    </div>
  );
}
