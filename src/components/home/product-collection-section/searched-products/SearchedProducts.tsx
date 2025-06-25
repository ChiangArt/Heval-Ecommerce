
import { Product } from "@/core/product/interface/productResponse";
import React from "react";
import SearchedProduct from "./SearchedProduct";
interface Props {
  products: Product[];
}

export default function SearchedProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 landscape:lg:grid-cols-2">
      {products[0] && (
        <SearchedProduct key={products[0].id} product={products[0]} />
      )}
      {products[1] && (
        <div>
          <SearchedProduct key={products[1].id} product={products[1]} />
        </div>
      )}
    </div>
  );
}
