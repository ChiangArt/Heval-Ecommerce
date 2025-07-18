// components/product/ProductDetails.tsx
"use client";

import { Product } from "@/core/product/interface/productResponse";
import StatusRotator from "../status-rotator/StatusRotator";


interface Props {
  product: Product;
  discount: number;
  discountEnd: string | null;
  isDiscountValid: boolean;
}
export default function ProductDetails({
  product,
  discount,
  discountEnd,
  isDiscountValid,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-black uppercase text-2xl text-secundario font-inter pb-2">
        {product.title}
      </h1>

      <div className="flex gap-2 w-full flex-col md:flex-row items-start">
        <div className="flex items-center gap-2 flex-[2] bg-primario text-white text-sm md:text-lg font-bold px-3 py-2 justify-center">
          <span>S/{discount.toFixed(2)}</span>
          {isDiscountValid && product.discountPercentage > 0 && (
            <>
              <span>/</span>
              <span className="text-[10px] md:text-sm text-gray-400 line-through">
                S/{product.price.toFixed(2)}
              </span>
            </>
          )}
        </div>

        <StatusRotator
          quantity={product.quantity}
          discountPercentage={product.discountPercentage}
          discountEnd={discountEnd}
        />
      </div>

      <h3 className="font-bold pt-4 text-lg text-secundario">Descripción</h3>
      <p>{product.description}</p>

      <div className="flex flex-col text-primario pt-5 text-base space-y-1">
        <div>
          <span className="font-extrabold mr-1">Material:</span>
          <span className="break-words">{product.material}</span>
        </div>
        <div>
          <span className="font-bold mr-1">Color:</span>
          <span className="break-words">{product.colors}</span>
        </div>
        <div>
          <span className="font-bold mr-1">Descripción de Arquetipo:</span>
          <span className="break-words">{product.descriptionArchetype}</span>
        </div>
      </div>
    </div>
  );
}
