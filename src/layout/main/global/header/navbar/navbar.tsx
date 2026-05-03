"use client";
import ScrollToggle from "@/components/shared/chek-scroll";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";

export default function Navbar() {

  return (
    <ScrollToggle>
      <header
        className="w-full absolute left-0 right-0 top-full  bg-linear-to-r from-purple-50 via-purple-50 to-purple-100 
                 shadow-md rounded-b-2xl py-2 px-4 sm:px-6 
                 flex  items-center justify-between gap-3"
      >
        {/* بخش راست (شامل سرچ، زنگ و سبد خرید) - در RTL سمت راست نمایش داده می‌شود */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 sm:flex-none order-last sm:order-first">
          {/* سرچ بار با استایل گرد و سایه نرم */}
          <div
            className="flex items-center justify-between gap-2 bg-white/70 backdrop-blur-sm 
                      rounded-full border border-purple-300 shadow-sm 
                      px-3 py-1.5 sm:py-2 w-full sm:w-72 
                      focus-within:ring-2 focus-within:ring-purple-400/50 
                      transition-all duration-200"
          >
            <input
              type="text"
              placeholder="جست و جو"
              className="bg-transparent outline-none text-sm text-neutral-700 w-full pr-1"
            />
            <Image
              alt="جستوجو"
              width={18}
              height={18}
              src="/assets/svg/search.svg"
              className="opacity-70"
            />
          </div>

          {/* آیکون زنگ با بک‌گراند دایره و افکت hover */}
          <button
            className="relative bg-purple-200/80 hover:bg-purple-300 
                     transition-all duration-200 rounded-full p-2 sm:p-2.5 
                     shadow-sm hover:shadow-md"
          >
            <Image
              width={20}
              height={20}
              src="/assets/svg/ring.svg"
              alt="زنگ"
              className="w-6 h-4 rounded-full sm:w-6 sm:h-6"
            />
            {/* یک نقطه اعلان کوچک (اختیاری) */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* دکمه سبد خرید (آیکونی) */}
          <button
            className=" items-center hidden sm:flex gap-1 bg-purple-200/80 hover:bg-purple-300 
                     transition-all duration-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 
                     shadow-sm hover:shadow-md text-purple-800 font-medium text-sm"
          >
            <Image
              width={20}
              height={20}
              src="/assets/svg/bx-cart.svg" // مسیر آیکون سبد خرید خود را قرار دهید
              alt="سبد خرید"
              className="w-5 h-5"
            />
            <span className="hidden sm:inline">سبد خرید</span>
          </button>
        </div>

        {/* بخش چپ (شامل تم تاگل و ثبت‌نام) */}
        <div className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle className="bg-white/50 rounded-full sm:p-1 p-1  shadow-sm hover:shadow-md transition-all" />
          <button
            className="bg-purple-300 hover:bg-purple-400 border border-purple-400 
                     text-purple-900 font-medium text-sm sm:text-base 
                     px-3 py-1.5 sm:px-5 sm:py-2 rounded-2xl 
                     transition-all duration-200 shadow-sm hover:shadow-md 
                     whitespace-nowrap flex gap-1"
          >
            <span className="h-full border-l pl-2 sm:inline hidden">
              ثبت نام
            </span>{" "}
            <span className="pr-2 sm:inline hidden">ورود</span>
            <Image
              width={20}
              height={20}
              src={"/assets/svg/add-user.svg"}
              alt="ورود"
              className="h-auto"
            />
          </button>
        </div>
      </header>
    </ScrollToggle>
  );
}
