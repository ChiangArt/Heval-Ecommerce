"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slideshow.css";

import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className: string;
}

export default function ProductMobilSlideShow({ images, title, className }: Props) {
  return (
    <div className={className}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide
            key={image}
            className="flex items-center justify-center h-full"
          >
            <Image
              width={500}
              height={300}
              src={image}
              alt={title}
              className=" object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
