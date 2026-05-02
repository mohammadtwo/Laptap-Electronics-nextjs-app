"use client";

import { useThemeStore } from "@/lib/store/theme-slice";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  return <div className={`bg-neutral-50 text-neutral-800 ${theme==="dark"?"dark":"light"}`}>{children}</div>;
}
