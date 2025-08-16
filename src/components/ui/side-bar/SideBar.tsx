"use client";
import Link from "next/link";
import clsx from "clsx";
import { useUIStore } from "@/store/ui/ui-store";
import { getCollections } from "@/core/collection/action/collection.actions";
import { IoCloseOutline } from "react-icons/io5";
import Logo from "../logo/Logo";
import { useEffect, useState } from "react";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { logError } from "@/app/utils/logger";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const [collections, setCollections] = useState<
    { name: string; href: string }[]
  >([]);
  const [showCollections, setShowCollections] = useState(false); // Estado para desplegar

  useEffect(() => {
    getCollections()
      .then((result) => {
        const formatted = result.map((col: Collection) => ({
          name: col.name,
          href: `/collections/${col.slug}`,
        }));
        setCollections(formatted);
      })
      .catch((err) => {
        logError("Error cargando colecciones:", err);
      });
  }, []);

  return (
    <div>
      {/* Fondo negro */}
      {isSideMenuOpen && (
        <div className="fixed top-0 right-0 w-screen h-screen z-35 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-36 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Menú lateral */}
      <nav
        className={clsx(
          "fixed font-bold p-5 left-0 top-0 w-[80%] pt-10 h-screen bg-primario text-secundario z-40 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute text-white top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        <div className="flex justify-center">
          <Logo />
        </div>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex justify-center mt-10 p-2 bg-white transition-all"
        >
          <span className="ml-3 text-xl">HOME</span>
        </Link>

        <Link
          href="/profile"
          onClick={closeMenu}
          className="flex justify-center mt-3 p-2 bg-white transition-all"
        >
          <span className="ml-3 text-xl">PERFIL</span>
        </Link>

        <div className="w-full h-px bg-gray-600 my-8" />

        <Link
          href="/shop"
          onClick={closeMenu}
          className="flex justify-center p-2 bg-white transition-all"
        >
          <span className="ml-3 text-xl">TIENDA</span>
        </Link>

        {/* Botón de Colecciones */}
        <div
          onClick={() => setShowCollections(!showCollections)}
          className="flex justify-center mt-3 p-2 bg-white transition-all cursor-pointer"
        >
          <span className="ml-3 text-xl">COLECCIONES</span>
        </div>

        {/* Submenú desplegable */}
        {showCollections && (
          <div className="flex flex-col items-center justify-center mt-2">
            {collections.map((col) => (
              <Link
                key={col.href}
                href={col.href}
                onClick={closeMenu}
                className="px-4 py-2 bg-gray-100 mt-1 hover:bg-gray-200 text-base w-full text-center font-normal"
              >
                {col.name}
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/about"
          onClick={closeMenu}
          className="flex justify-center mt-3 p-2 bg-white transition-all"
        >
          <span className="ml-3 text-xl">NOSOTROS</span>
        </Link>
      </nav>
    </div>
  );
};
