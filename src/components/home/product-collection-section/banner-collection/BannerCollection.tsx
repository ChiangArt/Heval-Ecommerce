import React from "react";

export default function BannerCollection() {
  return (
    <div className=" font-bold w-full pt-20 pb-5 h-full">
      <div className="flex flex-col text-center gap-2">
        <p>
          <span className="inline-block text-xl bg-[#DCF3FF] px-2 py-1 transform rotate-2">
            Nuestros esenciales mas buscados.
          </span>
        </p>

        <p>
          <span className="font-inter font-extrabold text-5xl inline-block bg-[#F7F3F3] px-2 py-1">
            ¡Favoritos que no puedes dejar pasar!
          </span>
        </p>
        <p>
          <span className="inline-block text-xl bg-[#FFF2D9] px-20 py-1">
            Diseño simple funcional y con estilo.
          </span>
        </p>
        <p className="">
          <span className="text-[white] inline-block text-xl bg-[#042E2D] px-2 py-1 transform -rotate-2">
            Descubre por que todos lo quieren.
          </span>
        </p>
      </div>
    </div>
  );
}
