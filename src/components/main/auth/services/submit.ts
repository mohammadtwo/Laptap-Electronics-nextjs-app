import { toast } from "react-toastify";
import { LoginForm } from "../components/login";


export async function SubmitForm(data: LoginForm) {
  try {
    await postData(data);

    toast.success("ورود با موفقیت انجام شد");
    return true
  } catch (error: unknown) {
    let errorMessage = "مشکلی در ارتباط با سرور پیش آمد";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.log(error);
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    toast.error(errorMessage);
    
  }
}

export async function postData(data: LoginForm) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "ورود ناموفق بود");
  }
  return result;
}