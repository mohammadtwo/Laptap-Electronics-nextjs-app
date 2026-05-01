"use client";
import { RootState } from "@/lib/store/root-redux";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <div
      className={` bg-neutral-50 text-neutral-800 ${theme === "dark" ? "dark" : ""} `}
    >
      {children}
    </div>
  );
}
