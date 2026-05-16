// components/product-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "./type";


interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-2xl"
    >
      <div className="relative h-64 overflow-hidden bg-neutral-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL_BACKEND}${product.images[0]}`}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            {product.category}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-neutral-900">
          {product.name}
        </h3>

        <p className="line-clamp-3 text-sm leading-7 text-neutral-600">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-extrabold text-purple-700">
            {product.price.toLocaleString()}
            <span className="mr-1 text-sm font-medium">تومان</span>
          </span>

          <span className="text-sm text-neutral-500">
            موجودی: {product.stock}
          </span>
        </div>
      </div>
    </Link>
  );
}
