"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";



type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  
  const router=useRouter()
  const onSubmit = async (data: LoginForm) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <button onClick={()=>router.push("/")}>back</button>
      <div className="w-full max-w-md bg-neutral-50 border border-neutral-200 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-neutral-900 text-center mb-6">
          ورود به حساب
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              ایمیل
            </label>

            <input
              type="email"
              placeholder="ali@example.com"
              className={`w-full px-4 py-2 rounded-lg border outline-none transition 
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"
              } focus:ring-2`}
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "فرمت ایمیل صحیح نیست",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              رمز عبور
            </label>

            <input
              type="password"
              placeholder="******"
              className={`w-full px-4 py-2 rounded-lg border outline-none transition
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-neutral-300 focus:ring-purple-500 focus:border-purple-500"
              } focus:ring-2`}
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* submit */}
          <button
            disabled={isSubmitting}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-lg transition shadow-md disabled:opacity-60"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
