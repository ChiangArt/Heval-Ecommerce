"use client";

import Information from "@/components/ui/information/Information";

export const AboutUsSection = () => {
  return (
    <section className="snap-start snap-always w-full bg-primario h-screen min-h-[100dvh]">
      <Information
        className="text-white"
        title="¿Quiénes somos?"
        description1="Heval, nos especializamos en la confección de gorras con un bordado de alta calidad elaborado con precisión y cuidado en cada detalle trabajamos con las mejores telas del mercado y paleta de colores que realzan el atractivo Premium de la gorra que como marca nos da la sensación de exclusividad  nos comprometemos a cumplir tus expectativas asegurando responsabilidad puntualidad en nuestras entregas y una comunicación constante durante todo el proceso."
        linkText="VER MÁS"
        link="/about"
      />
    </section>
  );
};
