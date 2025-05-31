"use client";

import Link from "next/link";
import clsx from "clsx";
import { useUIStore } from "@/store/ui/ui-store";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 right-0 w-screen h-screen z-10 bg-black opacity-30" />
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
          "fixed font-bold p-5 left-0 top-0 w-[90%] pt-10 h-screen bg-secundario text-secundario z-25 shadow-2xl transform transition-all duration-300",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute text-white top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="flex justify-center mt-10 p-2  transition-all">
          <Image src={"/heval.png"} alt={"Heval"} width={120} height={120} />
        </div>
        <Link
          href="/"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2  transition-all bg-white "
        >
          <span className="ml-3 text-xl">HOME</span>
        </Link>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2  transition-all bg-white "
        >
          <span className="ml-3 text-xl">PERFIL</span>
        </Link>
        <div className="w-full h-px bg-gray-200 my-10" />
        <Link
          href="/shop"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2  transition-all bg-white "
        >
          <span className="ml-3 text-xl">TIENDA</span>
        </Link>

        <Link
          href="/collections"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2  transition-all bg-white "
        >
          <span className="ml-3 text-xl">COLECCIONES</span>
        </Link>

        {/* Separador */}

        <Link
          href="/about"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2  transition-all bg-white "
        >
          <span className="ml-3 text-xl">NOSOTROS</span>
        </Link>
      </nav>
    </div>
  );
};
