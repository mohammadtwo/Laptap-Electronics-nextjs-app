"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/getProducts";
import CategoryBar from "./CategoryBar";
import FilterSidebar from "./FilterSidebar";
import MobileFilter from "./MobileFilter";
import ProductGrid from "./ProductGrid";

import { Product } from "@/components/admin/orders/types/type";
import { ApiResponse, Param } from "@/types/types";



export default function ProductsPage({
  category,
  brand,
  search,
  page = "1",
}: Param) {
  const [products, setProducts] = useState<ApiResponse<Product> | null>(null);
  const limit = "9";

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts({
        category,
        brand,
        search,
        page,
        limit,
      });

      setProducts(data);
    };

    fetchProducts();
  }, [category, brand, search, page]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <CategoryBar />

        <div className="mt-6 flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <MobileFilter />
            </div>

            {products && (
              <>
                <ProductGrid products={products.data} />

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                  {Array.from({ length: products.pages }).map((_, i) => (
                    <a
                      key={i}
                      href={`?page=${i + 1}${
                        search ? `&search=${search}` : ""
                      }${brand ? `&brand=${brand}` : ""}${
                        category ? `&category=${category}` : ""
                      }`}
                      className={`px-4 py-2 rounded ${
                        Number(page) === i + 1
                          ? "bg-purple-500 text-white"
                          : "border"
                      }`}
                    >
                      {i + 1}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
