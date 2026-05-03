// lib/components/ThemeProvider.tsx
"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/theme-slice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state._hasHydrated);

  // اعمال کلاس dark/light روی <html>
  useEffect(() => {
    const root = document.documentElement;

    // حذف کلاس‌های قبلی برای اطمینان
    root.classList.remove("light", "dark");
    // اضافه کردن کلاس فعلی
    root.classList.add(theme);

    // اگر بخواهی theme را در localStorage هم ذخیره کنی:
    // localStorage.setItem("theme", theme);
  }, [theme]);

  // تا زمانی که Zustand hydrate نشده، هیچی نمایش نده (جلوگیری از FOUC)
  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
