import Link from "next/link";
import React from "react";

export default function Information() {
  return (
    <div className="my-10">
      <div className="w-full h-full bg-[#F7F3F3] text-center">
        <h1 className="font-inter py-6 font-black text-lg md:text-5xl">
          ¿Quiénes somos?
        </h1>
        <div className="px-10 font-bold mb-7 text-sm sm:px-50 lg:px-100 md:text-xl">
          <p>
            Heval, nos especializamos en la confección de gorras con un bordado
            de alta calidad elaborado con precisión y cuidado en cada detalle
            trabajamos con las mejores telas del mercado y paleta de colores que
            realzan el atractivo Premium de la gorra que como marca nos da la
            sensación de exclusividad nos comprometemos a cumplir tus
            expectativas asegurando responsabilidad puntualidad en nuestras
            entregas y una comunicación constante durante todo el proceso.
          </p>
        </div>
        <div className="flex justify-center pb-6">
          <Link
            className="bg-turquesa py-3 px-20 text-white hover:opacity-75"
            href={"/"}
          >
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  );
}
