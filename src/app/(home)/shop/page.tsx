import React from "react";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/pagination/Pagination";
import { getCollections } from "@/core/collection/action/collection.actions";



export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const page = parseInt(searchParams?.page?.toString() || "0", 10);
  const colors = searchParams?.colors?.toString() || "";
  const coleccionId = searchParams?.coleccion?.toString();
  const sort = searchParams?.sort?.toString();

  const id = coleccionId ? Number(coleccionId) : undefined;

  let sortDirection: "asc" | "desc" | undefined;
  if (sort?.startsWith("price,")) {
    const [, direction] = sort.split(",");
    if (direction === "asc" || direction === "desc") {
      sortDirection = direction;
    }
  }

  const { content: products, totalPages } = await getProducts(page, 20, {
    colors,
    coleccionId: id,
    sortDirection,
  });

  const colecciones = await getCollections();

  const coloresDisponibles = [
    ...new Set(
      products.flatMap((p) => Array.isArray(p.colors) ? p.colors : [])
    ),
  ];

  if (page >= totalPages) {
    redirect("/shop?page=0");
  }

  return (
    <div className="landscape:px-7">
      <ShopSection />
      <Filters
        coleccionesDisponibles={colecciones.map((c) => ({
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
