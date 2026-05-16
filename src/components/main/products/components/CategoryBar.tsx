"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "electronics",
  "gaming",
  "office",
  "student",
  "MacBook",
  "Laptop",
];

export default function CategoryBar({ active }: { active?: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const handleCategory = (cat: string) => {
    const query = new URLSearchParams(params.toString());

    query.set("category", cat);

    router.push(`/products?${query}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategory(cat)}
          className={`
            whitespace-nowrap rounded-full px-5 py-2 text-sm border
            ${
              active === cat
                ? "bg-purple-500 text-white border-purple-500"
                : "border-neutral-300 bg-white text-neutral-700 hover:border-purple-500"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
