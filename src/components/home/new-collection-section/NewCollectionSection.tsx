"use client";
import { Title } from "@/components/ui/title/Title";
import NewCollection from "@/components/home/product-collection-section/collection-home/NewCollection";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { Product } from "@/core/product/interface/productResponse";

interface Props {
  firsCollection: Collection | null;
  products: Product[];
  formattedDate: string;
}

export const NewCollectionSection = ({
  firsCollection,
  products,
  formattedDate,
}: Props) => {
  return (
    <section className="snap-start snap-always landscape:pt-17 w-full pt-15 md:pt-25 lg:pt-27 flex flex-col p-2 lg:px-6 h-screen min-h-[100dvh] lg:h-screen">
      <div className="flex w-full gap-2">
        <span className="text-[13px] md:text-[22px] lg:[32px] text-white bg-primario p-2 flex w-full justify-center text-center">
          NUEVA COLECCION
        </span>
        <span className="text-[13px] md:text-[22px] lg:[32px] text-white bg-primario p-2 flex w-full justify-center text-center">
          BEST SELLER
        </span>
      </div>
      <hr className="border-t border-gray-300 my-2" />
      <Title
        headerItems={[
          "Nueva Colección",
          formattedDate || "(fecha no disponible)",
          firsCollection ? "¡Disponible ya!" : "¡Muy pronto!",
        ]}
        title={firsCollection?.headlineTitle || "Prepárate para algo nuevo"}
        description1={
          firsCollection?.descriptionLine1 ||
          "Estamos preparando nuestra próxima colección exclusiva."
        }
        description2={firsCollection?.descriptionLine2 || "Muy pronto"}
        className="bg-[rgba(232,227,222,0.40)] py-1 landscape:py-4"
      />
      <hr className=" border-t border-gray-300 my-2" />
      {products.length > 0 ? (
        <NewCollection products={products} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          No hay productos para esta colección aún.
        </div>
      )}
    </section>
  );
};
