import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const iconsLinks = [
  { id: 1, href: "https://www.facebook.com/profile.php?id=61573608077614", icons: FaFacebook },
  { id: 2, href: "https://www.instagram.com/heval_oficial/?fbclid=IwY2xjawMEinZleHRuA2FlbQIxMABicmlkETFOVkROT2ZxcmFMR2oxc2VzAR4UrdsqWDRu7QdRkhghLHINDKpjwhbynx3q3Cdp6nIRF-13civEZ2xZmKTT2g_aem_fvK91STrlbj3y1dwzyMDCg#", icons: FaInstagram },
  { id: 3, href: "https://www.tiktok.com/@heval_oficial?_t=ZM-8uaGxHQ3cxj&_r=1", icons: AiFillTikTok },
];

export default function SocialNetworks() {
  return (
    <div className="bg-white text-xs w-full landscape:p-10 sm:text-sm py-5 sm:p-10 lg:p-40 grid grid-cols-1 gap-5 text-center">
      <p>Encuentranos en nuestras redes</p>
      <div className="flex justify-center  gap-2">
        {iconsLinks.map(({ href, id, icons: Icon }) => (
          <Link key={id} href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={30} />
          </Link>
        ))}
      </div>
    </div>
  );
}
