"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 0;

  return (
   
      <nav className="w-full bg-neutral-900/95 backdrop-blur-md border-b border-neutral-700 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center text-neutral-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-3"
            >
              {/* SVG Logo */}
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Laptop */}
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="10"
                    rx="2"
                    stroke="#A855F7"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M2 18H22"
                    stroke="#A855F7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Electronic Pulse */}
                  <path
                    d="M9 10L11 8L13 12L15 10"
                    stroke="#C084FC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Brand */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm text-neutral-400 font-medium">
                  Laptop
                </span>

                <span className="font-bold text-white tracking-wide">
                  Electronics
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/products"
                className="text-neutral-300 hover:text-purple-300 transition"
              >
                محصولات
              </Link>

              <Link
                href="/categories"
                className="text-neutral-300 hover:text-purple-300 transition"
              >
                دسته‌بندی‌ها
              </Link>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center w-80 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2">
              <Search size={18} className="text-neutral-400" />

              <input
                type="text"
                placeholder="جستجوی محصول..."
                className="w-full bg-transparent outline-none px-2 text-sm placeholder:text-neutral-500"
              />
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-neutral-300 hover:text-white transition"
              >
                ورود
              </Link>

              <Link
                href="/signup"
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl transition shadow-lg shadow-purple-500/20"
              >
                ثبت نام
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-neutral-800 rounded-xl transition"
              >
                <ShoppingCart size={22} className="text-neutral-100" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Empty Space */}
            <div className="md:hidden w-6"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-700 bg-neutral-900/95 backdrop-blur-md">
            <div className="flex flex-col items-center text-center gap-4 p-4">
              {/* Mobile Search */}
              <div className="w-full flex items-center bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-xl">
                <Search size={18} className="text-neutral-400" />

                <input
                  type="text"
                  placeholder="جستجوی محصول..."
                  className="w-full bg-transparent outline-none px-2 text-center text-sm placeholder:text-neutral-500"
                />
              </div>

              <Link
                href="/products"
                className="w-full text-neutral-200 hover:text-purple-300 transition"
              >
                محصولات
              </Link>

              <Link
                href="/categories"
                className="w-full text-neutral-200 hover:text-purple-300 transition"
              >
                دسته‌بندی‌ها
              </Link>

              <Link
                href="/login"
                className="w-full text-neutral-200 hover:text-purple-300 transition"
              >
                ورود
              </Link>

              <Link
                href="/signup"
                className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-xl transition"
              >
                ثبت نام
              </Link>

              <Link
                href="/cart"
                className="w-full text-neutral-200 hover:text-purple-300 transition"
              >
                سبد خرید
              </Link>
            </div>
          </div>
        )}
      </nav>
    
  );
}
