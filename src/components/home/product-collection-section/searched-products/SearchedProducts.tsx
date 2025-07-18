import { Product } from "@/core/product/interface/productResponse";
import React from "react";
import SearchedProduct from "./SearchedProduct";
interface Props {
  products: Product[];
}

export default function SearchedProducts({ products }: Props) {
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
        {products.slice(0, 2).map((product) => (
             <SearchedProduct key={product.id} product={product} />
           ))}
      </div>
    </>
  );
}
