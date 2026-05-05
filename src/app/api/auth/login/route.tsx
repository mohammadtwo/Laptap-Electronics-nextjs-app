import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

type LoginReq = {
  email: string;
  password: string;
};

type BackendLoginRes = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    token: string;
    refreshToken: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); 
   
    const backendRes = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res: BackendLoginRes = await backendRes.json();

    if (!backendRes.ok || !res.success || !res.data?.token) {
      return NextResponse.json(
        { success: false, message: res.message || "خطا در ورود" },
        { status: 401 },
      );
    }

    // ===== ساخت توکن محلی =====
    const localSecret = new TextEncoder().encode(process.env.LOCAL_JWT_SECRET);
    const localPayload = {
      userId: res.data.user.id,
      role: res.data.user.role,
    };
    const localToken = await new SignJWT(localPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d") // هماهنگ با maxAge کوکی
      .sign(localSecret);

   
    const response = NextResponse.json(
      {
        success: true,
        data: { user: res.data.user, message: res.message },
      },
      { status: 200 },
    );

    response.cookies.set("token", res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set("refreshToken", res.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    response.cookies.set("localToken", localToken, {
      httpOnly: true, // امن‌تر است، چون در کلاینت نیازی نیست
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // (اختیاری) نقش را جداگانه با httpOnly: false هم می‌توان ذخیره کرد، ولی اکنون از localToken می‌خوانیم
    response.cookies.set("role", res.data.user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 },
    );
  }
}
