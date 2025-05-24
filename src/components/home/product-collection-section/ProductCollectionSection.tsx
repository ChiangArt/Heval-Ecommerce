import React from "react";
import NewCollection from "./new-collection/NewCollection";
import NewProducts from "./new-products/NewProducts";
import BannerCollection from "./banner-collection/BannerCollection";
import SearchedProducts from "./searched-products/SearchedProducts";
import Information from "../information/Information";
import BannerMediaVideos from "../banner-media-videos/BannerMediaVideos";
import MediaVideos from "../media-videos/MediaVideos";

export default function ProductCollectionSection() {
  return (
    <div>
      <div className=" p-15 w-full h-full">
        <hr className="my-8 border-t border-gray-300 " />
        <NewCollection />
        <hr className="my-8 border-t border-gray-300 " />
        <NewProducts />
      </div>
      <BannerCollection />
      <SearchedProducts />
      <Information/>
      <BannerMediaVideos/>
      <MediaVideos/>
    </div>
  );
}
