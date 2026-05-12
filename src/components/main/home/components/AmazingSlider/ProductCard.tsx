import Image from "next/image";
import { Product } from "./type";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      className="bg-white rounded-2xl p-3 w-full h-full flex flex-col
"
    >
      <div className="relative w-full h-45">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_API_URL_BACKEND}${product.images?.[0]}` ||
            "/placeholder.png"
          }
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-sm text-neutral-700 line-clamp-2 mt-3">
        {product.name}
      </h3>

      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-neutral-900">
          {product.price.toLocaleString("fa-IR")} تومان
        </span>
      </div>
    </div>
  );
}
