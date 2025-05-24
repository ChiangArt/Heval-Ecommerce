"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  "/20f6810715e48062c065ecc8e9429ccbe3bfe544.jpg",
  "/banner1 (2).jpg",
  "/banner2 (2).jpg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden h-64 md:h-150">
      <Link href={""}>
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        <h2 className="absolute z-0 text-center right-0 left-0 bottom-4 bg-turquesa opacity-80 text-[white] p-4">
          COMPRAR AHORA
        </h2>
      </Link>
    </div>
  );
}
