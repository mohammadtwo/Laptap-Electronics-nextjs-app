"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useRef} from "react";



export function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (
    swiper: SwiperType,
    time: number,
    progress: number,
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress),
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };



  return (
    <div className="relative h-96 w-full mx-auto">
      {/* دکمه‌های سفارشی با طراحی دلخواه */}
      <div className="sm:block absolute hidden bottom-1 right-[53%] -translate-y-1/2 z-20">
        <button
          onClick={handleNext}
          className={`
            bg-linear-to-r from-purple-600 to-purple-700 
            text-neutral-50 p-3 rounded-full shadow-lg 
            hover:from-purple-700 hover:to-purple-800 
            transition-all duration-300 hover:opacity-100 opacity-40 
            backdrop-blur-lg
            w-12 h-12 flex items-center justify-center
          `}
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="sm:block absolute hidden bottom-1 left-[53%] -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className={`
            bg-linear-to-r from-purple-600 to-purple-700 
            text-neutral-50 p-3 rounded-full shadow-lg 
            hover:from-purple-700 hover:to-purple-800 
            transition-all duration-300 hover:opacity-100 opacity-40 
            backdrop-blur-lg
           
            w-12 h-12 flex items-center justify-center
          `}
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper h-full "
      >
        <SwiperSlide>
          <div className="bg-linear-to-r from-blue-500 to-purple-600 h-full flex items-center justify-center text-white text-2xl">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-linear-to-r from-green-500 to-teal-600 h-full flex items-center justify-center text-white text-2xl">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-linear-to-r from-red-500 to-pink-600 h-full flex items-center justify-center text-white text-2xl">
            Slide 3
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
