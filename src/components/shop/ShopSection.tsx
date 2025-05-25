import React from "react";

export default function ShopSection() {
  return (
    <div className=" font-bold w-full p-10 h-full">
      <div className="flex flex-col text-center">
        <p className="font-inter text-lg md:text-5xl font-extrabold">
          Mira todo lo que tenemos para ti
        </p>
        <p>
          <span className="inline-block text-sm md:text-xl bg-[#DCF3FF] px-2 py-1 transform -rotate-2">
            Edición limitada para papás únicos
          </span>
        </p>
        <p className="z-0">
          <span className="inline-block text-sm md:text-xl bg-[#FFF2D9] px-2 py-1">
            Especial Día del Padre
          </span>
        </p>
      </div>
    </div>
  );
}
