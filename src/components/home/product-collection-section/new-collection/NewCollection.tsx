import React from "react";

const collectionHeaderItems = [
  { title: "Nueva Colección" },
  { title: "(06 / 2025)" },
  { title: "¡Disponible ya!" },
];

export default function NewCollection() {
  return (
    <div className="bg-[#F7F3F3] font-bold w-full p-10 h-full">
      <div className="flex justify-between pb-10 text-xl">
        {collectionHeaderItems.map(({ title }) => (
          <h3 key={title}>{title}</h3>
        ))}
      </div>
      <div className="flex flex-col text-center">
        <p className="font-inter text-5xl font-extrabold">
          Lo que papá realmente quiere
        </p>
        <p>
          <span className="inline-block text-xl bg-[#DCF3FF] px-2 py-1 transform -rotate-2">
            Edición limitada para papás únicos
          </span>
        </p>
        <p className="z-0">
          <span className="inline-block text-xl bg-[#FFF2D9] px-2 py-1">
            Especial día del padre
          </span>
        </p>
      </div>
    </div>
  );
}
