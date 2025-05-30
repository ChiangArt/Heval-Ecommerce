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
    <main className="snap-y snap-mandatory h-screen w-full overflow-y-auto scrollbar-hidden">
      {/* VIDEO BANNER */}
      <section className="snap-start h-screen snap-always  w-full">
        <SlidesShow
          images={[
            "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
            "/482021385_122110669598786935_6815489652951560821_n.jpg",
            "/banner1 (2).jpg",
            "/banner2 (2).jpg",
          ]}
        />
      </section>

      <section className="snap-start snap-always h-screen w-screen pt-20 flex flex-col p-2 lg:px-6">
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

      <section className="snap-start snap-always pt-20 h-screen w-screen p-2 lg:px-6 ">
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

      <section className="snap-start snap-always h-screen w-screen">
        <Information
          title="¿Quiénes somos?"
          description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle trabajamos con las mejores telas del mercado y paleta de colores que realzan el atractivo Premium de la gorra que como marca nos da la sensación de exclusividad  nos comprometemos a cumplir tus expectativas asegurando responsabilidad puntualidad en nuestras entregas y una comunicación constante durante todo el proceso."
          linkText="VER MÁS"
          link="/"
          classNameLink="text-white"
        />
      </section>

      {/* VIDEO DE REDES SOCIALES PARA WEB */}
      <section className="hidden snap-always lg:block snap-start h-screen w-screen pt-20 px-6">
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
          className="lg:hidden snap-always justify-be snap-start h-screen w-screen pt-15 pb-5 px-4 flex flex-col gap-2 justify-center items-center"
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

      <section className="snap-start snap-always h-screen w-screen">
        <Information
          title="¡Hablemos!"
          description2="Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro equipo está listo para atenderte."
          linkText="DEJANOS UN MENSAJE"
          link="/"
          classNameLink="text-white"
        />
      </section>

      <footer className="bg-[#F7F3F3]">
        <section className="snap-start h-screen w-screen flex items-center justify-center">
          <News />
        </section>
        <section className="bg-white snap-start h-screen w-screen flex items-center justify-center">
          <ConsumerInformation />
        </section>
        <section className="snap-start h-screen w-screen flex items-center justify-center">
          <SocialNetworks />
        </section>
      </footer>

      <div className="z-1 fixed bottom-5 right-5">
        <a
          href="https://wa.me/51926982348?text=Hola,%20quiero%20más%20información"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50.1139 0H49.8861C22.3348 0 0 22.3348 0 49.8861V50.1139C0 77.6652 22.3348 100 49.8861 100H50.1139C77.6652 100 100 77.6652 100 50.1139V49.8861C100 22.3348 77.6652 0 50.1139 0Z"
              fill="#042E2D"
            />
            <path
              d="M58.1887 62.945C47.1128 62.945 38.1017 53.9282 38.0986 42.8491C38.1017 40.0406 40.3878 37.7568 43.1894 37.7568C43.4774 37.7568 43.7624 37.7811 44.0353 37.8296C44.6356 37.9297 45.2057 38.1329 45.7302 38.4392C45.806 38.4847 45.8575 38.5575 45.8696 38.6425L47.04 46.0215C47.0552 46.1064 47.0279 46.1944 46.9703 46.258C46.3244 46.9738 45.4997 47.4894 44.581 47.7472L44.1384 47.8715L44.3051 48.2992C45.8151 52.1449 48.8895 55.2172 52.7371 56.7336L53.1647 56.9035L53.2889 56.4607C53.5467 55.5417 54.0621 54.7168 54.7777 54.0708C54.8292 54.0222 54.8989 53.998 54.9687 53.998C54.9838 53.998 54.999 53.998 55.0172 54.001L62.394 55.1717C62.482 55.1869 62.5548 55.2354 62.6002 55.3112C62.9034 55.8359 63.1066 56.4091 63.2097 57.0096C63.2582 57.2765 63.2794 57.5586 63.2794 57.8528C63.2794 60.6582 60.9963 62.942 58.1887 62.945Z"
              fill="white"
            />
            <path
              d="M77.8304 47.8531C77.2331 41.1018 74.1404 34.8389 69.1225 30.2198C64.0742 25.5734 57.525 23.0137 50.6758 23.0137C35.6431 23.0137 23.412 35.2484 23.412 50.2854C23.412 55.3322 24.8037 60.2485 27.4385 64.5309L21.5625 77.542L40.3761 75.5373C43.6476 76.8778 47.1101 77.5572 50.6727 77.5572C51.6096 77.5572 52.5708 77.5087 53.535 77.4086C54.3839 77.3176 55.242 77.1842 56.0849 77.0143C68.6737 74.4697 77.8637 63.2935 77.9365 50.431V50.2854C77.9365 49.4666 77.9001 48.6477 77.8273 47.8561L77.8304 47.8531ZM41.1007 69.8264L30.6919 70.9364L33.7997 64.0487L33.1781 63.2147C33.1326 63.154 33.0872 63.0933 33.0356 63.0236C30.3371 59.2962 28.9121 54.8924 28.9121 50.2885C28.9121 38.2843 38.6751 28.5184 50.6758 28.5184C61.9184 28.5184 71.448 37.2925 72.3667 48.493C72.4152 49.0935 72.4425 49.6971 72.4425 50.2915C72.4425 50.4613 72.4395 50.6282 72.4364 50.8071C72.206 60.849 65.193 69.3775 55.3814 71.5491C54.6325 71.7159 53.8654 71.8432 53.1014 71.9251C52.307 72.0161 51.4914 72.0616 50.6818 72.0616C47.7984 72.0616 44.9968 71.5035 42.3499 70.3996C42.0558 70.2813 41.7677 70.1539 41.4979 70.0235L41.1038 69.8324L41.1007 69.8264Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </main>
  );
}
