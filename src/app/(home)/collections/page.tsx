import CollectionGrid from "@/components/collections/collection-grid/CollectionGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { getProducts } from "@/core/product/action/product.actions";
import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams?.page ?? "0");

  const { content: products, totalPages } = await getProducts(page, 20);

  if (page >= totalPages) {
    redirect("/shop?page=0");
  }
  return (
    <div className="p-2 md:p-5">
      <hr className="my-6 border-t-2 border-gray-300 " />
      <Title
        headerItems={["Nueva Colección", "(06 / 2025)", "¡Disponible ya!"]}
        title="“Lo que papá realmente quiere”"
        description1="Edición limitada para papás únicos"
        description2="Especial Día del Padre"
      />
      <hr className="my-6 border-t-2 border-gray-300 " />
      <CollectionGrid products={products} />
      <Pagination currentPage={page} totalPages={totalPages} />

      <hr className="my-6 border-t-2 border-gray-300 " />
    </div>
  );
}
