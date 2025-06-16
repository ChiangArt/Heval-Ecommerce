import { getProductById } from "@/core/product/action/product.actions";
import { Product } from "@/core/product/interface/productResponse";
import { notFound, redirect } from "next/navigation";
import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import Button from "@/components/ui/button/Button";
import StatusRotator from "@/components/shop/product/status-rotator/StatusRotator";

interface Props {
  params: { slug: string };
}

export default async function ProductBySlugPage({ params }: Props) {
  const [idStr] = params.slug.split("-");
  const id = Number(idStr);

  if (isNaN(id)) return notFound();

  const product: Product = await getProductById(id);

  if (!product) return notFound();

  const realSlug = product.slug;

  if (realSlug !== params.slug) {
    redirect(`/shop/product/${realSlug}`);
  }

  const discountEnd = product.discountUntil
    ? new Date(product.discountUntil).toLocaleString("es-PE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="grid w-full h-full bg-white landscape:mt-20  grid-cols-1 sm:grid-cols-2 sm:h-screen ">
      {/* Slides Show para web */}

      <div className="landscape:pl-5">
        <ProductSlideShow
          images={product.imageUrls}
          title={product.title}
          className="hidden sm:block"
        />
      </div>

      {/* Slides Show para móvil */}
      <ProductMobilSlideShow
        images={product.imageUrls}
        title={product.title}
        className="sm:hidden"
      />

      <div className=" text-xs flex flex-col gap-5 pt-10 md:pt-0 items-start lg:text-sm w-full max-w-md landscape:pl-10">
        <div className="flex flex-col gap-1 items-start  pr-10 w-full ">
          <h1 className="font-black uppercase text-2xl text-secundario font-inter pb-2">
            {product.title}
          </h1>

          <div className="flex flex-col gap-2 w-full">
            {/* Fila 1: Precio y Stock */}
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-2 flex-[2] bg-primario text-white text-sm md:text-lg font-bold px-3 py-2  justify-center">
                <span>S/ {product.currentPrice} /</span>
                <span className="text-[10px] md:text-sm text-gray-400 line-through">
                  S/ {product.price}
                </span>
              </div>

              <StatusRotator
                quantity={product.quantity}
                discountPercentage={product.discountPercentage}
                discountEnd={discountEnd}
              />
            </div>
          </div>

          <h3 className="font-bold pt-4 text-xl text-secundario">
            Descripción
          </h3>
          <p>{product.description}</p>

          <QuantitySelector className="pt-10" quantity={1} />
        </div>

        {/* BOTONES A PANTALLA COMPLETA */}
        <div className="w-full flex flex-col gap-2">
          <Button
            disabled={product.quantity === 0}
            className="bg-secundario text-white w-full"
            title="COMPRAR AHORA"
          />
          <Button
            disabled={product.quantity === 0}
            className="border-2 hover:bg-secundario hover:text-white"
            title="AGREGAR AL CARRITO"
          />
        </div>
      </div>
    </div>
  );
}
