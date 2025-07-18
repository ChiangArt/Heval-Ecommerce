"use client";

import { useSearchUIStore } from "@/store/ui/ui-search-store";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getProducts } from "@/core/product/action/product.actions";
import { Product } from "@/core/product/interface/productResponse";

export default function SearchDropdown() {
  const { isSearchOpen, closeSearch } = useSearchUIStore();
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getProducts(0, 5, { searchText: searchTerm });
        setSuggestions(result.content || []);
      } catch (err) {
        console.error("Error buscando productos:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await getProducts(0, 1, { searchText: searchTerm });
      const results = res?.content || [];

      closeSearch();

      if (results.length > 0) {
        router.push("/shop"); // ✅ hay resultados → ir a la tienda
      } else {
        router.push(`/shop/search?query=${encodeURIComponent(searchTerm)}`); // ❌ no hay resultados → ir a vista personalizada
      }
    } catch (err) {
      console.error("Error en búsqueda:", err);
      closeSearch();
      router.push(`/shop/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[99] text-white">
      <div className="absolute inset-0 bg-black/40" onClick={closeSearch} />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 left-0 w-full bg-secundario z-10 px-6 py-8 shadow-lg transform transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en nuestra tienda"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              className="w-full border px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-primario text-white placeholder-gray-500"
              autoFocus
            />
            <IoSearchSharp className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          </div>

          {searchTerm.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white text-black rounded shadow-md z-50 max-h-64 overflow-y-auto">
              {loading ? (
                <p className="p-4 text-sm text-gray-500">Buscando...</p>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      closeSearch();
                      router.push(`/product/${product.slug}`);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {product.title}
                  </button>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-400">Sin resultados</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
