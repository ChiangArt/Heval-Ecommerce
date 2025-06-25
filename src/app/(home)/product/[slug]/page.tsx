import { getProductById } from "@/core/product/action/product.actions";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import StatusRotator from "@/components/shop/product/status-rotator/StatusRotator";
import ProductActions from "@/components/shop/product/productActions/ProductActions";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [idStr] = slug.split("-");
  const id = Number(idStr);

  if (isNaN(id)) return { title: "Producto no válido - Heval" };

  const product = await getProductById(id);
  if (!product) return { title: "Producto no encontrado - Heval" };

  return {
    title: `${product.title} - Heval`,
    description:
      product.description ?? "Producto de calidad disponible en Heval.",
  };
}

export default async function ProductBySlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [idStr] = slug.split("-");
  const id = Number(idStr);

  if (isNaN(id)) return notFound();

  const product = await getProductById(id);
  if (!product) return notFound();

  if (product.slug !== slug) {
    redirect(`/shop/product/${product.slug}`);
  }

  const isDiscountValid = new Date(product.discountUntil) > new Date();
  const discount =
    isDiscountValid && product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  const discountEnd = product.discountUntil
    ? new Date(product.discountUntil).toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="grid bg-white pt-25 mb-25  grid-cols-1 md:grid-cols-2 landscape:grid-cols-10">
      <div className="landscape:pl-5 landscape:col-span-4">
        <ProductSlideShow
          images={product.imageUrls}
          title={product.title}
          className="hidden sm:block"
        />
      </div>
      <ProductMobilSlideShow
        images={product.imageUrls}
        title={product.title}
        className="sm:hidden"
      />
      <div className="text-xs flex flex-col px-4 lg:px-30 gap-5 pt-10 md:pt-0 lg:text-sm w-full landscape:col-span-6 landscape:pl-10">
        <h1 className="font-black uppercase text-2xl text-secundario font-inter pb-2">
          {product.title}
        </h1>

        <div className="flex flex-col w-full">
          <div className="flex gap-2 w-full flex-col md:flex-row items-start">
            <div className="flex items-center gap-2 flex-[2] bg-primario text-white text-sm md:text-lg font-bold px-3 py-2 justify-center">
              <span>S/{discount.toFixed(2)}</span>
              {isDiscountValid && product.discountPercentage > 0 && (
                <>
                  <span>/</span>
                  <span className="text-[10px] md:text-sm text-gray-400 line-through">
                    S/{product.price.toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <StatusRotator
              quantity={product.quantity}
              discountPercentage={product.discountPercentage}
              discountEnd={discountEnd}
            />
          </div>

          <h3 className="font-bold pt-4 text-lg text-secundario">
            Descripción
          </h3>
          <p>{product.description}</p>
          <div className="flex flex-col text-primario pt-5 text-base space-y-1">
            <div>
              <span className="font-extrabold  mr-1">Material:</span>
              <span className="break-words">{product.material}</span>
            </div>

            <div>
              <span className="font-bold  mr-1">Color:</span>
              <span className="break-words">{product.colors}</span>
            </div>

            <div>
              <span className="font-bold  mr-1">
                Descripción de Arquetipo:
              </span>
              <span className="break-words">
                {product.descriptionArchetype}
              </span>
            </div>
          </div>
        </div>
        <ProductActions id={product.id} stock={product.quantity} />
      </div>
    </div>
  );
}
