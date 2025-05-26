import CollectionGrid from "@/components/collections/collection-grid/CollectionGrid";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const collection = initialData.products;

export default function HomePage() {
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
      <CollectionGrid collections={collection} />
      <hr className="my-6 border-t-2 border-gray-300 " />
    </div>
  );
}
