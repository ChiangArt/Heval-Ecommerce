"use client";

import { useState } from "react";
import { IoRemove, IoAdd } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex items-center gap-2 font-bold">
      <button
        className="w-12 h-8 sm:w-15 sm:h-9 flex items-center justify-center border-1 border-turquesa text-center cursor-pointer"
        onClick={() => onQuantityChanged(-1)}
      >
        <IoRemove className="w-5 h-5" />
      </button>

      <span className="w-12 h-8 sm:w-15 sm:h-9 flex items-center justify-center border-1 border-turquesa text-center select-none">
        {count}
      </span>

      <button
        className="w-12 h-8 sm:w-15 sm:h-9 flex items-center justify-center border-1 border-turquesa text-center cursor-pointer"
        onClick={() => onQuantityChanged(+1)}
      >
        <IoAdd className="w-5 h-5" />
      </button>
    </div>
  );
};
