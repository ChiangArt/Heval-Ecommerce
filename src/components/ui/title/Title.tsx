import React from "react";

interface Props {
  headerItems?: string[];
  pretitle?: string;
  title?: string;
  description1?: string;
  description2?: string;
  backgroundColor?: string;
  className?: string;
}

export const Title = ({
  headerItems = [],
  pretitle,
  title,
  description1,
  description2,
  className,
}: Props) => {
  return (
    <div className={`w-full font-bold ${className}`}>
      {headerItems.length > 0 && (
        <div className="grid grid-cols-3 text-center text-[8px] lg:text-sm text-secundario">
          {headerItems.map((item, index) => (
            <h3 key={index}>{item}</h3>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center text-center md:gap-1">
        {pretitle && (
          <span className="inline-block px-2 py-0.5 text-[10px] md:text-lg bg-terciario w-fit">
            {pretitle}
          </span>
        )}

        {title && (
          <span className="inline-block font-inter text-[15px] lg:text-3xl font-extrabold w-fit">
            {title}
          </span>
        )}

        {description1 && (
          <span className="inline-block px-2 py-0.5 text-white text-[10px] lg:text-lg bg-secundario w-fit">
            {description1}
          </span>
        )}

        {description2 && (
          <span className="inline-block px-2 py-0.5 text-primario text-[10px] lg:text-lg bg-terciario w-fit">
            {description2}
          </span>
        )}
      </div>
    </div>
  );
};
