"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type ProductStatus = "active" | "inactive" | "draft";

type Product = {
  id: string;
  image: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  status: ProductStatus;
};

type SortOption =
  | "default"
  | "name"
  | "brand"
  | "category"
  | "quantity"
  | "price-asc"
  | "price-desc";

export default function EditableProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.API_URL}/api/products?page=1&limit=10`,
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleChange = (
    id: string,
    field: keyof Product,
    value: string | number,
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  };

  const handleSave = async () => {
    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });

      alert("تغییرات با موفقیت ثبت شد ✅");
    } catch (error) {
      console.error(error);
      alert("خطا در ثبت تغییرات ❌");
    }
  };

  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "inactive":
        return "text-red-600";
      default:
        return "text-neutral-500";
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((product) =>
        [
          product.name,
          product.brand,
          product.category,
          product.id,
          String(product.quantity),
          String(product.price),
        ].some((value) => value.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      case "brand":
        result.sort((a, b) => a.brand.localeCompare(b.brand, "fa"));
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category, "fa"));
        break;
      case "quantity":
        result.sort((a, b) => a.quantity - b.quantity);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, search, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search, sortBy, itemsPerPage]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-500">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* ابزارها */}
      <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          {/* سرچ */}
          <div className="w-full md:max-w-sm">
            <input
              type="text"
              placeholder="جستجو بر اساس نام، برند، دسته‌بندی، قیمت، تعداد..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-purple-500 focus:bg-white"
            />
          </div>

          {/* سورت / فیلتر */}
          <div className="w-full md:w-64">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-purple-500 focus:bg-white"
            >
              <option value="default">مرتب‌سازی پیش‌فرض</option>
              <option value="name">بر اساس نام محصول</option>
              <option value="brand">بر اساس برند</option>
              <option value="category">بر اساس دسته‌بندی</option>
              <option value="quantity">بر اساس تعداد</option>
              <option value="price-asc">قیمت: کم به زیاد</option>
              <option value="price-desc">قیمت: زیاد به کم</option>
            </select>
          </div>
        </div>

        {/* تعداد نمایش */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-sm text-neutral-600 whitespace-nowrap">
            تعداد نمایش:
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 outline-none transition focus:border-purple-500 focus:bg-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* جدول */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1200px] rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr className="text-neutral-700">
                <th className="px-4 py-3 font-medium">محصول</th>
                <th className="px-4 py-3 font-medium">نام محصول</th>
                <th className="px-4 py-3 font-medium">برند</th>
                <th className="px-4 py-3 font-medium">دسته‌بندی</th>
                <th className="px-4 py-3 font-medium">قیمت</th>
                <th className="px-4 py-3 font-medium">تعداد</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const isOutOfStock = product.quantity === 0;

                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-neutral-100 transition ${
                        isOutOfStock ? "opacity-40" : "hover:bg-neutral-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-neutral-500">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          value={product.name}
                          onChange={(e) =>
                            handleChange(product.id, "name", e.target.value)
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          value={product.brand}
                          onChange={(e) =>
                            handleChange(product.id, "brand", e.target.value)
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          value={product.category}
                          onChange={(e) =>
                            handleChange(product.id, "category", e.target.value)
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "price",
                              Number(e.target.value),
                            )
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "quantity",
                              Number(e.target.value),
                            )
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={product.status}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "status",
                              e.target.value as ProductStatus,
                            )
                          }
                          className={`bg-transparent outline-none border-none focus:ring-0 ${getStatusColor(
                            product.status,
                          )}`}
                        >
                          <option value="active">فعال</option>
                          <option value="inactive">غیرفعال</option>
                          <option value="draft">پیش‌نویس</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-neutral-500"
                  >
                    محصولی پیدا نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* فوتر جدول */}
          <div className="flex flex-col gap-4 border-t border-neutral-200 p-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-neutral-500">
              نمایش{" "}
              <span className="font-medium text-neutral-700">
                {filteredAndSortedProducts.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              تا{" "}
              <span className="font-medium text-neutral-700">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedProducts.length,
                )}
              </span>{" "}
              از{" "}
              <span className="font-medium text-neutral-700">
                {filteredAndSortedProducts.length}
              </span>{" "}
              محصول
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                قبلی
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-xl px-4 py-2 text-sm transition ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                بعدی
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                ثبت تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
