"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface ScrollToggleProps {
  children: React.ReactNode;
  threshold?: number;
}

export default function ScrollToggle({
  children,
  threshold = 60,
}: ScrollToggleProps) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname(); // برای تشخیص تغییر مسیر

  // ریست وضعیت هنگام تغییر مسیر
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  // هندل اسکرول
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingDown = currentScrollY > lastScrollY.current;
          const scrollingUp = currentScrollY < lastScrollY.current;

          if (scrollingDown && currentScrollY > threshold) {
            setIsVisible(false); // مخفی کن
          } else if (scrollingUp) {
            setIsVisible(true); // ظاهر کن
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <div
      className={`absolute right-0 left-0 transition-all duration-500   ease-in-out z-10 ${
        isVisible ? "top-0  " : "sm:top-[-36.8px] absolute"
      }`}
    >
      {children}
    </div>
  );
}
