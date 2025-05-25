"use client";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbArrowRightDashed } from "react-icons/tb";

interface Props {
  product: Product;
}

export default function ProductGridItem({ product }: Props) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  // Calculamos el precio con descuento si existe
  const discountAmount = product.discount
    ? product.price * product.discount
    : 0;
  const finalPrice = (product.price - discountAmount).toFixed(2);

  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-2xl overflow-hidden transition lg:hover:shadow-xl h-full">
      <div className="relative w-full aspect-[3/3] overflow-hidden group">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className="object-cover transition duration-300 ease-in-out md:group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-[#DCF3FF]  text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            -{Math.round(product.discount * 100)}%
          </div>
        )}

        <Link
          href={"/"}
          className="absolute bottom-0 text-xs md:text-lg left-0 right-0 text-center text-white bg-turquesa py-2 lg:opacity-0  lg:group-hover:opacity-100 transition-opacity duration-300"
        >
          AGREGAR AL CARRITO
        </Link>
      </div>

      <div className="flex flex-col justify-between p-4 h-[140px]">
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-700 md:text-lg font-bold">
            s/{finalPrice}
            {product.discount > 0 && (
              <span className="text-[10px] md:text-lg text-gray-400 line-through ml-2">
                s/{product.price}
              </span>
            )}
          </div>
          <Link
            href={"/"}
            className="bg-[#FFF2D9] hover:bg-orange-400 p-2 rounded-full transition duration-300"
          >
            <TbArrowRightDashed size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
