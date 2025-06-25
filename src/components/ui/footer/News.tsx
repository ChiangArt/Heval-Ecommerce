import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export default function News({className}: Props) {
  return (
    <div className={` text-center gap-5 w-full flex flex-col  bg-white  ${className}`}>
      <div>
        <h2 className="text-lg sm:text-2xl text-secundario  font-bold">RECIBE NOVEDADES</h2>
        <p className="font-bold text-xs md:text-md mt-2">
          Ingresa tu correo y obtén descuentos exclusivos y acceso anticipado a
          nuestros lanzamientos.
        </p>
      </div>

      <form className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-center">
        <label htmlFor="email" className="sr-only">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="Introduce tu email"
          className="xl:px-30 py-2 border border-gray-300 focus:outline-none focus:border-turquesa"
          required
        />
        <Link
          href={"/"}
          className="bg-secundario text-xs md:text-sm text-white py-3 px-4 md:px-6   hover:opacity-75 transition"
        >
          Regístrate
        </Link>
      </form>
    </div>
  );
}
