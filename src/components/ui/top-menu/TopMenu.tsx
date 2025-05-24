'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const links = [
  { id: 1, href: "/Tienda", nombre: "TIENDA" },
  { id: 2, href: "/Colecciones", nombre: "COLECCIONES" },
  { id: 3, href: "/Nosotros", nombre: "NOSOTROS" },
];

export default function TopMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="font-inter max-w mx-auto px-4 py-3 flex justify-between items-center relative">
      
      {/* Botón hamburguesa */}
      <div className="md:hidden">
        <button onClick={() => setOpenMenu(!openMenu)}>
          <FiMenu className="text-white text-2xl" />
        </button>
      </div>

      {/* Enlaces principales (ocultos en móviles) */}
      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="relative inline-block text-white before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[0.5px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
          >
            {link.nombre}
          </Link>
        ))}
      </div>

      {/* Logo al centro */}
      <div>
        <Link href={"/"}>
          <Image src={"/heval.png"} alt={"Heval"} width={100} height={100} />
        </Link>
      </div>

      {/* Íconos a la derecha */}
      <div className="flex gap-4 items-center">
        {/* Icono de búsqueda - siempre visible */}
        <Link href="/search">
          <FaSearch className="text-white text-xl" />
        </Link>

        {/* Icono de usuario - solo en pantallas grandes */}
        <Link href="/user" className="hidden md:block">
          <FaUser className="text-white text-xl" />
        </Link>

        {/* Carrito */}
        <Link href="/shop">
          <div className="relative">
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff8800b9] text-[11px] text-white font-bold">
              1
            </span>
            <FaShoppingCart className="text-white text-xl" />
          </div>
        </Link>
      </div>

      {/* Menú desplegable para móviles */}
      {openMenu && (
        <div className="absolute top-full left-0 w-full bg-black text-white p-4 flex flex-col gap-4 md:hidden z-50">
          {links.map((link) => (
            <Link key={link.id} href={link.href}>
              {link.nombre}
            </Link>
          ))}
          <Link href="/user" className="flex items-center gap-2">
            <FaUser />
            Mi cuenta
          </Link>
        </div>
      )}
    </nav>
  );
}
