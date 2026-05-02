"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store/root-redux";
import { toggleTheme } from "@/lib/store/slices/theme-slice/themeSlice";

function ThemeToggle({ className }: { className?: string }) {
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useDispatch();

  return (
    <div className={`flex gap-2 w-fit items-center ${className}`}>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="sm:w-15 sm:h-8 w-6 h-6  rounded-2xl   relative  inset-shadow-white   cursor-pointer bg-black dark:bg-blue-400"
      >
        <div
          className={`sm:h-7 sm:w-7 w-6 h-6  rounded-full transition-transform! duration-700 ease-out! flex justify-center items-center   absolute -translate-y-1/2 top-1/2 shadow-2xl  bg-white dark:bg-white   ${theme === "dark" ? "sm:-translate-x-[calc(100%-1px)]" : "sm:-translate-x-1"}  `}
        >
          {theme === "dark" ? "☼" : "☽"}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
