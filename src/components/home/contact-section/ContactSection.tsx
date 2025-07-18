"use client";

import Information from "@/components/ui/information/Information";

export const ContactSection = () => {
  return (
    <section className="snap-start snap-always w-full bg-secundario h-screen min-h-[100dvh] lg:h-screen">
      <Information
        className="text-white"
        title="¡Hablemos!"
        description2="Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro equipo está listo para atenderte."
        linkText="DEJANOS UN MENSAJE"
        link="/"
        classNameLink="text-secundario bg-white"
      />
    </section>
  );
};
