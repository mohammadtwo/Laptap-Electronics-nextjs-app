// components/AdminNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// آیکون‌های ساده (می‌توانید از lucide-react یا heroicons استفاده کنید)
const MenuIcon = () => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const CloseIcon = () => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const navLinks = [
  { name: "داشبورد", href: "/admin/dashboard" },
  { name: "محصولات", href: "/admin/products" },
  { name: "سفارشات", href: "/admin/orders" },
  { name: "مشتریان", href: "/admin/customers" },
  { name: "تنظیمات", href: "/admin/settings" },
];

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-900 border-b border-purple-500/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* لوگو و برند */}
          <div className="flex items-center">
            <Link
              href="/admin/dashboard"
              className="shrink-0 flex items-center gap-2"
            >
              <div className="w-25 h-10 relative">
                <Image
                  src="/assets/svg/nav-logo.svg" // یا import شده
                  fill
                  className="object-contain scale-125" // یا object-cover
                  alt="logo"
                />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                ادمین پنل
              </span>
            </Link>
          </div>

          {/* لینک‌های دسکتاپ (وسط) */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-purple-400"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* بخش سمت راست: اعلان و پروفایل */}
          <div className="flex items-center gap-3">
            {/* دکمه اعلان (نماد) */}
            <button className="p-2 rounded-full text-neutral-300 hover:text-purple-400 hover:bg-neutral-800 transition">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* منوی کاربر */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 bg-neutral-800 rounded-full p-1 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                  <UserIcon />
                </div>
                <span className="text-neutral-200 hidden sm:inline-block">
                  مدیر سایت
                </span>
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 py-1 z-10">
                  <Link
                    href="/admin/profile"
                    className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-purple-400"
                  >
                    پروفایل
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-purple-400"
                  >
                    تنظیمات
                  </Link>
                  <hr className="my-1 border-neutral-700" />
                  <button className="w-full text-right block px-4 py-2 text-sm text-red-400 hover:bg-neutral-700">
                    خروج
                  </button>
                </div>
              )}
            </div>

            {/* دکمه منوی موبایل */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-neutral-300 hover:text-purple-400 hover:bg-neutral-800"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* منوی موبایل (کشویی) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-purple-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition
                    ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-purple-400"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
