// components/amazing/AmazingHeader.tsx

import Logo from "@/components/shared/logo";


export default function AmazingHeader() {
  return (
    <div className="flex flex-col justify-between items-center min-w-65 px-6 py-8 text-center">
      <Logo />

      <div>
        <h2 className="text-white text-3xl font-black">پیشنهاد ویژه</h2>

        <p className="text-neutral-200 text-sm mt-2">تخفیف‌های محدود</p>
      </div>

      <button className="bg-white text-purple-700 font-bold px-5 py-2 rounded-xl mt-6">
        مشاهده همه
      </button>
    </div>
  );
}
