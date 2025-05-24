import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <section>
      <div className="w-full text-white vh-100 bg-[#042E2D] p-20 text-center">
        <h1 className="font-inter font-black text-5xl">¡Hablemos!</h1>
        <div className="px-80 py-4 font-bold mb-7 text-xl">
          <p>
            Nos encantaría saber de ti. Cuéntanos cómo podemos ayudarte. Nuestro
            equipo está listo para atenderte.
          </p>
        </div>
        <Link
          className="bg-white text-turquesa font-bold p-4 px-30 hover:opacity-75"
          href={"/"}
        >
            DEJANOS UN MENSAJE
        </Link>
      </div>
    </section>
  );
}
