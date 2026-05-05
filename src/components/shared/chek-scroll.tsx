"use client";

import { useEffect, useState, useRef } from "react";

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
      className={`absolute transition-transform!  right-0 left-0  duration-800! ease-in-out ${
        isVisible ? "top-full opacity-100 visible" : "top-0 opacity-0 invisible"
      }`}
    >
      {children}
    </div>
  );
}
