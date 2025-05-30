"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { useUIStore } from "@/store/ui/ui-store";
import { IoSearchSharp } from "react-icons/io5";
import { useCartUIStore } from "@/store/ui/ui-cart-store";

const links = [
  { id: 1, href: "/shop", nombre: "TIENDA" },
  { id: 2, href: "/collections", nombre: "COLECCIONES" },
  { id: 3, href: "/about", nombre: "NOSOTROS" },
];

export default function TopMenu() {
  const [isFixed, setIsFixed] = useState(false);
  const closeMenu = useUIStore((state) => state.openSideMenu);
  const toggleCartSideMenu = useCartUIStore((state) => state.toggleCartSideMenu);
  

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full  fixed text-[white] bg-primario/70  z-20 md:transition-all md:duration-500 md:ease-in-out ${
        isFixed
          ? "fixed top-0 backdrop-blur-lg  translate-y-0 md:py-6 md:h-[7.5vh]  p-2 landscape:py-2 landscape:h-[10vh] lg:py-6"
          : "fixed backdrop-blur-xs p-1  md:h-[4.5vh] md:py-0  bg-primario/80 translate-y-0 lg:p-2 landscape:h-[7vh] landscape:p-0"
      }`}
      
    >
      <nav className="font-inter max-w mx-auto px-4 py-3 flex justify-between items-center ">
        <button onClick={closeMenu} className="lg:hidden cursor-pointer">
          <FiMenu className="text-white text-2xl" />
        </button>

        <div className="hidden lg:flex gap-8 ">
          {links.map((link) => (
            <Link
              className="relative inline-block text-[white] before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[0.5px] before:bg-[white] before:transition-all before:duration-300 hover:before:w-full"
              key={link.id}
              href={link.href}
            >
              {link.nombre}
            </Link>
          ))}
        </div>

        <div>
          <Link href={"/"}>
            <Image src={"/heval.png"} alt={"Heval"} width={100} height={100} />
          </Link>
        </div>

        <div className="flex  items-center gap-6">
          <Link href={"/"}>
            <IoSearchSharp className="text-2xl" />
          </Link>
          <Link className="hidden sm:block" href={"/"}>
            <FaRegCircleUser className="text-2xl" />
          </Link>

          <button onClick={toggleCartSideMenu} className="relative">
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff8800b9] text-[11px] text-white font-bold">
              1
            </span>
            

            <MdOutlineShoppingCart className="text-2xl cursor-pointer" />
           
          </button>
        </div>
      </nav>
    </div>
  );
}
