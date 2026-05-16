"use client"
import { useState } from "react";

export default function FilterSidebar() {
    const brands = ["Asus", "Lenovo", "HP", "Apple"];
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const handleBrandChange = (brand: string, checked: boolean) => {
      if (checked) {
        setSelectedBrands((prev) => [...prev, brand]);
      } else {
        setSelectedBrands((prev) => prev.filter((b) => b !== brand));
      }
    };

  return (
    <aside
      className="
        w-70
        rounded-2xl
        border border-neutral-300
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-800">فیلتر محصولات</h2>

        <span
          className="
            rounded-full
            bg-purple-100
            px-3 py-1
            text-xs font-medium
            text-purple-600
          "
        >
          Filter
        </span>
      </div>

      <div className="space-y-8">
        {/* Brands */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-neutral-700">برند</h3>

          <div className="space-y-3">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  className="h-4 w-4"
                />

                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-neutral-700">
            موجودی
          </h3>

          <label
            className="
              flex cursor-pointer items-center gap-3
              rounded-lg px-2 py-2
              transition hover:bg-purple-50
            "
          >
            <input
              type="checkbox"
              className="
                h-4 w-4 rounded
                border-neutral-300
                text-purple-500
                focus:ring-purple-400
              "
            />

            <span className="text-sm text-neutral-600">فقط کالاهای موجود</span>
          </label>
        </div>

        {/* Price */}

        {/* Button */}
        <button
          className="
            w-full rounded-xl
            bg-purple-500
            py-3 text-sm font-medium
            text-white
            transition
            hover:bg-purple-600
          "
        >
          اعمال فیلتر
        </button>
      </div>
    </aside>
  );
}
