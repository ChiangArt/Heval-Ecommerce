import React from "react";

interface Props {
  className: string;
  title: string;
  onClick?: () => void;
}

export default function Button({ className, title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 font-semibold ${className} cursor-pointer hover:opacity-80`}
    >
      {title}
    </button>
  );
}
