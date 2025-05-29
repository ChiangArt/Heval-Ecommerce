"use client";
import React, { useState } from "react";
import Image from "next/image";
import { type Swiper as SwiperClass } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className: string;
}

export default function ProductSlideShow({ images, title, className }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className={className}>
      <Swiper
        spaceBetween={10}
        autoplay={{ delay: 2000 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
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

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperDesktop"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={200}
              height={100}
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
