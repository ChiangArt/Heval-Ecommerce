import { notFound } from "next/navigation";
import { getCollections } from "@/core/collection/action/collection.actions";
import CollectionGrid from "@/components/collections/collection-grid/CollectionGrid";
import { Title } from "@/components/ui/title/Title";
import { getProductsByCollectionId } from "@/core/product/action/product.actions";

type Params = { slug: string };

export default async function CollectionBySlugPage({
  params,
}: {
  params: Promise<Params>; 
}) {
  const { slug } = await params; 

  const collections = await getCollections();

  const collection = collections.find((col) => col.slug === slug);

  if (!collection) return notFound();

  const products = await getProductsByCollectionId(collection.id);

  // Formatear la fecha una vez que confirmamos la colección
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
