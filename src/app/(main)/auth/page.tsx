import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "@/components/main/auth/components/login";
import RegistrationForm from "@/components/main/auth/components/signup";


interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AuthPage({ searchParams }: PageProps) {
  // 1. خواندن کوکی
  const cookieStore = await cookies();
  const localToken = cookieStore.get("localToken")?.value;


  const { status: queryStatus } = await searchParams;
  const currentStatus =
    queryStatus === "login" || queryStatus === "signup" ? queryStatus : null;


  const hasToken = !!localToken;
  if (hasToken && currentStatus) {
  
    redirect(`/auth?status=${currentStatus}`);
  }
  if (!currentStatus) {
    redirect("/auth?status=signup");
  }

  // اگر وضعیت معتبر است، فرم مناسب را رندر کن
  const showLogin = currentStatus === "login";

  return (
    <div>


      {/* نمایش فرم مناسب */}
      {showLogin ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
}
