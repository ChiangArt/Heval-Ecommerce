import React from "react";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/pagination/Pagination";
import { getCollections } from "@/core/collection/action/collection.actions";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function Page({ searchParams }: Props) {
  // Parseo seguro de parámetros
  const page = parseInt(searchParams?.page?.toString() || "0", 10);
  const colors = searchParams?.colors?.toString() || "";
  const coleccionId = searchParams?.coleccion?.toString();
  const sort = searchParams?.sort?.toString();

  const parsedColeccionId = coleccionId ? Number(coleccionId) : undefined;

  let sortDirection: "asc" | "desc" | undefined;
  if (sort?.startsWith("price,")) {
    const [, direction] = sort.split(",");
    if (direction === "asc" || direction === "desc") {
      sortDirection = direction;
    }
  }

  // Fetch productos
  const { content: products, totalPages } = await getProducts(page, 20, {
    colors,
    coleccionId: parsedColeccionId,
    sortDirection,
  });

  // Redirige si la página está fuera de rango
  if (page >= totalPages) {
    redirect("/shop?page=0");
  }

  // Fetch colecciones
  const colecciones = await getCollections();

  // Extraer colores únicos de los productos
  const coloresDisponibles: string[] = [
    ...new Set(
      products.flatMap((p) => Array.isArray(p.colors) ? p.colors : [])
    ),
  ];

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
