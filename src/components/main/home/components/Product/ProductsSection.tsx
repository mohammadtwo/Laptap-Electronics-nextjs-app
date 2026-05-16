// components/products-section.tsx
import Link from "next/link";
import { getProducts } from "../../hook/getProducts";
import ProductCard from "./ProductCard";

export default async function ProductsSection() {
  const products = await getProducts();

  return (
    <section className="bg-neutral-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="mb-3 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              محصولات ویژه
            </span>

            <h2 className="mb-4 text-4xl font-black text-neutral-950">
              جدیدترین مک‌بوک‌های اپل
            </h2>

            <p className="text-lg leading-8 text-neutral-600">
              مجموعه‌ای از جدیدترین مدل‌های MacBook Air و MacBook Pro مناسب
              برنامه‌نویسی، طراحی، تدوین و استفاده حرفه‌ای.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-700 md:inline-flex"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}
