'use client'
import { Product } from "@/core/product/interface/productResponse";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbArrowRightDashed } from "react-icons/tb";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
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
    } catch {
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

  const isDiscountValid = new Date(product.discountUntil) > new Date();
  const discount =
    isDiscountValid && product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  return (
    <div className="flex flex-col text-[10px] justify-between bg-white overflow-hidden transition h-full">
      <div className="relative w-full aspect-[4/4] landscape:aspect-[3/3] md:aspect-[3/2] overflow-hidden group">
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
          className={`absolute bottom-0 text-xs md:text-lg left-0 right-0 text-center text-white bg-secundario  landscape:opacity-0 landscape:group-hover:opacity-100 transition-opacity cursor-pointer duration-300 ${
            isPending ? "bg-secundario text-white" : "text-secundario"
          }`}
        />
      </div>
      <div className="flex flex-col justify-between p-2 md:p-4">
        <p className="md:text-sm font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <div className="sm:text-sm text-secundario md:text-lg font-bold">
            <span>S/{discount.toFixed(2)}</span>
            {isDiscountValid && product.discountPercentage > 0 && (
              <>
                <span> / </span>
                <span className="text-[10px] md:text-sm text-gray-400 line-through">
                  S/{product.price.toFixed(2)}
                </span>
              </>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="bg-[rgba(9,32,89,0.10)] hover:bg-[rgba(9,32,89,0.30)] p-2 rounded-full transition duration-300"
          >
            <TbArrowRightDashed  className="text-secundario text-[13px] sm:text-[20px] md:text-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
