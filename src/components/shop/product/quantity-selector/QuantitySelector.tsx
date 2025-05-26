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
    <div className="flex items-center gap-4">
      <button
        className="w-22 h-10 flex items-center justify-center border-2 border-turquesa text-center cursor-pointer"
        onClick={() => onQuantityChanged(-1)}
      >
        <IoRemove size={24} />
      </button>

      <span className="w-22 h-10 flex items-center justify-center border-2 border-turquesa text-center select-none">
        {count}
      </span>

      <button
        className="w-22 h-10 flex items-center justify-center border-2 border-turquesa text-center cursor-pointer"
        onClick={() => onQuantityChanged(+1)}
      >
        <IoAdd size={24} />
      </button>
    </div>
  );
};
