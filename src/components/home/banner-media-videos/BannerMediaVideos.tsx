import React from "react";

export default function BannerMediaVideos() {
  return (
    <div className=" w-full pt-20 h-full">
      <div className="flex flex-col text-center gap-2">
        <p>
          <span className="inline-block text-xs md:text-xl bg-[#DCF3FF] px-2 py-1 transform -rotate-2">
            Gorras en su mejor ángulo
          </span>
        </p>

        <p>
          <span className="font-inter font-extrabold text-xl md:text-6xl inline-block bg-[#F7F3F3] px-2 py-1">
            Inspírate, comparte y únete
          </span>
        </p>
        <p>
          <span className="inline-block text-xs md:text-xl bg-[#FFF2D9] px-20 py-1">
            Tu próxima gorra favorita está en estos clips
          </span>
        </p>
      </div>
    </div>
  );
}
