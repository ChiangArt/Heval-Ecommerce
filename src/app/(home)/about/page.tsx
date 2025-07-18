import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import WholesaleContact from "@/components/ui/footer/WholesaleContact";
import Information from "@/components/ui/information/Information";
import { Title } from "@/components/ui/title/Title";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <main className="snap-y snap-mandatory h-screen w-full">
      <section className="snap-start snap-always w-full h-screen flex flex-col items-center justify-center text-center">
        <Title
          backgroundColor="bg-white"
          title="Nuestra esencia, nuestra historia"
          description1="Gorros con diseño único y colecciones de temporada"
          description2="Comodidad que no pasa desapercibida"
        />
        <div className="landscape:px-40 text-primario mt-10">
          <Information
            className="text-base"
            description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle. Trabajamos con las mejores telas del mercado y una paleta de colores que realzan el atractivo premium de la gorra. Como marca, nos da la sensación de exclusividad. Nos comprometemos a cumplir tus expectativas, asegurando responsabilidad, puntualidad en nuestras entregas y una comunicación constante durante todo el proceso."
          />
        </div>
      </section>

      <section className="snap-start flex flex-col h-screen snap-always w-full">
        <div className="relative w-full h-full">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-primario text-white pb-2 px-2">
          <Information description1="Heval, una marca que simboliza la conexión y crecimiento de tres personas que  refleja unión y compañerismo en su deseo de escalar juntos la montaña de sus objetivos." />
        </div>
      </section>

      {/* SECCION 2 MOBILE */}
      <section className="snap-start md:hidden h-screen flex flex-col snap-always w-full">
        <div className="relative w-full h-[100vh]">
          <Image
            src="/Nosotros.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="bg-beige text-primario p-2">
          <Information
            title="Cada uno aporta talentos únicos: "
            description1="Uno es soñador y visionario, otro es metódico y detallista, y el tercero es un creativo apasionado. Que juntos, crean un equilibrio perfecto entre creatividad y acción. 
            Como identidad de Nuestra marca es la montaña que solo no es solo un símbolo, sino un recordatorio de los retos y logros que enfrenta cada persona en su camino."
            description2="Donde la naturaleza y el confort se fusionan en perfecta armonía, que como marca resaltamos la autenticidad y calidez de la vida en las montañas desconectándonos del bullicio y reconectar con la esencia de la tierra y la energía revitalizante que nos inspiran a vivir nuevas experiencias"
          />
        </div>
      </section>

      {/* SECCION 2 WEB */}
      <section className="snap-start hidden h-screen md:flex md:flex-col snap-always w-full">
        <div className="relative w-full h-[100vh]">
          <Image
            src="/Nosotros.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>
      <section className="snap-start text-primario hidden bg-beige h-screen md:flex md:flex-col justify-center items-center snap-always w-full">
        <Information
          title="Cada uno aporta talentos únicos: "
          description1="Uno es soñador y visionario, otro es metódico y detallista, y el tercero es un creativo apasionado. Que juntos, crean un equilibrio perfecto entre creatividad y acción. 
            Como identidad de Nuestra marca es la montaña que solo no es solo un símbolo, sino un recordatorio de los retos y logros que enfrenta cada persona en su camino."
          description2="Donde la naturaleza y el confort se fusionan en perfecta armonía, que como marca resaltamos la autenticidad y calidez de la vida en las montañas desconectándonos del bullicio y reconectar con la esencia de la tierra y la energía revitalizante que nos inspiran a vivir nuevas experiencias"
        />
      </section>
      {/* ----------------------------------------------------------------------------------------------- */}

      {/* SECCION 3 MOBILE */}

      <section className="snap-start h-screen md:hidden snap-always w-full">
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>
      <section className="snap-start h-screen md:hidden snap-always w-full">
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>
      <section className="snap-start h-screen md:hidden snap-always w-full">
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* SECCION 3 WEB */}
      <section className="snap-start hidden h-screen md:grid grid-cols-3 gap-2 snap-always w-full">
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative w-full h-[100vh] ">
          <Image
            src="/Nosotros 2.webp"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------------------------------------- */}

      <section className="snap-start flex justify-center items-center h-screen  snap-always w-full">
        <Information
          title="HEVAL NO ES SOLO UNA MARCA; ES UN ESPACIO DONDE LA CREATIVIDAD Y EL DESEO DE SUPERACIÓN SE ENTRELAZAN EN CADA PROYECTO Y EL PRODUCTO ES UN TESTIMONIO DEL PODER DE LOS VÍNCULOS HUMANOS Y DE LA MAGIA QUE SURGE CUANDO NUESTRA ACCIÓN SE UNE PARA CONSTRUIR Y CRECER."
          description1="Con Heval, invitan a otros a abrazar sus propias montañas y a recordar que, con esfuerzo y conexión, cualquier cima es alcanzable."
        />
      </section>
      <footer className="bg-[#F7F3F3]">
        <section className="snap-start snap-always landscape:px-20 h-screen w-full flex items-center justify-center">
          <WholesaleContact className="py-5 sm:p-15" />
        </section>
        <section className="snap-always pt-8 flex landscape:px-20 flex-col gap-3 snap-start h-screen w-full items-center justify-center">
          <ConsumerInformation />
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
            className="w-[60px] h-[60px]"
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
