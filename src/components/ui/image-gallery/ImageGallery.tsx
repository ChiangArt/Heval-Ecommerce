import Image from "next/image";
import React from "react";

interface Imagen {
  src: string;
  alt?: string;
}

interface ImagenesProps {
  imagenes: Imagen[];
}

export default function ImageGallery({ imagenes }: ImagenesProps) {
  // Ancho responsive basado en cantidad de imágenes
  const getWidth = () => {
    if (imagenes.length === 1) return "md:w-full";
    if (imagenes.length === 2) return "md:w-1/2";
    return "md:w-1/3"; // para 3 o más
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {imagenes.map((img, index) => (
        <div
          key={index}
          className={`relative w-full ${getWidth()} h-[250px] md:h-[400px] rounded overflow-hidden`}
        >
          <Image
            src={img.src}
            alt={img.alt || `Imagen ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
