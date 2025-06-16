"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductSlideShow({
  images,
  title,
  className = "",
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={`${className} w-full`}>
      {/* Slideshow principal */}
      <Swiper
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image} className="flex bg-white">
            <div className="w-full h-[400px]">
              <Image
                width={500}
                height={500}
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                placeholder="empty" // o "blur" si tienes soporte
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperDesktop mt-1"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="w-full h-[100px] bg-white  overflow-hidden">
              <Image
                width={80}
                height={80}
                src={image}
                alt={title}
                className="object-cover w-full h-full"
                placeholder="empty" // o "blur" si tienes soporte
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
