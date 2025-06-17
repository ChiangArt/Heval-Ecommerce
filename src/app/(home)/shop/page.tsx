import React from "react";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/pagination/Pagination";
import { getCollections } from "@/core/collection/action/collection.actions";

interface SearchParams {
  page?: string;
  colors?: string;
  coleccion?: string;
  sort?: string;
}

export default async function ShopPageInit({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const page = parseInt(searchParams?.page ?? "0");
  const colors = searchParams?.colors ?? "";
  const coleccionId = searchParams?.coleccion;
  const id = coleccionId ? Number(coleccionId) : undefined;
  const sort = searchParams?.sort; 

let sortDirection: "asc" | "desc" | undefined = undefined;

if (sort?.startsWith("price,")) {
  const parts = sort.split(",");
  if (parts[1] === "asc" || parts[1] === "desc") {
    sortDirection = parts[1];
  }
}

  const { content: products, totalPages } = await getProducts(page, 20, {
    colors,
    coleccionId: id,
    sortDirection

  });

  const collecciones = await getCollections();

  const coloresDisponibles = [
  ...new Set(products.flatMap((p) => p.colors))
];

  if (page >= totalPages) {
    redirect("/shop?page=0");
  }


  return (
    <div className="landscape:px-7">
      
      <ShopSection />
      <Filters
        coleccionesDisponibles={collecciones.map((c) => ({
          id: c.id,
          name: c.name,
        }))}
        coloresDisponibles={coloresDisponibles}
        totalResultados={products.length}
      />
      <hr className="my-2 border-t-1 border-primario" />
      <ProductGrid products={products} />
      <Pagination currentPage={page} totalPages={totalPages} />
      <hr className="border-t-1 border-primario" />
    </div>
  );
}
