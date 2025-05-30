import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/products/product-grid/ProductGrid";
import ShopSection from "@/components/shop/ShopSection";
// import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
// import News from "@/components/ui/footer/News";
// import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
// import TopMenu from "@/components/ui/top-menu/TopMenu";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import React from "react";

const products: Product[] = initialData.products;

export default function ShopPageInit() {
  return (
    <>
      
      
      <ShopSection />
      <Filters />
      <hr className="my-2 border-t-2 border-gray-300 " />
      <ProductGrid products={products} />
      
    </>
  );
}
