
import { Product } from "@/components/admin/orders/types/type";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="
      block overflow-hidden rounded-xl
      border border-neutral-200
      bg-white
      transition hover:shadow-lg
      "
    >
      <div className="relative h-55">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL_BACKEND}${product.images[0]}`}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-neutral-800 line-clamp-1">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 text-purple-600 font-bold text-lg">
          {product.price.toLocaleString("fa-IR")} تومان
        </div>
      </div>
    </Link>
  );
}
