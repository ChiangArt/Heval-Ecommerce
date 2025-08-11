"use client";
import { Product } from "@/core/product/interface/productResponse";
import { useState } from "react";
import Image from "next/image";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";

interface Props {
  product: Product;
}

export default function SearchedProduct({ product }: Props) {
  const addItem = useUnifiedCartStore((state) => state.addItem);
  const openCart = useCartUIStore((state) => state.openCartSideMenu);

  const [quantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [displayImage, setDisplayImage] = useState(
    product.imageUrls?.[0] ?? "/placeholder.jpg"
  );

  const handleAdd = async () => {
    if (isPending) return;
    if (quantity < 1) {
      toast.error("La cantidad debe ser al menos 1");
      return;
    }
    if (product.quantity && quantity > product.quantity) {
      toast.error("No hay suficiente stock");
      return;
    }

    setIsPending(true);
    try {
      await addItem(product.id, quantity); // Maneja guest o logueado internamente
      openCart();
      toast.success("Producto agregado al carrito 🛒");
    } catch {
      toast.error("Error al agregar al carrito");
    } finally {
      setIsPending(false);
    }
  };

  const hasStock = product.quantity > 0;

  return (
    <div className="flex flex-col text-[10px] justify-between bg-white overflow-hidden transition h-full">
      <div className="relative w-full h-full overflow-hidden group">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className={`object-cover transition duration-300 ease-in-out md:group-hover:scale-110 ${
            !hasStock ? "opacity-50" : ""
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          onMouseEnter={() => {
            if (product.imageUrls.length > 1) setDisplayImage(product.imageUrls[1]);
          }}
          onMouseLeave={() => setDisplayImage(product.imageUrls[0])}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-secundario text-white text-xs font-semibold px-2 py-1 shadow-sm z-10">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Botón siempre visible en la parte baja */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Button
            onClick={handleAdd}
            loading={isPending}
            title={isPending ? "AGREGANDO..." : hasStock ? "AGREGAR AL CARRITO" : "SIN STOCK"}
            loadingVariant="fill"
            disabled={!hasStock || isPending}
            className={`w-full text-xs md:text-lg text-center py-2
              ${hasStock
                ? "bg-secundario text-white hover:bg-secundario/90 cursor-pointer"
                : "bg-gray-600 bg-opacity-60 text-gray-300 cursor-not-allowed"}
              ${isPending ? "opacity-70 cursor-wait" : ""}
            `}
          />
        </div>
      </div>
    </div>
  );
}
