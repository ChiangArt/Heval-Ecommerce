import Link from "next/link";

const links = [
  { id: 1, href: "/coleccion", title: "NUEVA COLECCION" },
  { id: 2, href: "/rebajas", title: "BEST SELLER" },
];

export default function PromotionalGrid() {
  return (
    <div className="font-inter font-bold grid grid-cols-2 gap-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className="text-[13px] md:text-[22px] lg:[32px] text-white bg-primario p-4 flex items-center justify-center text-center"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
