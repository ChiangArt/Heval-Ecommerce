import React from "react";

interface Props {
  className: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ className, title, onClick, disabled = false }: Props) {
  return (
    <button
    disabled={disabled}
      onClick={onClick}
      className={`px-6 py-2 font-semibold ${className} cursor-pointer hover:opacity-90`}
    >
      {title}
    </button>
  );
}
