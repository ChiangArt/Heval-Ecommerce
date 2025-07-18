"use client";
import { MutableRefObject } from "react";
import Link from "next/link";

interface Props {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  videoUrl: string;
  showTitle?: boolean;
  pretitle?: string;
  title?: string;
  description1?: string;
  linkText: string;
  linkHref: string;
}

export const MobileVideoSection = ({
  videoRef,
  videoUrl,
  pretitle,
  title,
  description1,
  linkText,
  linkHref,
}: Props) => {
  return (
    <section className="md:hidden  pt-15 pb-3 px-4 snap-always snap-start w-full flex flex-col gap-2 h-screen min-h-[100dvh] lg:h-screen">
      {/* Título opcional */}
      <div className="pt-[10px] font-bold px-4 shrink-0">
        <div className="flex flex-col text-center gap-1">
          {pretitle && (
            <p>
              <span className="inline-block text-xs md:text-lg bg-terciario px-2 py-1">
                {pretitle}
              </span>
            </p>
          )}

          {title && (
            <p>
              <span className="font-inter text-md lg:text-4xl font-extrabold inline px-2 bg-[rgba(232,227,222,0.40)]">
                {title}
              </span>
            </p>
          )}

          {description1 && (
            <p>
              <span className="text-white inline-block text-xs lg:text-lg bg-secundario px-2 py-1">
                {description1}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Video */}
      <div className="flex-1 flex overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botón */}
      <div className="bg-secundario p-4 shrink-0">
        <Link
          href={linkHref}
          className="text-white font-semibold text-sm text-center block"
        >
          {linkText}
        </Link>
      </div>
    </section>
  );
};
