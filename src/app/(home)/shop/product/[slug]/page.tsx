import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import Button from "@/components/ui/button/Button";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import React from "react";

// DE PRODUCTO NECESITO
// id,
// title,
// precio,
// precio final
// stock
// descuento
// tiempo de inicio de descuento
// tiempo de fin de descuento
// descripcion
// slug

export default async function ProductBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const product = initialData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  const discountAmount = product?.discount
    ? product.price * product.discount
    : 0;
  const finalPrice = (product.price - discountAmount).toFixed(2);

  return (
    <div className="grid w-full h-full p-3 grid-cols-1 sm:grid-cols-2 sm:h-screen">
      {/* Slides Show para web */}
      <div className="flex sm:items-center sm:justify-center h-full sm:h-screen">
        <div className="w-full">
          <ProductSlideShow
            images={[
              "https://swiperjs.com/demos/images/nature-1.jpg",
              "https://swiperjs.com/demos/images/nature-2.jpg",
            ]}
            title="Hola"
            className="hidden sm:block"
          />
        </div>
        {/* Slides Show para movil */}

        <ProductMobilSlideShow
          images={[
            "https://swiperjs.com/demos/images/nature-1.jpg",
            "https://swiperjs.com/demos/images/nature-2.jpg",
          ]}
          title="Hola"
          className="sm:hidden"
        />
      </div>
      <div className="flex sm:items-center sm:justify-center h-full">
        <div className="px-2 text-xs flex flex-col gap-5 pt-10 md:pt-0 lg:px-15 lg:text-sm w-full max-w-md">
          <h1 className="font-black text-3xl">{product?.title}</h1>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-sm p-3 text-white bg-turquesa md:text-lg font-bold col-span-2">
              s/{finalPrice}
              {product.discount > 0 && (
                <span className="text-[10px] font-bold p-3 md:text-lg text-gray-400 line-through ml-2">
                  s/{product?.price}
                </span>
              )}
            </div>
            {product.inStock > 0 ? (
              <span className="bg-[#DCF3FF] p-3 font-bold">
                STOCK DISPONIBLE
              </span>
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
          <QuantitySelector className="p-2" quantity={20} />

          <Button className="bg-turquesa text-white" title="COMPRAR AHORA" />
          <Button
            className="border-2 hover:bg-turquesa hover:text-white"
            title="AGREGAR AL CARRITO"
          />
        </div>
      </div>
    </div>
  );
}
