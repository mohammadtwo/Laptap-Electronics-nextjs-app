"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

type ProductStatus = "active" | "inactive";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  brand: string;
  rating: number;
  numReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Product[];
}

export default function EditableProductsTable({
  page: initialPage = 1,
}: {
  page?: number;
}) {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // --- فیلترها ---
  const [search, setSearch] = useState(""); // مقدار لحظه‌ای در input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // مقدار با تأخیر برای ارسال درخواست
  const [category, setCategory] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 🟢 Debounce برای search: هر بار search تغییر کند، تایمر ۳ ثانیه تنظیم می‌شود
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 3000); // 3 ثانیه

    return () => clearTimeout(timer);
  }, [search]);

  // 🟢 واکشی دیتا از بک‌اند – فقط به debouncedSearch وابسته است (نه search لحظه‌ای)
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", itemsPerPage.toString());
        if (debouncedSearch.trim())
          params.append("search", debouncedSearch.trim());
        if (category.trim()) params.append("category", category.trim());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pro/products?${params.toString()}`,
        );
        const data: ApiResponse = await res.json();
        setApiResponse(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage, itemsPerPage, debouncedSearch, category]); // وابستگی‌ها

  // وقتی فیلترهای دسته‌بندی یا جستجو (با تأخیر) عوض شد‌اند، صفحه به اول برگردد
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  const productsList = apiResponse?.data ?? [];
  const totalPages = apiResponse?.pages ?? 0;
  const totalItems = apiResponse?.total ?? 0;

  // اگر صفحه جاری از کل صفحات بیشتر شد، اصلاح کن
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // توابع ویرایش
  const handleChange = useCallback(
    (id: string, field: keyof Product, value: string | number | boolean) => {
      if (!apiResponse) return;
      const updatedData = apiResponse.data.map((product) =>
        product._id === id ? { ...product, [field]: value } : product,
      );
      setApiResponse({ ...apiResponse, data: updatedData });
    },
    [apiResponse],
  );

  const getStatusFromProduct = (product: Product): ProductStatus =>
    product.isActive ? "active" : "inactive";

  const getIsActiveFromStatus = (status: ProductStatus): boolean =>
    status === "active";

const handleSave = useCallback(async () => {
  if (!apiResponse) return;
  const promises = apiResponse.data.map((product) =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pro/products/${product._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      },
    ),
  );
  try {
    const results = await Promise.all(promises);
    if (results.every((res) => res.ok)) {
      toast.success("تمامی تغییرات با موفقیت ثبت شد ✅");
    } else {
      toast.error("بعضی از تغییرات با خطا مواجه شد ❌");
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("خطا در ثبت تغییرات ❌");
  }
}, [apiResponse]);

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

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-900">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  const startItem =
    productsList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full space-y-4">
      {/* نوار ابزار */}
      <div className="flex flex-col gap-3 rounded-2xl container mx-auto max-w-300 px-4 border border-neutral-200 bg-neutral-50 p-4 md:flex-row md:items-center md:justify-between">
        {/* سمت چپ (جستجو، دسته‌بندی و دکمه افزودن) */}
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:flex-wrap">
          {/* جستجو */}
          <div className="w-full md:max-w-sm">
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا توضیحات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-purple-500"
            />
          </div>

          {/* فیلتر دسته‌بندی */}
          <div className="w-full md:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-purple-500"
            >
              <option value="">همه دسته‌ها</option>
              <option value="الکترونیک">لب تاپ</option>
              <option value="مک بوک">مک بوک</option>
              <option value="هدفون">هدفون</option>
            </select>
          </div>

          {/* دکمه افزودن محصول جدید (کنار دسته‌بندی) */}
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 whitespace-nowrap text-center"
          >
            + افزودن محصول جدید
          </Link>
        </div>

        {/* سمت راست: تعداد نمایش در هر صفحه */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600 whitespace-nowrap">
            تعداد نمایش:
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 outline-none transition focus:border-purple-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* جدول (بدون تغییر) */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-300 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
          <table className="w-full text-right text-sm border-purple-200 border">
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
              {productsList.length > 0 ? (
                productsList.map((product) => {
                  const isOutOfStock = product.stock === 0;
                  const productStatus = getStatusFromProduct(product);
                  return (
                    <tr
                      key={product._id}
                      className={`border-b border-neutral-100 transition ${
                        isOutOfStock ? "opacity-40" : "hover:bg-neutral-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL_BACKEND}${product.images[0]}`}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-neutral-900">
                              ID: {product._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={product.name}
                          onChange={(e) =>
                            handleChange(product._id, "name", e.target.value)
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={product.brand}
                          onChange={(e) =>
                            handleChange(product._id, "brand", e.target.value)
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          value={product.category}
                          onChange={(e) =>
                            handleChange(
                              product._id,
                              "category",
                              e.target.value,
                            )
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
                              product._id,
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
                          value={product.stock}
                          onChange={(e) =>
                            handleChange(
                              product._id,
                              "stock",
                              Number(e.target.value),
                            )
                          }
                          className="w-full bg-transparent text-neutral-800 outline-none border-none focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={productStatus}
                          onChange={(e) =>
                            handleChange(
                              product._id,
                              "isActive",
                              getIsActiveFromStatus(
                                e.target.value as ProductStatus,
                              ),
                            )
                          }
                          className={`bg-transparent outline-none border-none focus:ring-0 ${getStatusColor(
                            productStatus,
                          )}`}
                        >
                          <option value="active">فعال</option>
                          <option value="inactive">غیرفعال</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-neutral-900"
                  >
                    محصولی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* فوتر جدول با پیجینیشن */}
          <div className="flex flex-col gap-4 border-t border-neutral-200 p-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-neutral-900">
              نمایش{" "}
              <span className="font-medium text-neutral-700">{startItem}</span>{" "}
              تا <span className="font-medium text-neutral-700">{endItem}</span>{" "}
              از{" "}
              <span className="font-medium text-neutral-700">{totalItems}</span>{" "}
              محصول
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || totalPages === 0}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                قبلی
              </button>

              {totalPages > 0 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
