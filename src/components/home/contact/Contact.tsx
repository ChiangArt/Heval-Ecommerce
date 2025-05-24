import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <section>
      <div className="grid grid-cols-1 text-white vh-100 bg-[#042E2D] p-10 md:p-25 text-center">
        <h1 className="font-inter font-black text-lg md:text-5xl">
          ¡Hablemos!
        </h1>
        <div className="px-10 lg:px-50 py-4 font-bold mb-7 text-xs md:text-xl">
          <p>
            Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro
            equipo está listo para atenderte.
          </p>
        </div>
        <div>
          <Link
            className="bg-white text-turquesa text-xs md:text-xl font-bold px-5 py-4 md:px-15 lg:px-30 hover:opacity-75"
            href={"/"}
          >
            DEJANOS UN MENSAJE
          </Link>
        </div>
      </div>
    </section>
  );
}
