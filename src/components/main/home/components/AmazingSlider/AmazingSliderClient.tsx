"use client";

import { useState, useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import AmazingHeader from "./AmazingHeader";
import ProductCard from "./ProductCard";
import MoreCard from "./MoreCard"; // کامپوننت مخصوص اسلاید «مشاهده بیشتر» (در پایین توضیح می‌دم)
import { Product } from "../Product/type";

interface Props {
  products?: Product[];
}

export default function AmazingSliderClient({ products }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // اسکلت لودینگ
  if (!products) {
    return (
      <section className="w-full rounded-2xl md:rounded-3xl overflow-hidden bg-linear-to-r from-purple-700 via-purple-600 to-purple-500 p-4 md:p-5">
        <div className="flex gap-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-36 sm:w-44 md:w-52 lg:w-60 xl:w-64 h-57.5 md:h-65 bg-white/40 rounded-xl md:rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-5">
      <section className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-linear-to-r from-purple-700 via-purple-600 to-purple-500 p-4 md:p-5">
        {/* دکمه عقب (Previous) – فقط در سایز sm به بالا و هنگامی که به ابتدا نرسیده باشیم */}
        {!isBeginning && (
          <button
            onClick={handlePrev}
            className="hidden rotate-y-180 sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg text-purple-700 hover:bg-white transition-all duration-200"
            aria-label="اسلاید قبلی"
          >
            <svg
              className="w-5 h-5"
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
        )}

        {/* دکمه جلو (Next) – فقط در سایز sm به بالا و هنگامی که به انتها نرسیده باشیم */}
        {!isEnd && (
          <button
            onClick={handleNext}
            className="hidden rotate-y-180 sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg text-purple-700 hover:bg-white transition-all duration-200"
            aria-label="اسلاید بعدی"
          >
            <svg
              className="w-5 h-5"
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
        )}

        <Swiper
          className="items-stretch!"
          dir="rtl"
          spaceBetween={12}
          slidesPerView="auto"
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavState(swiper);
          }}
          onSlideChange={(swiper) => updateNavState(swiper)}
          onReachEnd={() => setIsEnd(true)}
          onFromEdge={() => setIsEnd(false)}
          breakpoints={{
            480: { spaceBetween: 14 },
            640: { spaceBetween: 16 },
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 24 },
            1280: { spaceBetween: 28 },
          }}
        >
          <SwiperSlide className="w-auto!">
            <AmazingHeader />
          </SwiperSlide>

          {products.map((product) => (
            <SwiperSlide
              key={product._id}
              className="w-36! h-auto! sm:w-44! md:w-52! lg:w-60! xl:w-64! 2xl:w-72!"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}

          {/* اسلاید «مشاهده بیشتر» */}
          <SwiperSlide className="h-auto! w-36! sm:w-44! md:w-52! lg:w-60! xl:w-64! 2xl:w-72!">
            <MoreCard />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
