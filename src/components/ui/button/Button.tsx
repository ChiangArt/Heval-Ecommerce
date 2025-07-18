"use client";
import React from "react";

interface Props {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  loadingVariant?: "fill" | "none";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  title,
  onClick,
  loading = false,
  loadingVariant = "none",
  className = "",
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={() => {
        if (!loading && onClick) onClick();
      }}
      className={`
         overflow-hidden px-6 py-3 lg:py-4 font-semibold transition-opacity flex items-center justify-center gap-2
        ${loading ? "pointer-events-none" : "cursor-pointer hover:opacity-90"}
        ${className}
      `}
    >
      {/* Barra de carga opcional */}
      {loading && loadingVariant === "fill" && (
        <span
          className="absolute left-0 top-0 h-full bg-white/30 animate-fill-right"
          style={{ width: "100%" }}
        />
      )}

      <span className="relative z-10 text-[10px] md:text-sm flex items-center gap-2">
        {loading && (
          <svg
            className="w-4 h-4 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {title}
      </span>
    </button>
  );
}
