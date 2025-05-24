import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const links = [
  { id: 1, href: "/Tienda", nombre: "TIENDA" },
  { id: 2, href: "/Colecciones", nombre: "COLECCIONES" },
  { id: 3, href: "/Nosotros", nombre: "NOSOTROS" },
];

const iconsLinks = [
  { id: 1, href: "/search", icons: FaSearch },
  { id: 2, href: "/user", icons: FaUser },
];

export default function TopMenu() {
  return (
    <nav className="font-inter max-w mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex gap-8">
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
      <div className="flex gap-6">
        {iconsLinks.map(({ id, href, icons: Icon }) => (
          <Link key={id} href={href}>
            <Icon />
          </Link>
        ))}
        <Link href="/shop">
          <div className="relative">
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff8800b9] text-[11px] text-white font-bold">
              1
            </span>
            <FaShoppingCart className="text-xl"/>
          </div>
        </Link>
      </div>
    </nav>
  );
}
