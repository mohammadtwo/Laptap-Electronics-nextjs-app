"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

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

// کامپوننت مودال حذف
function DeleteModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-all">
      <div className="w-full max-w-md rounded-2xl bg-neutral-50 shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">حذف محصول</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 rounded-xl overflow-hidden border border-neutral-200">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL_BACKEND}${product.images[0]}`}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-neutral-900">
                {product.name}
              </p>
              <p className="text-sm text-neutral-600 mt-1">
                قیمت: {product.price.toLocaleString()} تومان
              </p>
              <p className="text-sm text-neutral-600">
                موجودی: {product.stock} عدد
              </p>
            </div>
            <p className="text-neutral-700 text-center mt-2">
              آیا از حذف این محصول اطمینان دارید؟
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-4 border-t border-neutral-200 bg-neutral-100">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsTable({
  page: initialPage = 1,
}: {
  page?: number;
}) {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // فیلترها
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // مودال
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({
    isOpen: false,
    product: null,
  });

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 3000);
    return () => clearTimeout(timer);
  }, [search]);

  // واکشی داده‌ها
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
  }, [currentPage, itemsPerPage, debouncedSearch, category]);

  // بازنشانی صفحه به ۱ هنگام تغییر فیلتر
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  const productsList = apiResponse?.data ?? [];
  const totalPages = apiResponse?.pages ?? 0;
  const totalItems = apiResponse?.total ?? 0;

  // اصلاح صفحه اگر از کل صفحات بیشتر شد
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // تابع حذف محصول
  const handleDelete = useCallback(async () => {
    if (!deleteModal.product) return;
    const productId = deleteModal.product._id;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pro/products/${productId}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        toast.success("محصول با موفقیت حذف شد 🗑️");
        // بازخوانی لیست با همان فیلترها و صفحه فعلی
        // با تغییر یک state مجازی، useEffect مجدد فراخوانی می‌شود
        setApiResponse((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: prev.data.filter((p) => p._id !== productId),
            total: prev.total - 1,
            count: prev.count - 1,
          };
        });
        // اگر بعد از حذف، صفحه خالی شد و صفحه > 1، به صفحه قبلی برو
        if (productsList.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("خطا در حذف محصول ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setDeleteModal({ isOpen: false, product: null });
    }
  }, [deleteModal.product, currentPage, productsList.length]);

  const startItem =
    productsList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-900">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      {" "}
      <div className="w-full space-y-4">
        {/* نوار ابزار (فقط جستجو، دسته‌بندی و تعداد نمایش) */}
        <div className="flex flex-col gap-3 rounded-2xl container mx-auto max-w-300 px-4 border border-neutral-200 bg-neutral-50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:flex-wrap">
            <div className="w-full md:max-w-sm">
              <input
                type="text"
                placeholder="جستجو بر اساس نام یا توضیحات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 dark:bg-neutral-300 dark:placeholder:text-neutral-800 px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-purple-500"
              />
            </div>
            <div className="w-full md:w-56">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border dark:bg-neutral-300 dark:text-neutral-900 border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-purple-500"
              >
                <option value="">همه دسته‌ها</option>
                <option value="الکترونیک">لب تاپ</option>
                <option value="مک بوک">مک بوک</option>
                <option value="هدفون">هدفون</option>
              </select>
            </div>
          </div>
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

        {/* جدول محصولات */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-300 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
            <table className="w-full text-right text-sm border-purple-200 border ">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr className="text-neutral-700">
                  <th className="px-4 py-3 font-medium">محصول</th>
                  <th className="px-4 py-3 font-medium">نام محصول</th>
                  <th className="px-4 py-3 font-medium">قیمت (تومان)</th>
                  <th className="px-4 py-3 font-medium">موجودی</th>
                  <th className="px-4 py-3 font-medium">حذف</th>
                </tr>
              </thead>
              <tbody>
                {productsList.length > 0 ? (
                  productsList.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition"
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
                          <div className="text-xs text-neutral-900">
                            ID: {product._id}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-neutral-800">{product.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-neutral-800">
                          {product.price.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-neutral-800">{product.stock}</p>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, product })
                          }
                          className="text-red-500 hover:text-red-700 transition"
                          aria-label="حذف محصول"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-neutral-900"
                    >
                      محصولی یافت نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* فوتر جدول با پیجینیشن (بدون دکمه ذخیره) */}
            <div className="flex flex-col gap-4 border-t border-neutral-200 p-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-neutral-900">
                نمایش{" "}
                <span className="font-medium text-neutral-700">
                  {startItem}
                </span>{" "}
                تا{" "}
                <span className="font-medium text-neutral-700">{endItem}</span>{" "}
                از{" "}
                <span className="font-medium text-neutral-700">
                  {totalItems}
                </span>{" "}
                محصول
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            </div>
          </div>
        </div>

        {/* مودال حذف */}
        {deleteModal.isOpen && deleteModal.product && (
          <DeleteModal
            product={deleteModal.product}
            onClose={() => setDeleteModal({ isOpen: false, product: null })}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
