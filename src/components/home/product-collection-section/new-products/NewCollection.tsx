import ProductItem from "@/components/shop/products/ProductItem";
import { Product } from "@/core/product/interface/productResponse";
import React from "react";

interface Props {
  products: Product[];
}

export default function NewCollection({ products }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2 md:gap-2  landscape:lg:grid-cols-4 landscape:md:grid-cols-3">
      {products[0] && (
        <ProductItem key={products[0].id} product={products[0]} />
      )}
      {products[1] && (
        <div>
          <ProductItem key={products[1].id} product={products[1]} />
        </div>
      )}
      {products[2] && (
        <div>
          <ProductItem key={products[2].id} product={products[2]} />
        </div>
      )}
      {products[3] && (
        <div>
          <ProductItem key={products[3].id} product={products[3]} />
        </div>
      )}
    </div>
  );
}
