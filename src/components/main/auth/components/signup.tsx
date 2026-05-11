"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation"; // اضافه شده

// اسکیما (بدون تغییر)
const signupSchema = z
  .object({
    name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
    email: z.string().email("ایمیل وارد شده معتبر نیست"),
    phone: z
      .string()
      .regex(/^09\d{9}$/, "شماره تماس باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تایید آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const RegistrationForm = () => {
  const router = useRouter(); // اضافه شده
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted:", data);
    // منطق ارسال به سرور
  };

  // تابع تغییر وضعیت به لاگین
  const goToLogin = () => {
    router.push("/auth?status=login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4 dir-rtl text-right">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
          ایجاد حساب کاربری
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* فیلدها (بدون تغییر) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              نام و نام خانوادگی
            </label>
            <input
              {...register("name")}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition
                ${errors.name ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"}`}
              placeholder="علی احمدی"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              ایمیل
            </label>
            <input
              {...register("email")}
              type="email"
              className={`w-full px-4 py-2 border rounded-lg outline-none transition
                ${errors.email ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"}`}
              placeholder="ali@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              شماره تماس
            </label>
            <input
              {...register("phone")}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition
                ${errors.phone ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"}`}
              placeholder="09123456789"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              رمز عبور
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-2 border rounded-lg outline-none transition
                ${errors.password ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"}`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              تایید رمز عبور
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`w-full px-4 py-2 border rounded-lg outline-none transition
                ${errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"}`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? "در حال ثبت..." : "تکمیل ثبت‌نام"}
          </button>
        </form>

        {/* دکمه تغییر به لاگین */}
        <div className="mt-6 text-center">
          <button
            onClick={goToLogin}
            className="text-sm text-purple-600 hover:text-purple-800 transition"
          >
            قبلاً حساب کاربری دارید؟ وارد شوید
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
