import Carousel from "@/components/home/carousel/Carousel";
import ProductCollectionSection from "@/components/home/product-collection-section/ProductCollectionSection";
import PromotionalGrid from "@/components/home/promotional-grid/PromotionalGrid";

export default function HomePage() {
  

  return (
    <div >
      <Carousel/>
      <PromotionalGrid/>
      <ProductCollectionSection/>
    </div>
  );
}
