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
      await addItem(product.id, quantity); // ← se maneja si es guest o logueado
      openCart();
      toast.success("Producto agregado al carrito 🛒");
    } catch  {
      toast.error( "Error al agregar al carrito");
    } finally {
      setIsPending(false);
    }
  };

  const [quantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const [displayImage, setDisplayImage] = useState(
    product.imageUrls?.[0] ?? "/placeholder.jpg"
  );

  return (
    <div className="flex flex-col   bg-white transition h-full">
      <div className="relative w-full aspect-[4/3]  md:aspect-[2/4] landscape:aspect-[3/2] overflow-hidden group">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className="object-cover transition duration-300 ease-in-out md:group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          onMouseEnter={() => {
            if (product.imageUrls.length > 1) {
              setDisplayImage(product.imageUrls[1]);
            }
          }}
          onMouseLeave={() => {
            setDisplayImage(product.imageUrls[0]);
          }}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-secundario text-white text-xs font-semibold px-2 py-1 shadow-sm">
            -{product.discountPercentage}%
          </div>
        )}
        <Button
          onClick={async () => {
            await handleAdd();
          }}
          loading={isPending}
          title={isPending ? "AGREGAR AL CARRITO" : "AGREGAR AL CARRITO"}
          loadingVariant="fill"
          className={`absolute bottom-0 text-xs md:text-lg left-0 right-0 text-center text-white bg-secundario py-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer duration-300 ${
            isPending ? "bg-secundario text-white" : "text-secundario"
          }`}
        />
      </div>
    </div>
  );
}
