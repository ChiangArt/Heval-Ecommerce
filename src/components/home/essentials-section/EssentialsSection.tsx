"use client";
import { Product } from "@/core/product/interface/productResponse";
import SearchedProducts from "@/components/home/product-collection-section/searched-products/SearchedProducts";

interface Props {
  products: Product[];
}

export const EssentialsSection = ({ products }: Props) => {
  return (
    <section className="snap-start snap-always pt-8 flex flex-col w-full px-2 py-4 lg:px-6 h-screen min-h-[100dvh]">
      <div className="font-bold w-full py-5">
        <div className="flex flex-col text-center gap-1 pt-3">
          <p>
            <span className="inline-block text-xs md:text-lg bg-[rgba(33,42,82,0.10)] px-2 py-1">
              Nuestros esenciales más buscados.
            </span>
          </p>

          <p>
            <span className="font-inter text-md lg:text-4xl font-extrabold inline px-2 rgba(232, 227, 222, 0.40)">
              ¡Favoritos que no puedes dejar pasar!
            </span>
          </p>

          <p>
            <span className="text-white inline-block text-xs lg:text-lg bg-secundario px-2 py-1">
              Diseño simple, funcional y con estilo.
            </span>
          </p>
          <p>
            <span className="inline-block text-primario text-xs lg:text-lg bg-terciario px-2 py-1">
              Descubre por qué todos los quieren.
            </span>
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <SearchedProducts products={products} />
      ) : (
        <div className="text-center text-gray-500 py-6">
          No hay productos populares todavía.
        </div>
      )}
    </section>
  );
};
