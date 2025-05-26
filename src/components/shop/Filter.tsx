import { FaSliders } from "react-icons/fa6";

interface FiltersProps {
  coleccion: string;
  color: string;
  precio: string;
  setColeccion: (v: string) => void;
  setColor: (v: string) => void;
  setPrecio: (v: string) => void;
  clearFilters: () => void;
}

export default function Filter({
  coleccion,
  color,
  precio,
  setColeccion,
  setColor,
  setPrecio,
  clearFilters,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 font-bold">
      <div className="hidden md:flex md:text-xs md:items-center md:gap-2 md:py-3 md:px-4 md:bg-[#FFF2D9] md:rounded">
        <FaSliders />
        <p>Filtrar:</p>
      </div>
      <div>
        <select
          value={coleccion}
          onChange={(e) => setColeccion(e.target.value)}
          className="p-3 w-full md:py-3 md:px-4 text-xs bg-[#F7F3F3] rounded"
        >
          <option value="" disabled hidden>
            Colección
          </option>
          <option value="verano">Verano</option>
          <option value="invierno">Invierno</option>
        </select>
      </div>

      <div>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-3 w-full md:py-3 md:px-4 text-xs bg-[#F7F3F3] rounded"
        >
          <option value="" disabled hidden>
            Color
          </option>
          <option value="negro">Negro</option>
          <option value="blanco">Blanco</option>
          <option value="rojo">Rojo</option>
        </select>
      </div>

      <div>
        <select
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="p-3 w-full md:py-3 md:px-4  text-xs bg-[#F7F3F3] rounded"
        >
          <option value="" disabled hidden>
            Precio
          </option>
          <option value="low">Menos de S/50</option>
          <option value="medium">S/50 - S/100</option>
          <option value="high">Más de S/100</option>
        </select>
      </div>

      <button
        onClick={clearFilters}
        className="bg-gray-100 hover:bg-gray-200 p-3 rounded text-xs"
      >
        Limpiar
      </button>
    </div>
  );
}
