import React from "react";
import { FaSliders } from "react-icons/fa6";

export default function Filter() {
  return (
    <div className="grid grid-cols-2 gap-2 px-2 text-[11px] text-center justify-center items-center">
      <button className="flex gap-2 justify-center items-center text-white bg-turquesa p-5">
        <FaSliders />
        Filtrar:
      </button>
      <div className="p-5 bg-[#FFF2D9]">
        <p>20 resultados</p>
      </div>
      
    </div>
  );
}
