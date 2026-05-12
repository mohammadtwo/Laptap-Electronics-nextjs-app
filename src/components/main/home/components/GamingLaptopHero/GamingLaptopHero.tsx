// components/GamingLaptopHero.tsx
"use client";

import Link from "next/link";

export default function GamingLaptopHero() {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-5">
      <div className="relative w-full h-87.5 md:h-112.5 lg:h-130 overflow-hidden rounded-2xl">
        {/* Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/gaming-laptop.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-black/40 via-black/20 to-transparent rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 flex items-center h-full justify-start px-6 md:px-12">
          <Link
            href="/gaming-laptops"
            className="text-white text-xl md:text-3xl lg:text-4xl font-bold bg-black/20 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-black/40 transition"
          >
            ورود به دنیای گیمینگ
          </Link>
        </div>
      </div>
    </div>
  );
}
