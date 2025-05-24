"use client";
import { useEffect, useState } from "react";

export default function ScrollEffect({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full text-[white] z-50 transition-all duration-500 ease-in-out ${
        isFixed
          ? "fixed top-0 bg-turquesa/80 backdrop-blur-xl shadow-md translate-y-0 p-3"
          : "relative bg-turquesa translate-y-0 p-2"
      }`}
      style={{
        transitionProperty:
          "background-color, backdrop-filter, box-shadow, transform, position, padding",
      }}
    >
      {children}
    </div>
  );
}
