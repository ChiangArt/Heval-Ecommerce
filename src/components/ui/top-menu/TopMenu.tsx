"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { useUIStore } from "@/store/ui/ui-store";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";
import { getCollections } from "@/core/collection/action/collection.actions";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { useSearchUIStore } from "@/store/ui/ui-search-store";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../logo/Logo";
import { logError } from "@/app/utils/logger";

interface TopMenuProps {
  showBackdropBlur?: boolean;
  initialMargin?: boolean;
  fixedOnScroll?: boolean;
  logoHref?: string;
  bgColorTop?: string;
  bgColorScrolled?: string;
}

export default function TopMenu({
  initialMargin = true,
  fixedOnScroll = true,
  logoHref = "/",
  bgColorTop = "bg-transparent hover:bg-white",
  bgColorScrolled = "bg-white",
}: TopMenuProps) {
  const openSearch = useSearchUIStore((state) => state.openSearch);
  const [isFixed, setIsFixed] = useState(false);
  const [collections, setCollections] = useState<
    { name: string; href: string }[]
  >([]);

  const { toggleCartSideMenu } = useCartUIStore();
  const closeMenu = useUIStore((state) => state.openSideMenu);
  const cartItemsCount = useUnifiedCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  // Manejo de submenú con delay
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  let closeTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setShopMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setShopMenuOpen(false), 200);
  };

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

  useEffect(() => {
    if (!fixedOnScroll) return;
    const handleScroll = () => setIsFixed(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixedOnScroll]);

  const containerClass = `
    w-full z-20 p-1 px-1 landscape:px-2 text-white 
    fixed top-0 translate-y-0
    ${isFixed ? bgColorScrolled : bgColorTop}
    ${initialMargin && !isFixed ? "mt-5" : ""}
  `;

  return (
    <div className={containerClass}>
      <nav className="font-inter px-4 py-3 flex justify-between items-center">
        {/* Botón menú lateral en mobile */}
        <button onClick={closeMenu} className="lg:hidden">
          <FiMenu className="text-black text-2xl" />
        </button>

        {/* Menú Desktop */}
        <div className="hidden lg:flex gap-8">
          {/* TIENDA con submenú */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="cursor-pointer font-semibold hover:opacity-90 text-black">
              TIENDA
            </span>

            {shopMenuOpen && (
              <div className="absolute top-full left-0 bg-black text-white shadow-lg rounded mt-2 z-50 min-w-[200px]">
                {/* Contenedor con hover para mostrar el submenú a la derecha */}
                <div className="relative group">
                  <div className="py-2 px-4 font-semibold group-hover:bg-gray-700 cursor-pointer">
                    COLECCIONES
                  </div>

                  {/* Submenú que aparece a la derecha al hacer hover */}
                  <div className="absolute top-0 left-full bg-black text-white border border-gray-700 shadow-lg rounded min-w-[200px] hidden group-hover:block z-50">
                    {collections.map((col) => (
                      <Link
                        key={col.href}
                        href={col.href}
                        className="block px-4 py-2 hover:bg-gray-700 whitespace-nowrap"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Todos los productos, debajo de COLECCIONES */}
                <Link
                  href="/shop"
                  className="block px-4 py-2 hover:bg-gray-700 text-white"
                >
                  TIENDA
                </Link>
              </div>
            )}
          </div>

          {/* Otros enlaces */}
          <Link href="/about" className="hover:opacity-90 font-semibold text-black">
            NOSOTROS
          </Link>
        </div>

        {/* Logo central */}
        <Link href={logoHref}>
          <Logo />
        </Link>

        {/* Acciones de usuario */}
        <div className="flex items-center gap-6">
          <button className="cursor-pointer" onClick={openSearch}>
            <IoSearchSharp className="text-2xl text-black" />
          </button>
          <Link className="hidden sm:block" href="/profile">
            <FaRegCircleUser className="text-2xl text-black" />
          </Link>

          <button
            onClick={toggleCartSideMenu}
            className="relative cursor-pointer"
          >
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff8800b9] text-[11px] text-black font-bold">
                {cartItemsCount}
              </span>
            )}
            <MdOutlineShoppingCart className="text-2xl text-black" />
          </button>
        </div>
      </nav>
    </div>
  );
}
