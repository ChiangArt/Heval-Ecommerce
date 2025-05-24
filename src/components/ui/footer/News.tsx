import Link from "next/link";
import React from "react";

export default function News() {
  return (
    <section className="p-30 bg-white text-center">
      <div className=" flex gap-30">
        <div>
          <h2 className="text-2xl font-bold">RECIBE NOVEDADES</h2>
          <p className="text-gray-700 mt-2">
            Ingresa tu correo y obtén descuentos exclusivos y acceso anticipado
            a nuestros lanzamientos.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row items-center justify-center">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Introduce tu email"
            className="px-30 py-2 w-full sm:w-auto  border border-gray-300 focus:outline-none focus:border-turquesa"
            required
          />
          <Link
            href={"/"}
            className="bg-turquesa text-white px-6 py-2  hover:opacity-75 transition"
          >
            Regístrate
          </Link>
        </form>
      </div>
    </section>
  );
}
