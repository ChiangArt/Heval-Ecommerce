import React from "react";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/pagination/Pagination";

interface ShopPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function ShopPageInit({ searchParams }: ShopPageProps) {

const page = parseInt(searchParams?.page ?? "0");

 const { content: products, totalPages } = await getProducts(page, 20);

  if (page >= totalPages) {
    redirect("/shop?page=0");

  }
  return (
    <div>

 
        <ShopSection />
        <Filters />
        <hr className="my-2 border-t-1 border-primario" />
        <ProductGrid products={products} />
        <Pagination currentPage={page} totalPages={totalPages}/>
        <hr className="border-t-1 border-primario" />

    </div>
  );
}
