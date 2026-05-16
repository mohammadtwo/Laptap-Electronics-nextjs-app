// components/categories/CategoryCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Props } from "@/types/types";



export default function CategoryCard({ title, href, image }: Props) {
  return (
    <Link
      href={href}
      className="relative block group rounded-2xl overflow-hidden w-full h-52 sm:h-60 md:h-64 lg:h-72"
    >
      {/* عکس فول کاور */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* لایه تیره گرادیان بنفش */}
      <div className="absolute inset-0 bg-linear-to-t from-purple-800/40 via-purple-700/10 to-purple-600/5" />

      {/* متن وسط کارت */}
      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg">
          {title}
        </h3>
      </div>
    </Link>
  );
}
