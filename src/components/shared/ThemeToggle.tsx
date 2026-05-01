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
        className="w-15 h-8   rounded-2xl   relative  inset-shadow-white   cursor-pointer bg-black dark:bg-blue-400"
      >
        <div
          className={`h-7 w-7  rounded-full flex justify-center items-center   absolute -translate-y-1/2 top-1/2 shadow-2xl  bg-white dark:bg-white duration-500 transition-colors ${theme === "dark" ? "toggelButtenDark text-yellow-400" : "toggelButten"}`}
        >
          {theme === "dark" ? "☼" : "☽"}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
