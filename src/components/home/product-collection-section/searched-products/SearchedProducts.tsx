import ProductItem from "@/components/ui/product/productItem";
import { Product } from "@/core/product/interface/productResponse";

import React from "react";
interface Props {
  products: Product[];
}

export default function SearchedProducts({ products }: Props) {
 return (
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2  landscape:lg:grid-cols-4 landscape:md:grid-cols-3">
         {products[0] && (
           <ProductItem key={products[0].id} product={products[0]} />
         )}
         {products[1] && (
           <div className="hidden md:block">
             <ProductItem key={products[1].id} product={products[1]} />
           </div>
         )}
         {products[2] && (
           <div className="hidden md:block">
             <ProductItem key={products[2].id} product={products[2]} />
           </div>
         )}
         {products[3] && (
           <div className="hidden lg:block">
             <ProductItem key={products[3].id} product={products[3]} />
           </div>
         )}
       </div>
   );
}
