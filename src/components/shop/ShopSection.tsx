import React from "react";

export default function ShopSection() {
  return (
    <div className=" font-bold w-full h-full landscape:pb-15">
      <div className="flex flex-col text-center">
        <p >
          <span className="font-inter px-3 text-lg md:text-4xl bg-[rgba(232,227,222,0.40)] font-extrabold">
            Mira todo lo que tenemos para ti
          </span>
        </p>
        <p>
          <span className="inline-block text-sm text-white md:text-xl bg-secundario px-2 py-1 transform -rotate-2">
            Edición limitada para papás únicos
          </span>
        </p>
        <p className="z-0">
          <span className="inline-block text-sm md:text-xl bg-terciario px-2 py-1">
            Especial Día del Padre
          </span>
        </p>
      </div>
    </div>
  );
}
