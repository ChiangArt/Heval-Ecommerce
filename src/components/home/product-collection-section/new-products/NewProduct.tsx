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
  // {
  //   id: 2,
  //   title: "Gorra Clásica",
  //   price: "s/ 45.00",
  //   discount: "10%",
  //   image: "/482021385_122110669598786935_6815489652951560821_n.jpg",
  // },
  // {
  //   id: 3,
  //   title: "Gorra Premium",
  //   price: "s/ 60.00",
  //   discount: "20%",
  //   image: "/banner1 (2).jpg",
  // },
  // {
  //   id: 4,
  //   title: "Gorra Deportiva",
  //   price: "s/ 55.00",
  //   discount: "25%",
  //   image: "/banner2 (2).jpg",
  // },
];

export default function NewProducts() {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-full max-w-7xl px-4">
        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-4  w-full gap-2 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-xs group transition-all duration-300 "
            >
              {/* Contenedor de imagen */}
              <div className="relative aspect-[7/6] sm:aspect-[5/5] overflow-hidden shadow-md">
                {/* Imagen principal */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:opacity-0"
                />

                {/* Imagen hover (zoom) */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover scale-125 hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Badge de descuento */}
                <div className="absolute top-3 right-3 bg-[#DCF3FF] text-turquesa text-xs font-bold px-2 py-1 ">
                  -{product.discount}
                </div>

                {/* Botón de compra */}
                <Link
                  href={`/product/${product.id}`}
                  className="absolute bottom-0 left-0 right-0 bg-turquesa text-white text-center py-3 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium"
                >
                  AGREGAR AL CARRITO
                </Link>
              </div>

              {/* Info del producto */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-2 px-2">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition-colors duration-300"
                    aria-label="Ver producto"
                  >
                    <TbArrowRightDashed size={24} className="text-gray-700" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
