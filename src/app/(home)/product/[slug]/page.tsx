import { getProductsBySlug } from "@/core/product/action/product.actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductSlideShow from "@/components/shop/product/slides-show/ProductSlideShow";
import ProductMobilSlideShow from "@/components/shop/product/slides-show/ProductMobilSlideShow";
import ProductActions from "@/components/shop/product/productActions/ProductActions";
import ProductDetails from "@/components/shop/product/productDetails/ProductDetails";

type Params = { slug: string };

function capitalize(text: string) {
  return text.replace(/\b\w/g, (l) => l.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductsBySlug(slug);
  const baseUrl = "https://heval.com";

  if (!product) {
    return {
      title: "Producto no encontrado - Heval",
      description: "Este producto no existe o ha sido removido.",
    };
  }

  const title = `${capitalize(product.title)} - Heval`;
  const description =
    product.description ?? "Producto de calidad disponible en Heval.";
  const image = product.imageUrls?.[0] || "/default-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/producto/${slug}`,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductBySlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductsBySlug(slug);

  if (!product) return notFound();

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
    <div className="grid bg-white pt-25 mb-25 grid-cols-1 md:grid-cols-2 landscape:grid-cols-10">
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

      <div className="text-xs flex flex-col px-4 lg:px-30 gap-5 pt-10 md:pt-0 lg:text-sm max-w-3xl landscape:col-span-6 landscape:pl-10">
        <ProductDetails
          product={product}
          discount={discount}
          discountEnd={discountEnd}
          isDiscountValid={isDiscountValid}
        />
        <ProductActions id={product.id} stock={product.quantity} />
      </div>
    </div>
  );
}
