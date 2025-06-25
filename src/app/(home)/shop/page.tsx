import React from "react";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";
import { getCollections } from "@/core/collection/action/collection.actions";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ProductGrid from "@/components/shop/products/ProductGrid";

const ShopSection = dynamic(() => import("@/components/shop/ShopSection"));
const Filters = dynamic(() => import("@/components/ui/filter/Filters"), {
  loading: () => <p className="p-4">Cargando filtros...</p>,
});


const Pagination = dynamic(
  () => import("@/components/ui/pagination/Pagination"),
  {
    loading: () => <p className="p-4">Cargando paginación...</p>,
  }
);

type SearchParamsType = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}): Promise<Metadata> {
  const params = await searchParams;

  const page = params.page?.toString() || "1";
  const color = params.colors?.toString();
  const coleccion = params.coleccion?.toString();

  let title = `Productos - Página ${page}`;
  if (color) title += ` | Color: ${color}`;
  if (coleccion) title += ` | Colección ${coleccion}`;

  return {
    title,
    description:
      "Explora nuestros productos en Heval. Filtra por color, colección o precio.",
  };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = await searchParams;

  const page = parseInt(params.page?.toString() || "0", 10);
  const colors = params.colors?.toString() || "";
  const coleccionId = params.coleccion?.toString();
  const sort = params.sort?.toString();

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
      products.flatMap((p) => (Array.isArray(p.colors) ? p.colors : []))
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
      <hr className="border-t-1 mb-30 border-primario" />
    </div>
  );
}
