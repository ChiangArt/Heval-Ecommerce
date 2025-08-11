import React from "react";
import { getProductByColors, getProducts } from "@/core/product/action/product.actions";
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

  try {
    const [{ content: products, totalPages }, colecciones, coloresDisponibles,] = await Promise.all([
      getProducts(page, 20, { colors, coleccionId: id, sortDirection }),
      getCollections(),
      getProductByColors(),
    ]);

    if (page >= totalPages) {
      redirect("/shop?page=0");
    }

    return (
      <div className="px-2">
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
  } catch (error) {
    console.error("Error al obtener datos del backend:", error);

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-center text-red-600">
        <h2 className="text-2xl font-bold">Error de conexión</h2>
        <p>No se pudo conectar con el servidor. Intenta nuevamente más tarde.</p>
      </div>
    );
  }
}

