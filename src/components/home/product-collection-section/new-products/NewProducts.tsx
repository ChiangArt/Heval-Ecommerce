import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbArrowRightDashed } from "react-icons/tb";

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
  {
    id: 3,
    title: "Gorra Denim",
    price: "s/ 50.00",
    discount: "15%",
    image: "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
  },
  {
    id: 4,
    title: "Gorra Denim",
    price: "s/ 50.00",
    discount: "15%",
    image: "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
  },
];

export default function NewProducts() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <div className="relative w-full aspect-[6/7] overflow-hidden group">
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
              className="object-cover scale-200 transition-opacity duration-600 opacity-0 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute right-0 p-5 select-none">
              <span className="bg-tahiti p-2">-{product.discount}</span>
            </div>
            <Link
              href={"/"}
              className="absolute bottom-0 left-0 right-0 text-center text-[white] bg-turquesa py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              AGREGAR AL CARRITO
            </Link>
          </div>
          <div className="mt-2 font-normal">
            <p>{product.title}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-gray-700">{product.price}</p>

              <Link
                href={"/"}
                className="bg-[#FFF2D9] hover:bg-[orange] p-4 rounded-full transition duration-300"
              >
                <TbArrowRightDashed size={30} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
