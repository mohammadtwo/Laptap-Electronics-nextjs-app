"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // جلوگیری از ناسازگاری Hydration با mount نشدن اولیه
  if (!mounted) {
    return (
      <div className={clsx("flex gap-2 w-fit items-center", className)}>
        <button className="sm:w-15 sm:h-8 w-6 h-6 rounded-2xl relative inset-shadow-white cursor-pointer bg-black dark:bg-blue-400">
          <div className="sm:h-7 sm:w-7 w-6 h-6 rounded-full transition-transform! duration-700 ease-out! flex justify-center items-center absolute -translate-y-1/2 top-1/2 shadow-2xl bg-white dark:bg-white" />
        </button>
      </div>
    );
  }

  return (
    <div className={clsx("flex gap-2 w-fit items-center", className)}>
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="sm:w-15 sm:h-8 w-6 h-6 rounded-2xl relative inset-shadow-white cursor-pointer bg-black dark:bg-blue-400"
      >
        <div
          className={clsx(
            "sm:h-7 sm:w-7 w-6 h-6 rounded-full transition-transform! duration-700 ease-out! flex justify-center items-center absolute -translate-y-1/2 top-1/2 shadow-2xl bg-white dark:bg-white",
            {
              "sm:-translate-x-[calc(100%-1px)] text-yellow-400":
                resolvedTheme === "dark",
              "sm:-translate-x-1": resolvedTheme !== "dark",
            },
          )}
        >
          {resolvedTheme === "dark" ? "☼" : "☽"}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
