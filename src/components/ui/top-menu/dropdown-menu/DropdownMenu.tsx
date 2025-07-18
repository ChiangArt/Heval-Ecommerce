import Link from "next/link";
import { useState } from "react";

export default function DropdownMenu({
  label,
  collections,
}: {
  label: string;
  collections: { name: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const hasCollections = collections.length > 0;
  const showDropdown = isOpen && hasCollections;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Botón */}
      <span className="cursor-pointer px-2 py-1 text-white">{label}</span>

      {/* Solo renderizar dropdown si hay colecciones */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 bg-primario/80 backdrop-blur-sm text-white shadow-lg rounded-md min-w-[180px] z-50
          transition-all duration-300 ease-in-out opacity-100 translate-y-0 pointer-events-auto"
        >
          <ul className="p-2 space-y-1">
            {collections.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-white/30"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
