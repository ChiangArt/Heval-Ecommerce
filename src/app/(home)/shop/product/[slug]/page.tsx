import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import Button from "@/components/ui/button/Button";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

// DE PRODUCTO NECESITO
// title,
// precio,
// precio final
// stock
// descuento
// tiempo de inicio de descuento
// tiempo de fin de descuento
// descripcion
// slug

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="grid p-3 grid-cols-1 md:grid-cols-2">
      {/* Slides Show para web */}
      <div>
        <ProductSlideShow
          images={[
            "https://swiperjs.com/demos/images/nature-1.jpg",
            "https://swiperjs.com/demos/images/nature-2.jpg",
          ]}
          title="Hola"
          className="hidden md:block h-full"
        />

        {/* Slides Show para movil */}

        <ProductMobilSlideShow
          images={[
            "https://swiperjs.com/demos/images/nature-1.jpg",
            "https://swiperjs.com/demos/images/nature-2.jpg",
          ]}
          title="Hola"
          className="md:hidden"
        />
      </div>
      <div className="px-2 text-xs flex flex-col gap-5 pt-10 md:pt-0 lg:px-15 lg:text-sm">
        <h1 className="font-black text-3xl">{product?.title}</h1>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-sm p-3 text-white bg-turquesa md:text-lg font-bold col-span-2">
            s/{product?.price}
            {/* {product.discount > 0 && ( */}
            <span className="text-[10px] font-bold p-3 md:text-lg text-gray-400 line-through ml-2">
              s/{product?.price}
            </span>
            {/* )} */}
          </div>
          {product.inStock > 0 ? (
            <span className="bg-[#DCF3FF] p-3 font-bold">STOCK DISPONIBLE</span>
          ) : (
            <span className="bg-[#DCF3FF] p-3 font-bold">SIN STOCK</span>
          )}

          <span className="bg-[#FFF2D9] p-3 font-bold">15% OFF</span>

          <span className="col-span-2 font-bold p-3 bg-[#F7F3F3]">
            DESCUENTO HASTA EL 31/07/2025
          </span>
        </div>
        <h3 className="font-bold text-xl">Descripción</h3>
        <p>{product?.description}</p>
        <QuantitySelector quantity={20} />

        <Button className="bg-turquesa text-white" title="COMPRAR AHORA" />
        <Button
          className="border-2 hover:bg-turquesa hover:text-white"
          title="AGREGAR AL CARRITO"
        />
      </div>
    </div>
  );
}
