"use client";
import Image from "next/image";
import React, { useMemo } from "react";

interface Props {
  urls: string[]; // [desktopUrl, mobileUrl]
  poster?: string; // url imagen para fallback o poster
}

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
const isImageUrl = (url: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

export const HeroVideoSection = ({ urls, poster }: Props) => {
  // Generamos URLs únicas para forzar recarga solo cuando cambien los urls
  const [desktopUrl, mobileUrl] = useMemo(() => {
    return urls.map(url => url ? `${url}?v=${Date.now()}` : url);
  }, [urls]);

  const renderMedia = (url: string | undefined, isDesktop: boolean) => {
    if (!url) return null;

    const baseClasses = `${
      isDesktop ? "hidden lg:block" : "block lg:hidden"
    } w-full h-screen object-cover`;

    if (isVideoUrl(url)) {
      return (
        <video
          src={url}
          poster={isDesktop ? poster : undefined}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          className={baseClasses}
        />
      );
    }

    if (isImageUrl(url)) {
      return (
        <div className={`relative w-full h-screen ${isDesktop ? "hidden lg:block" : "block lg:hidden"}`}>
          <Image
            src={url}
            alt={isDesktop ? "Imagen escritorio" : "Imagen móvil"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      );
    }

    return null;
  };

  const hasAnyMedia = desktopUrl || mobileUrl;

  return (
    <section className="snap-start snap-always w-full h-screen min-h-[100dvh] lg:h-screen relative">
      {hasAnyMedia ? (
        <>
          {renderMedia(desktopUrl, true)}
          {renderMedia(mobileUrl, false)}
        </>
      ) : poster ? (
        <Image
          src={poster}
          alt="Imagen de portada"
          className="w-full h-full object-cover"
          fill
          unoptimized
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-black text-white text-center animate-fadeZoomIn px-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              ¡Sin video ni imagen disponible!
            </h2>
            <p className="text-base md:text-lg font-medium">
              Estamos trabajando para traerte una experiencia visual única.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
