import { Product } from "@/interfaces/product.interface";
import React from "react";
import ProductGridItem from "./ProductGridItem";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 p-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductGridItem key={product.id} product={product} />
      ))}
    </div>
  );
}
