import Link from "next/link";

export default function MoreCard() {
  return (
    <Link
      href="/products"
      className="bg-white rounded-2xl p-3 w-full h-full flex flex-col"
    >
      {/* بخش تصویر */}
      <div className=" w-full h-45 flex items-center justify-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-700">
          <svg
            className="w-7 h-7 rotate-y-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5-5 5M6 7l5 5-5 5"
            />
          </svg>
        </div>
      </div>

      {/* عنوان */}
      <h3 className="text-sm text-neutral-700 mt-3 text-center line-clamp-2">
        مشاهده بیشتر
      </h3>

      {/* این قسمت باعث می‌شود ارتفاع کارت پر شود */}
      <div className="flex-1" />

      {/* پایین کارت */}
      <div className="flex justify-center items-center mt-4">
        <span className="font-bold text-purple-700 text-sm">همه محصولات</span>
      </div>
    </Link>
  );
}
