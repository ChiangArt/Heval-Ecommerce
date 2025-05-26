import { Product } from "@/interfaces/product.interface";
import React from "react";
import CollectionGridItem from "./CollectionGridItem";

interface Props {
  collections: Product[];
}

export default function CollectionGrid({ collections }: Props) {
  return (
    <div className="grid grid-cols-2 p-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {collections.map((collection) => (
        <CollectionGridItem key={collection.slug} collection={collection} />
      ))}
    </div>
  );
}
