import Information from "@/components/ui/information/Information";
import MediaVideos from "@/components/home/media-videos/MediaVideos";
import NewProduct from "@/components/home/product-collection-section/new-products/NewProduct";
import SearchedProducts from "@/components/home/product-collection-section/searched-products/SearchedProducts";
import PromotionalGrid from "@/components/home/promotional-grid/PromotionalGrid";
import { Title } from "@/components/ui/title/Title";
import SlidesShow from "@/components/home/carousel/SlidesShow";
import News from "@/components/ui/footer/News";
import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";
import { Sidebar } from "@/components/ui/side-bar/SideBar";

const videos = [
  {
    id: "1",
    url: "/WhatsApp Video 2025-05-21 at 7.16.22 PM.mp4",
    title: "SÍGUENOS EN TIK TOK",
  },
  {
    id: "2",
    url: "/WhatsApp Video 2025-05-21 at 7.16.22 PM (2).mp4",
    title: "SÍGUENOS EN FACEBOOK",
  },
  {
    id: "3",
    url: "/WhatsApp Video 2025-05-21 at 7.21.04 PM.mp4",
    title: "SÍGUENOS EN INSTAGRAM",
  },
];

export default function HomePage() {
  return (
    <main className="snap-y snap-mandatory h-screen w-full">
      {/* VIDEO BANNER */}
      <section className="snap-start h-screen snap-always w-full">
        <AnnouncementBar />
        <TopMenu />
        <Sidebar />
        <SlidesShow
          images={[
            "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
            "/482021385_122110669598786935_6815489652951560821_n.jpg",
            "/banner1 (2).jpg",
            "/banner2 (2).jpg",
          ]}
        />
      </section>

      <section className="snap-start snap-always h-screen w-full pt-17 lg:pt-20 flex flex-col p-2 lg:px-6">
        <PromotionalGrid />
        <hr className="border-t border-gray-300 my-2" />
        <Title
          headerItems={["Nueva Colección", "(06 / 2025)", "¡Disponible ya!"]}
          title="“Lo que papá realmente quiere”"
          description1="Edición limitada para papás únicos"
          description2="Edición limitada para papás únicos"
          className="py-4 bg-[#F7F3F3]"
        />
        <hr className=" border-t border-gray-300 my-2" />

        <NewProduct />
      </section>

      <section className="snap-start snap-always pt-20 h-screen w-full p-2 lg:px-6 ">
        <Title
          backgroundColor="bg-white"
          pretitle="Nuestros esenciales más buscados. "
          title="¡Favoritos que no puedes dejar pasar!"
          description1="Diseño simple, funcional y con estilo."
          description2="Descubre por qué todos los quieren."
          className="py-4"
        />
        <SearchedProducts />
      </section>

      <section className="snap-start snap-always h-screen w-full">
        <Information
          title="¿Quiénes somos?"
          description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle trabajamos con las mejores telas del mercado y paleta de colores que realzan el atractivo Premium de la gorra que como marca nos da la sensación de exclusividad  nos comprometemos a cumplir tus expectativas asegurando responsabilidad puntualidad en nuestras entregas y una comunicación constante durante todo el proceso."
          linkText="VER MÁS"
          link="/"
          classNameLink="text-white"
        />
      </section>

      {/* VIDEO DE REDES SOCIALES PARA WEB */}
      <section className="hidden snap-always lg:block snap-start h-screen w-full pt-20 px-6">
        <Title
          pretitle="Gorras en su mejor ángulo"
          title="Inspírate, comparte y únete"
          description1="Tu próxima gorra favorita está en estos clips"
        />
        <MediaVideos videos={videos} />
      </section>

      {/* VIDEO DE REDES SOCIALES PARA MOBIL */}
      {videos.map((video, index) => (
        <section
          key={video.id}
          className="lg:hidden snap-always justify-be snap-start h-screen w-full pt-15 pb-5 px-4 flex flex-col gap-2 justify-center items-center"
        >
          {index === 0 && (
            <Title
              pretitle="Gorras en su mejor ángulo"
              title="Inspírate, comparte y únete"
              description1="Tu próxima gorra favorita está en estos clips"
            />
          )}
          <video
            src={video.url}
            autoPlay
            loop
            muted
            className="w-full h-3/4 object-cover"
          />
          <a
            href={video.url}
            className="mt-2 bg-[#042E2D] text-white text-center text-sm font-semibold py-3 w-full hover:opacity-80 transition"
          >
            {video.title}
          </a>
        </section>
      ))}

      <section className="snap-start snap-always h-screen w-full">
        <Information
          title="¡Hablemos!"
          description2="Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro equipo está listo para atenderte."
          linkText="DEJANOS UN MENSAJE"
          link="/"
          classNameLink="text-white"
        />
      </section>

      <footer className="bg-[#F7F3F3]">
        <section className="snap-start snap-always h-screen w-full flex items-center justify-center">
          <News />
        </section>
        <section className="bg-white snap-always snap-start h-screen w-full flex items-center justify-center">
          <ConsumerInformation />
        </section>
        <section className="snap-start snap-always h-screen w-full flex items-center justify-center">
          <SocialNetworks />
        </section>
      </footer>
    </main>
  );
}
