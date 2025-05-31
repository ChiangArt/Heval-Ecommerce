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
    <div className={` font-bold w-full ${className}`}>
      {headerItems.length > 0 && (
        <div className={"grid grid-cols-3 text-center text-[10px] lg:text-sm text-secundario"}>
          {headerItems.map((item, index) => (
            <h3 key={index}>{item}</h3>
          ))}
        </div>
      )}

      <div className="flex flex-col text-center gap-1 pt-3">
        {pretitle && (
          <p>
            <span className="inline-block text-xs md:text-lg bg-[rgba(33,42,82,0.10)] px-2 py-1 transform rotate-2">
              {pretitle}
            </span>
          </p>
        )}

        {title && (
          <p>
            <p className="font-inter text-md lg:text-4xl font-extrabold inline px-2 bg-[rgba(232,227,222,0.40)]">
              {title}
            </p>
          </p>
        )}

        {description1 && (
          <p>
            <span className="inline-block text-xs lg:text-lg bg-terciario px-2 py-1">
              {description1}
            </span>
          </p>
        )}

        {description2 && (
          <p>
            <span className="text-white inline-block text-xs lg:text-lg bg-secundario px-2 py-1 transform rotate-2">
              {description2}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
