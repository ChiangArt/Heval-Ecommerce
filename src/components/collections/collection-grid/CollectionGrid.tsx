import React from "react";
import { Product } from "@/core/product/interface/productResponse";
import ProductItem from "@/components/shop/products/ProductItem";

interface Props {
  products: Product[];
}

export default function CollectionGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 p-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
