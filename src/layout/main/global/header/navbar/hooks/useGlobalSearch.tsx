"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function useGlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParamsString);

      if (!inputValue) {
        if (pathname === "/products") {
          params.delete("search");
          const query = params.toString();
          router.replace(query ? `/products?${query}` : "/products");
        }
        return;
      }

      params.set("search", inputValue);
      router.push(`/products?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, pathname, router, searchParamsString]);

  return { inputValue, setInputValue };
}
