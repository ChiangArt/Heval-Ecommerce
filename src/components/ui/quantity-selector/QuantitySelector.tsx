"use client";

import { IoRemove, IoAdd } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

interface Props {
  className?: string;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemove?: () => void;
  disabled?: boolean;
}

export const QuantitySelector = ({
  quantity,
  className = "",
  onQuantityChange,
  onRemove,
  disabled = false,
}: Props) => {
  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChange(quantity + value);
  };

  return (
    <div className={`flex items-center justify-between gap-3 w-full ${className}`}>
      {disabled ? (
        <div className="flex items-center gap-2">
          <ImSpinner2 className="animate-spin w-5 h-5 text-secundario" />
          <span className="text-sm text-gray-500 select-none">Actualizando...</span>
        </div>
      ) : (
        <>
          {/* Botones de cantidad */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-6 h-5 flex items-center justify-center border border-secundario cursor-pointer hover:opacity-80"
              onClick={() => onQuantityChanged(-1)}
            >
              <IoRemove className="w-4 h-4" />
            </button>

            <span className="w-6 h-5 text-xs flex items-center justify-center border border-secundario select-none">
              {quantity}
            </span>

            <button
              type="button"
              className="w-6 h-5 flex items-center justify-center border border-secundario cursor-pointer hover:opacity-80"
              onClick={() => onQuantityChanged(+1)}
            >
              <IoAdd className="w-4 h-4" />
            </button>
          </div>

          {/* Botón de eliminar */}
          {onRemove && (
            <button
              type="button"
              className="w-6 h-5 flex items-center justify-center border border-secundario cursor-pointer hover:opacity-80"
              onClick={onRemove}
            >
              <FaRegTrashAlt className="w-4 h-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
