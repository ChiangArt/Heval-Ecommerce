"use client";
import { useEffect, useState } from "react";

const messages = [
  "Adquiere cualquier producto con envío gratis 🚚",
  "🎉Adquiere cualquier producto con envío gratis",
  "Adquiere cualquier producto con envío gratis 🚚",
  "🎉Adquiere cualquier producto con envío gratis",
  "Adquiere cualquier producto con envío gratis 🚚",
];
export default function AnnouncementBar() {
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
      className={`w-full  bg-terciario select-none overflow-hidden z-26 fixed
    ${
      isFixed
        ? "hidden"
        : "fixed"
    }`}
    >
      <div className="text-sm  whitespace-nowrap flex">
        {/* Primer conjunto de mensajes */}
        <div className="flex animate-marquee">
          {messages.map((msg, i) => (
            <span key={`original-${i}`} className="px-4">
              {msg}
            </span>
          ))}
        </div>
        {/* Segundo conjunto (para efecto continuo) */}
        <div className="flex animate-marquee" aria-hidden="true">
          {messages.map((msg, i) => (
            <span key={`duplicate-${i}`} className="px-4">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
