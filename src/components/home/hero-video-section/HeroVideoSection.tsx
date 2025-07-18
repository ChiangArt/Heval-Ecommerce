"use client";
import React from "react";

interface Props {
  urls: string[]; // [desktop, mobile]
  poster?: string;
}

export const HeroVideoSection = ({ urls, poster }: Props) => {
  const [videoDesktopUrl, videoMobileUrl] = urls;
  const hasVideo = !!videoDesktopUrl && !!videoMobileUrl;

  return (
    <section className="snap-start snap-always w-full h-screen min-h-[100dvh] lg:h-screen relative">
      {hasVideo ? (
        <>
          {/* VIDEO DESKTOP */}
          <video
            src={videoDesktopUrl}
            poster={poster}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className="hidden lg:block h-full w-full object-cover"
          />

          {/* VIDEO MÓVIL */}
          <video
            src={videoMobileUrl}
            autoPlay
            loop
            muted
            playsInline
            className="block lg:hidden h-full w-full object-cover"
          />
        </>
      ) : (
        // Fallback sin poster
        <div className="h-full w-full flex items-center justify-center bg-black text-white text-center animate-fadeZoomIn px-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              ¡Sin video disponible!
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
