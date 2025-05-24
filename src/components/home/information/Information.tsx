import Link from "next/link";
import React from "react";

export default function Information() {
  return (
    <div className="py-4">
      <div className="w-full vh-100 bg-[#F7F3F3] p-20 text-center">
        <h1 className="font-inter font-black text-5xl">¿Quiénes somos?</h1>
        <div className="px-80 py-4 font-bold mb-7 text-xl">
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
        <Link className="bg-turquesa p-4 px-30  text-[white]" href={"/"}>
          VER MÁS
        </Link>
      </div>
    </div>
  );
}
