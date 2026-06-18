"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const imagePreview = [
  "profile.png",
  "projects.png",
  "projectssJava.png",
  "technology.png",
  "tools.png",
  "contactMe.png"
];

const SliderPreview = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-5 w-full ">
      <h1 className="text-3xl xl:text-6xl leading-tight max-w-xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(0,130,246,.5)] bg-gradient-to-b from-white/70 to-white via-white/80 bg-clip-text text-transparent text-center">
        How Your <span className="text-blue-600/60">Portfolio</span> Will Look
      </h1>

      <div className="relative w-full border-10 shadow-xl shadow-blue-500 border-blue-600/20 rounded-3xl overflow-hidden ">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          navigation
          pagination={{ clickable: true }}
        >
          {imagePreview.map((url, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="relative h-120 w-full ">
                  <Image alt="" fill src={`/${url}`} className="object-cover" />
                </div>
              </SwiperSlide>
            );
          })}

          <div className="absolute inset-0 shadow-2xl shadow-blue-600  " />
        </Swiper>
      </div>
    </div>
  );
};

export default SliderPreview;
