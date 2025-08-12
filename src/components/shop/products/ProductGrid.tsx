"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/core/product/interface/productResponse";
import dynamic from "next/dynamic";
import ProductItemSkeleton from "@/components/ui/skeleton/ProductItemSkeleton";
import { logInfo } from "@/app/utils/logger";

const ProductItem = dynamic(() => import("./ProductItem"), {
  loading: () => <ProductItemSkeleton />,
  ssr: false,
});

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
      logInfo("🌐 API base URL:", process.env.NEXT_PUBLIC_API_URL);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!showContent) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
