import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const iconsLinks = [
  { id: 1, href: "/search", icons: FaFacebook },
  { id: 2, href: "/user", icons: FaInstagram },
  { id: 3, href: "/user", icons: AiFillTikTok },
];

export default function SocialNetworks() {
  return (
    <div className="sm:bg-white sm:p-40 grid grid-cols-1 gap-5 text-center">
      <p>Encuentranos en nuestras redes</p>
      <div className="flex justify-center  gap-2">
        {iconsLinks.map(({ href, id, icons: Icon }) => (
          <Link key={id} href={href}>
            <Icon size={30} />
          </Link>
        ))}
      </div>
    </div>
  );
}
