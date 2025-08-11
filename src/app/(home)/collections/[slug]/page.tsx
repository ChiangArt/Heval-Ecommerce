import { notFound } from "next/navigation";
import { getCollections } from "@/core/collection/action/collection.actions";
import CollectionGrid from "@/components/collections/collection-grid/CollectionGrid";
import { Title } from "@/components/ui/title/Title";
import { getProductsByCollectionId } from "@/core/product/action/product.actions";

type Params = { slug: string };

export default async function CollectionBySlugPage({ params }: { params: Params }) {
  const { slug } = params;

  // Obtiene todas las colecciones
  const collections = await getCollections();

  // Busca la colección con el slug dado
  const collection = collections.find((col) => col.slug === slug);

  if (!collection) return notFound();

  // Obtiene los productos de la colección
  const products = await getProductsByCollectionId(collection.id);

  // Si quieres, valida que productos existan o manejar caso vacío
  // if (!products.length) return notFound();

  // Formatea la fecha de creación (o usa otra propiedad si prefieres)
  const createdDate = collection.createdAt ? new Date(collection.createdAt) : null;
  const formattedDate = createdDate
    ? createdDate.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "numeric",
      })
    : null;

  return (
    <main className="p-4 pt-25">
      <hr className="border-t border-gray-300 my-2" />

      <Title
        headerItems={["Nueva Colección", formattedDate ? `(${formattedDate})` : "", "Disponible ya"]}
        title={collection.headlineTitle}
        description1={collection.descriptionLine1 || ""}
        description2={collection.descriptionLine2 || ""}
        className="py-8 bg-[rgba(232,227,222,0.40)]"
      />

      <hr className="border-t border-gray-300 my-2" />

      <CollectionGrid products={products} />

      <hr className="my-6 border-t-2 border-gray-300" />
    </main>
  );
}
