"use client";
import { Product } from "@/core/product/interface/productResponse";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbArrowRightDashed } from "react-icons/tb";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import toast from "react-hot-toast";
import { useOverlayStore } from "@/store/ui/use-overlay-store";

interface Props {
  product: Product;
  aspectRatio?: string;
}

export default function ProductItem({ product, aspectRatio }: Props) {
  const { showOverlay, hideOverlay } = useOverlayStore();
  const addItem = useUnifiedCartStore((state) => state.addItem);
  const openCart = useCartUIStore((state) => state.openCartSideMenu);
  const [quantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [displayImage, setDisplayImage] = useState(
    product.imageUrls?.[0] ?? "/placeholder.jpg"
  );

  const now = new Date();
  const hasDiscount = product.discountPercentage > 0;
  const isDiscountValid =
    !product.discountUntil || new Date(product.discountUntil) > now;
  const isDiscountActive = hasDiscount && isDiscountValid;

  const finalPrice = isDiscountActive
    ? product.currentPrice ?? product.price
    : product.price;

  const isOutOfStock = !product.quantity || product.quantity <= 0;

  const handleAdd = async () => {
    if (isPending || isOutOfStock) return;

    if (quantity < 1) {
      toast.error("La cantidad debe ser al menos 1");
      return;
    }

    if (product.quantity && quantity > product.quantity) {
      toast.error("No hay suficiente stock");
      return;
    }

    try {
      showOverlay();
      setIsPending(true);
      await addItem(product.id, quantity);
      openCart();
      toast.success("Producto agregado al carrito 🛒");
    } catch {
      toast.error("Error al agregar al carrito");
    } finally {
      setIsPending(false);
      hideOverlay();
    }
  };

  return (
    <div
      className={`flex flex-col text-[10px] h-full justify-between bg-white overflow-hidden transition ${
        isOutOfStock ? "opacity-70" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden group ${
          aspectRatio ?? "aspect-[3/3]"
        }`}
      >
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

        {isDiscountActive && (
          <div className="absolute top-2 right-2 bg-secundario text-white text-xs font-semibold px-2 py-1 shadow-sm">
            -{product.discountPercentage}%
          </div>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending || isOutOfStock}
          className={`absolute bottom-0 left-0 right-0 p-2 md:px-6 md:py-3 text-[10px] landscape:text-lg md:text-sm font-semibold flex items-center justify-center gap-2
            text-white transition-opacity duration-300
            ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secundario cursor-pointer hover:opacity-90"
            }
            ${isPending ? "pointer-events-none" : ""}
          `}
        >
          {isPending && (
            <>
              <span className="absolute left-0 top-0 h-full w-full bg-white/30 animate-fill-right" />
              <svg
                className="w-4 h-4 animate-spin text-white relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </>
          )}
          <span className="relative z-10">
            {isOutOfStock
              ? "SIN STOCK"
              : isPending
              ? "AGREGANDO..."
              : "AGREGAR AL CARRITO"}
          </span>
        </button>
      </div>

      <div className="flex flex-col justify-between p-2 md:p-4">
        <p className="md:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[30px]">
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <div className="sm:text-sm text-secundario md:text-lg font-bold">
            <span>S/{finalPrice.toFixed(2)}</span>
            {isDiscountActive && (
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
            <TbArrowRightDashed className="text-secundario text-[13px] sm:text-[20px] md:text-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
