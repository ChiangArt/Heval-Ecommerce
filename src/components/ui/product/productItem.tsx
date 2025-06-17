"use client";
import { Product } from "@/core/product/interface/productResponse";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbArrowRightDashed } from "react-icons/tb";

interface Props {
  product: Product;
}

export default function ProductItem({ product }: Props) {
  const [displayImage, setDisplayImage] = useState(
    product.imageUrls?.[0] ?? "/placeholder.jpg"
  );

  const isDiscountValid = new Date(product.discountUntil) > new Date();
  const discount =
    isDiscountValid && product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  return (
    <div className="flex flex-col justify-between bg-white  overflow-hidden transition  h-full">
      <div className="relative w-full aspect-[5/3] landscape:aspect-[4/4]  overflow-hidden group">
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
          <div className="absolute top-2 right-2 bg-secundario text-white text-xs font-semibold px-2 py-1  shadow-sm">
            -{product.discountPercentage}%
          </div>
        )}

        <Link
          href={"/"}
          className="absolute bottom-0 text-xs md:text-lg left-0 right-0 text-center text-white bg-secundario py-2 lg:opacity-0  lg:group-hover:opacity-100 transition-opacity duration-300"
        >
          AGREGAR AL CARRITO
        </Link>
      </div>

      <div className="flex flex-col justify-between p-4">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 ">
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-secundario md:text-lg font-bold">
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
            href={`/shop/product/${product.slug}`}
            className="bg-[rgba(9,32,89,0.10)] hover:bg-[rgba(9,32,89,0.30)] p-2 rounded-full transition duration-300"
          >
            <TbArrowRightDashed size={24} className="text-secundario" />
          </Link>
        </div>
      </div>
    </div>
  );
}
