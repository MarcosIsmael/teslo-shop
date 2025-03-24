"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "./styles.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

interface ProductSlideshowProps {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({
  images,
  title,
  className,
}: ProductSlideshowProps) => {
  const [thumsSwiper, setThumsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "---swiper-navigation-color": "#fff",
            "---swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        thumbs={{
          swiper: thumsSwiper && !thumsSwiper.destroyed ? thumsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className={`mySwiper2`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={1024}
              height={800}
              className="rounded-lg object-fill "
              src={`/products/${image}`}
              alt={`${title} ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={300}
              height={300}
              className="rounded-lg object-fill "
              src={`/products/${image}`}
              alt={`${title} ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
