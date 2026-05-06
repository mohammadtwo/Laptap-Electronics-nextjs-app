import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";


type RefreshRes = {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "refreshToken الزامی است" },
        { status: 400 },
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const refreshRes = await fetch(`${backendUrl}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const res: RefreshRes = await refreshRes.json();
    if (!refreshRes.ok || !res.success || !res.data?.token) {
      return NextResponse.json(
        { success: false, message: res.message || "رفرش ناموفق" },
        { status: 401 },
      );
    }

    const newToken = res.data.token;

    // برای ساخت توکن محلی، نیاز به اطلاعات کاربر داریم.
    // بهترین راه: یک درخواست به بک‌اند برای گرفتن user (با توکن جدید)
    const userRes = await fetch(`${backendUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    const userData = await userRes.json();
    if (!userRes.ok || !userData.success) {
      // اگر نتوانستیم اطلاعات کاربر را بگیریم، شاید بهتر است لاگین را الزام کنیم
      return NextResponse.json(
        { success: false, message: "خطا در دریافت اطلاعات کاربر" },
        { status: 401 },
      );
    }

    const user = userData.data;

    // ساخت توکن محلی جدید
    const localSecret = new TextEncoder().encode(process.env.LOCAL_JWT_SECRET);
    const localPayload = { userId: user._id, role: user.role };
    const localToken = await new SignJWT(localPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(Number(process.env.JWT_EXPIRE_LOCAL_TOKEN))
      .sign(localSecret);

    const response = NextResponse.json({ success: true });

    // به‌روزرسانی کوکی‌ها
    response.cookies.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(process.env.JWT_EXPIRE_ACCESS_TOKEN),
      path: "/",
    });

    if (res.data.refreshToken) {
      response.cookies.set("refreshToken", res.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: Number(process.env.JWT_EXPIRE_REFRESH_TOKEN),
        path: "/",
      });
    }

    response.cookies.set("localToken", localToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(process.env.JWT_EXPIRE_LOCAL_TOKEN),
      path: "/",
    });

    response.cookies.set("role", user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(process.env.JWT_EXPIRE_LOCAL_TOKEN),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در رفرش توکن" },
      { status: 500 },
    );
  }
}
