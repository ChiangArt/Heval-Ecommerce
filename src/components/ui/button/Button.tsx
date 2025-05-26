import React from "react";

interface Props {
  className: string;
  title: string;
 
}

export default function Button({ className, title,  }: Props) {
  return (
     <button
      className={`px-6 py-2 rounded-md font-semibold ${className} cursor-pointer`}
    >
      {title}
    </button>
  );
}
