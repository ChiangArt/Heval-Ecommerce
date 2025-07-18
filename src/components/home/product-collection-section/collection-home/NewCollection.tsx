import ProductItem from "@/components/shop/products/ProductItem";
import { Product } from "@/core/product/interface/productResponse";
import React from "react";

interface Props {
  products: Product[];
}

export default function NewCollection({ products }: Props) {
  return (
    <>
      {/* Mobile: 2 columnas */}
      <div className="grid grid-cols-2 gap-2 h-full md:hidden">
        {products.slice(0, 4).map((product) => (
          <ProductItem aspectRatio="h-full" key={product.id} product={product} />
        ))}
      </div>

      {/* Tablet (md): 2 columnas */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-2 h-full">
        {products.slice(0, 4).map((product) => (
          <ProductItem aspectRatio="h-full" key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop (lg): 3 columnas */}
      <div className="hidden lg:grid lg:grid-cols-3 xl:hidden gap-2 h-full">
        {products.slice(0, 6).map((product) => (
          <ProductItem aspectRatio="h-full" key={product.id} product={product} />
        ))}
      </div>

      {/* Pantallas grandes (xl y landscape): 4 columnas */}
      <div className="hidden xl:grid xl:grid-cols-4 gap-2 h-full">
        {products.slice(0, 4).map((product) => (
          <ProductItem aspectRatio="h-full" key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}