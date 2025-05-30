import ImageGallery from "@/components/ui/image-gallery/ImageGallery";
import Information from "@/components/ui/information/Information";
import { Title } from "@/components/ui/title/Title";
import React from "react";

export default function page() {
  return (
    <>
      <Title
        backgroundColor="bg-white"
        title="Nuestra esencia, nuestra historia"
        description1="Gorros con diseño único y colecciones de temporada"
        description2="Comodidad que no pasa desapercibida"
      />
      <Information description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle trabajamos con las mejores telas del mercado y paleta de colores que realzan el atractivo Premium de la gorra que como marca nos da la sensación de exclusividad nos comprometemos a cumplir tus expectativas asegurando responsabilidad puntualidad en nuestras entregas y una comunicación constante durante todo el proceso." />
      <ImageGallery imagenes={[{ src: "/banner2 (2).jpg", alt: "Tercera" }]} />
      <Information description1="Heval, una marca que simboliza la conexión y crecimiento de tres personas que  refleja unión y compañerismo en su deseo de escalar juntos la montaña de sus objetivos." />
      <ImageGallery imagenes={[{ src: "/banner2 (2).jpg", alt: "Tercera" }]} />
      <Information
        title="Cada uno aporta talentos únicos: "
        description1="Uno es soñador y visionario, otro es metódico y detallista, y el tercero es un creativo apasionado. Que juntos, crean un equilibrio perfecto entre creatividad y acción. 
        Como identidad de Nuestra marca es la montaña que solo no es solo un símbolo, sino un recordatorio de los retos y logros que enfrenta cada persona en su camino."
        description2="Donde la naturaleza y el confort se fusionan en perfecta armonía, que como marca resaltamos la autenticidad y calidez de la vida en las montañas desconectándonos del bullicio y reconectar con la esencia de la tierra y la energía revitalizante que nos inspiran a vivir nuevas experiencias"
      />
      <ImageGallery
        imagenes={[
          { src: "/images.jpg", alt: "Primera" },
          { src: "/banner1 (2).jpg", alt: "Segunda" },
          { src: "/banner2 (2).jpg", alt: "Tercera" },
        ]}
      />
      <Information
        title="Heval no es solo una marca; es un espacio donde la creatividad y el deseo de superación se entrelazan en cada proyecto y el producto es un testimonio del poder de los vínculos humanos y de la magia que surge cuando nuestra acción se une para construir y crecer."
        description1="Con Heval, invitan a otros a abrazar sus propias montañas y a recordar que, con esfuerzo y conexión, cualquier cima es alcanzable."
        link="/collections"
        linkText="DESCUBRE NUESTRAS COLECCIONES"
      />
    </>
  );
}
