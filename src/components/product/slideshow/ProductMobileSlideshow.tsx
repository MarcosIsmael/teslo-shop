"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import "./styles.css";
import { Autoplay, FreeMode, Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";

interface ProductSlideshowProps {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({
  images,
  title,
  className,
}: ProductSlideshowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        navigation
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Thumbs, Autoplay, Pagination]}
        className={`mySwiper2`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={600}
              height={500}
              className="object-fill "
              src={`/products/${image}`}
              alt={`${title} ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
