import Carousel from "@/components/home/carousel/Carousel";
import Information from "@/components/ui/information/Information";
import MediaVideos from "@/components/home/media-videos/MediaVideos";
import NewProduct from "@/components/home/product-collection-section/new-products/NewProduct";
import SearchedProducts from "@/components/home/product-collection-section/searched-products/SearchedProducts";
import PromotionalGrid from "@/components/home/promotional-grid/PromotionalGrid";
import { Title } from "@/components/ui/title/Title";

const collectionHeaderItems = [
  "Nueva Colección",
  "(06 / 2025)",
  "¡Disponible ya!",
];

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <PromotionalGrid />
      {/* <ProductCollectionSection/> */}
      <div>
        <div className="p-5 md:p-15 w-full h-full">
          <hr className="my-8 border-t border-gray-300 " />
          {/* <NewCollection /> */}
          <Title
            headerItems={collectionHeaderItems}
            title="“Lo que papá realmente quiere”"
            description1="Edición limitada para papás únicos"
            description2="Edición limitada para papás únicos"
          />
          <hr className="my-8 border-t border-gray-300 " />
          <NewProduct />
        </div>

        <Title
          backgroundColor="bg-white"
          pretitle="Nuestros esenciales más buscados. "
          title="¡Favoritos que no puedes dejar pasar!"
          description1="Diseño simple, funcional y con estilo."
          description2="Descubre por qué todos los quieren."
        />
        <SearchedProducts />
        <Information
          title="¿Quiénes somos?"
          description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle trabajamos con las mejores telas del mercado y paleta de colores que realzan el atractivo Premium de la gorra que como marca nos da la sensación de exclusividad  nos comprometemos a cumplir tus expectativas asegurando responsabilidad puntualidad en nuestras entregas y una comunicación constante durante todo el proceso."
          link="VER MÁS"
          bgColor="bg-[#F7F3F3]"
        />

        <Title
          pretitle="Gorras en su mejor ángulo "
          title="Inspírate, comparte y únete"
          description1="Tu próxima gorra favorita está en estos clips"
        />
        <MediaVideos />
        <Information
          textColorLink="text-turquesa"
          textColor="text-white"
          title="¡Hablemos!"
          description2="Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro equipo está listo para atenderte."
          linkText="DEJANOS UN MENSAJE"
          link="/"
          bgLink="bg-white"
          bgColor="bg-turquesa"
        />
      </div>
    </div>
  );
}
