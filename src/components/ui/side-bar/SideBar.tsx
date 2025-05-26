"use client";

import Link from "next/link";
import clsx from "clsx";
import { useUIStore } from "@/store/ui/ui-store";
import { IoCloseOutline } from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[90%] pt-10 h-screen bg-turquesa text-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 left-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        {/* Separador */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/shop"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Tienda</span>
        </Link>

        <Link
          href="/collections"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Colecciones</span>
        </Link>

        <Link
          href="/about"
          onClick={closeMenu}
          className="flex items-center mt-10 p-2 rounded transition-all"
        >
          <span className="ml-3 text-xl">Nosotros</span>
        </Link>
      </nav>
    </div>
  );
};
