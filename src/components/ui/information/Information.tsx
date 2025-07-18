import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  description1?: string;
  description2?: string;
  link?: string;
  linkText?: string;
  classNameLink?: string;
  className?: string;
}

const SubtitleBlock = ({ text }: { text: string }) => (
  <div className="px-4 font-bold  text-xs sm:px-10 md:px-20 lg:px-32 md:text-lg">
    <p>{text}</p>
  </div>
);

export default function Information({
  title,
  description1,
  description2,
  link = "",
  linkText,
  className,
  classNameLink,
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 justify-center w-full h-full content-center text-center",
        className,
        !title && !linkText && "pt-7 p-1"
      )}
    >
      {/* Título principal */}
      {title && (
        <h1 className="font-inter px-10 font-black text-lg md:text-3xl ">{title}</h1>
      )}

      {/* Subtítulos */}
      {description1 && <SubtitleBlock text={description1} />}
      {description2 && <SubtitleBlock text={description2} />}

      {/* Botón de enlace */}
      {linkText && link && (
        <div className="flex justify-center">
          <Link
            className={` py-3 text-xs text-primario bg-white font-bold px-20 hover:opacity-75 ${classNameLink}`}
            href={link}
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
}
