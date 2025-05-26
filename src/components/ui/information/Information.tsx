import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  description1?: string;
  description2?: string;
  link?: string;
  linkText?: string;
  bgColor?: string;
  textColor?: string;
  bgLink?: string;
  textColorLink?: string;
}

const SubtitleBlock = ({ text }: { text: string }) => (
  <div className="px-4 font-bold pb-10 text-sm sm:px-10 md:px-20 lg:px-32 md:text-xl">
    <p>{text}</p>
  </div>
);

export default function Information({
  title,
  description1,
  description2,
  link = "#",
  linkText,
  bgLink,
  bgColor,
  textColor,
  textColorLink,
}: Props) {
  return (
    <div className="my-10">
      <div
        className={clsx(
          "w-full h-full text-center",
          bgColor,
          textColor,
          !title && !linkText && "pt-7 p-1"
        )}
      >
        {/* Título principal */}
        {title && (
          <h1 className="font-inter px-10 py-6 font-black text-lg md:text-4xl">
            {title}
          </h1>
        )}

        {/* Subtítulos */}
        {description1 && <SubtitleBlock text={description1} />}
        {description2 && <SubtitleBlock text={description2} />}

        {/* Botón de enlace */}
        {linkText && link && (
          <div className="flex justify-center pb-6">
            <Link
              className={clsx(
                "bg-turquesa py-3 text-xs md:text-xl font-bold px-20 hover:opacity-75",
                bgLink,
                textColorLink
              )}
              href={link}
            >
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
