import { notFound } from "next/navigation";
import { getCollections } from "@/core/collection/action/collection.actions";
import CollectionGrid from "@/components/collections/collection-grid/CollectionGrid";
import { Title } from "@/components/ui/title/Title";
import { getProductsByCollectionId } from "@/core/product/action/product.actions";

interface Props {
  params: { slug: string };
}

export default async function CollectionBySlugPage({ params }: Props) {
  const { slug } = params;
  const date = new Date("2025-06-25T06:35:14.835Z");

  const formatted = date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "numeric",
  });

  // 1. Obtener todas las colecciones
  const collections = await getCollections();

  // 2. Buscar la colección que tenga el slug deseado
  const collection = collections.find((col) => col.slug === slug);

  if (!collection) return notFound();

  // 3. Obtener productos por ID de la colección
  const products = await getProductsByCollectionId(collection.id);

  return (
    <main className="p-4 pt-25">
      <hr className=" border-t border-gray-300 my-2" />

      <Title
        headerItems={["Nueva Colección", `(${formatted})`, "Disponible ya"]}
        title={`${collection.headlineTitle}`}
        description1={collection.descriptionLine1 || ""}
        description2={collection.descriptionLine2 || ""}
        className="py-8  bg-[rgba(232,227,222,0.40)]"
      />

      <hr className=" border-t border-gray-300 my-2" />

      <CollectionGrid products={products} />

      <hr className="my-6 border-t-2 border-gray-300" />
    </main>
  );
}
