"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";

export default function CarouselComponent() {
  const slides = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
  ];

  return (
    <section className="relative w-full h-[500px] sm:h-[600px]">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000, // time in ms before next slide (3 seconds)
          disableOnInteraction: false, // continue autoplay after user interacts
        }}
        className="w-full h-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[500px] sm:h-[600px]">
              <Image
                src={src}
                alt={`image ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
