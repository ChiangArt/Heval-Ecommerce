import Link from "next/link";
import React from "react";

const links = [
  { id: 1, href: "/coleccion", title: "NUEVAS COLECCIONES" },
  { id: 2, href: "/rebajas", title: "REBAJAS EXCLUSIVAS" },
];

export default function PromotionalGrid() {
  return (
    <div className="font-inter mt-7 font-bold grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className="text-2xl bg-[#FFF2D9] p-6 shadow-lg flex items-center justify-center text-center"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
