"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";

interface SlidesShowProps {
  images: string[];
  height?: number;
}

export default function SlidesShow({ images, height = 400 }: SlidesShowProps) {
  return (
    <div className="w-full max-w-full mx-auto" style={{ height }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((url, i) => (
          <SwiperSlide key={i} className="relative  overflow-hidden">
            <Image
              src={url}
              alt={`Slide ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority={i === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
