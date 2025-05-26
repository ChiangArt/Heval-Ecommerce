import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import Button from "@/components/ui/button/Button";
import { initialData } from "@/seed/seed";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Slides Show para web */}
      <div className="p-3">
        <ProductSlideShow
          images={[
            "https://swiperjs.com/demos/images/nature-1.jpg",
            "https://swiperjs.com/demos/images/nature-2.jpg",
          ]}
          title="Hola"
          className="hidden md:block"
        />

        {/* Slides Show para movil */}

        <ProductMobilSlideShow
          images={[
            "https://swiperjs.com/demos/images/nature-1.jpg",
            "https://swiperjs.com/demos/images/nature-2.jpg",
          ]}
          title="Hola"
          className=" md:hidden"
        />
      </div>
      <div className="px-5 flex flex-col gap-2">
        <h1 className="font-black text-3xl">{product?.title}</h1>
        <div className="text-sm inline-block text-white bg-turquesa md:text-lg font-bold">
          s/{product?.price}
          {/* {product.discount > 0 && ( */}
          <span className="text-[10px] md:text-lg text-gray-400 line-through ml-2">
            s/{product?.price}
          </span>
          {/* )} */}
        </div>
        <h3 className="font-bold text-xl">Descripción</h3>
        <p>{product?.description}</p>
        <QuantitySelector quantity={20} />
        <Button className="bg-turquesa text-white" title="COMPRAR AHORA" />
        <Button className="border-2" title="AGREGAR AL CARRITO" />
      </div>

      {/* Detalles del producto */}

      {/* Iconos */}
    </div>
  );
}
