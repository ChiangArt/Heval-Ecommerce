import Filter from "@/components/shop/Filter";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
import { initialData } from "@/seed/seed";
import React from "react";

const products = initialData.products;

export default function ShopPage() {
  return (
    <>
      <ShopSection />
      <Filter />
      <hr className="my-2 border-t-2 border-gray-300 " />
      <ProductGrid products={products} />
    </>
  );
}
