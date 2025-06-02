"use client";

import { useState } from "react";
import { IoRemove, IoAdd } from "react-icons/io5";

interface Props {
  className:string;
  quantity: number;
}

export const QuantitySelector = ({ quantity, className }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex items-center gap-2 font-bold">
      <button
        className={`w-7 h-6 lg:w-7 lg:h-6 flex items-center justify-center border-1 border-secundario border-turquesa text-center cursor-pointer ${className}`}
        onClick={() => onQuantityChanged(-1)}
      >
        <IoRemove className="w-4 h-4" />
      </button>

      <span className={`w-7 h-6 lg:w-7 lg:h-6 flex items-center text-sm border-secundario justify-center border-1  text-center select-none ${className}`}>
        {count}
      </span>

      <button
        className={`w-7 h-6 lg:w-7 lg:h-6 flex items-center justify-center border-secundario border-1 border-turquesa text-center cursor-pointer ${className}`}
        onClick={() => onQuantityChanged(+1)}
      >
        <IoAdd className="w-4 h-4" />
      </button>
    </div>
  );
};
