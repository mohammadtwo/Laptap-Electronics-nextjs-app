"use client";

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";

export default function MobileFilter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          rounded-xl
          bg-purple-500
          px-5 py-2.5
          text-sm font-medium
          text-white
          transition
          hover:bg-purple-600
        "
      >
        فیلترها
      </button>

      {/* Modal */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setOpen(false)}
        >
          {/* Sidebar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute right-0 top-0
              h-full w-[320px]
              overflow-y-auto
              bg-neutral-50
              p-5
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-800">
                فیلتر محصولات
              </h2>

          
            </div>

            {/* Filters */}
            <FilterSidebar />
          </div>
        </div>
      )}
    </>
  );
}
