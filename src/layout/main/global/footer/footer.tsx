import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Info */}
          <div className="text-center lg:text-right max-w-md">
            <h2 className="text-2xl font-bold text-purple-400">
              لپ‌تاپ الکترونیک
            </h2>

            <p className="mt-3 text-neutral-400 leading-7">
              فروشگاه تخصصی لپ‌تاپ، قطعات کامپیوتر و تجهیزات دیجیتال با بهترین
              قیمت و ضمانت اصالت کالا
            </p>
          </div>

          {/* Contact */}
          <div className="w-full max-w-md">
            <h3 className="text-lg font-semibold text-neutral-200 text-center lg:text-right mb-3">
              ارتباط با ما
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-neutral-200 outline-none transition focus:border-purple-500"
              />

              <button className="rounded-lg bg-purple-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-600">
                ارسال
              </button>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-neutral-300 text-sm">شبکه‌های اجتماعی</span>

            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800 py-5 text-center text-sm text-neutral-500">
        © 2026 Laptop Electronic — تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
