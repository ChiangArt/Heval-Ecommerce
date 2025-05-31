import Image from "next/image";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: 1,
    title: "Gorra Denim",
    price: "s/ 50.00",
    discount: "15%",
    image: "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
  },
  {
    id: 2,
    title: "Gorra Denim",
    price: "s/ 50.00",
    discount: "15%",
    image: "/482021385_122110669598786935_6815489652951560821_n.jpg",
  },
];

export default function SearchedProducts() {
  return (
    <div className="w-full h-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative w-full h-[35%] sm:h-[65%] overflow-hidden group"
        >
          <Image
            src={product.image}
            alt="producto"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Image
            src={product.image}
            alt="producto"
            fill
            className="object-cover lg:scale-200 transition-opacity duration-600 opacity-0 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-2 right-2 select-none">
            <span className="bg-[#DCF3FF] text-turquesa p-1 text-sm">-{product.discount}</span>
          </div>
          <Link
            href={"/"}
            className="absolute bottom-0 left-0 right-0 text-center text-[white] bg-secundario py-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            AGREGAR AL CARRITO
          </Link>
        </div>
      ))}
    </div>
  );
}
