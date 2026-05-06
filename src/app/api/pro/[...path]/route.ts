// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const BACKEND_URL = process.env.API_URL as string;

interface RefreshResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken?: string;
    user?: {
      id: string;
      role: string;
    };
  };
  message?: string;
}

type BackendResponse = Record<string, unknown>;

function buildBackendPath(
  pathSegments: string[],
  searchParams: string,
): string {
  const basePath = `/${pathSegments.join("/")}`;
  return `${basePath}${searchParams}`;
}

type ProxyRequestBody =
  | ReadableStream<Uint8Array>
  | FormData
  | string
  | null
  | undefined;

interface PendingCookies {
  token?: { value: string; maxAge: number };
  refreshToken?: { value: string; maxAge: number };
  localToken?: { value: string; maxAge: number };
  role?: { value: string; maxAge: number };
}

async function proxyRequest(
  req: NextRequest,
  backendPath: string,
  method: string,
  body?: ProxyRequestBody,
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const existingRole = cookieStore.get("role")?.value; // نقش فعلی از کوکی
  const existingLocalToken = cookieStore.get("localToken")?.value;

  const pendingCookies: PendingCookies = {};

  const sendToBackend = async (token?: string): Promise<Response> => {
    const headers = new Headers();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const isFormData = body instanceof FormData;
    if (!isFormData && body != null && body !== "") {
      headers.set("Content-Type", "application/json");
    }

    let requestBody: BodyInit | null = null;
    if (body != null) {
      if (isFormData) requestBody = body as FormData;
      else if (typeof body === "string") requestBody = body;
      else if (body instanceof ReadableStream) requestBody = body;
      else requestBody = JSON.stringify(body);
    }

    return fetch(`${BACKEND_URL}${backendPath}`, {
      method,
      headers,
      body: requestBody,
    });
  };

  let response = await sendToBackend(accessToken);

  if (response.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = (await refreshRes.json()) as RefreshResponse;

    if (refreshRes.ok && refreshData.success && refreshData.data?.token) {
      const newAccessToken = refreshData.data.token;
      const newRefreshToken = refreshData.data.refreshToken;

      pendingCookies.token = {
        value: newAccessToken,
        maxAge: Number(process.env.JWT_EXPIRE_ACCESS_TOKEN) || 60,
      };
      if (newRefreshToken) {
        pendingCookies.refreshToken = {
          value: newRefreshToken,
          maxAge:
            Number(process.env.JWT_EXPIRE_REFRESH_TOKEN) || 30 * 24 * 60 * 60,
        };
      }

      // ===== ساخت localToken =====
      let userId: string | undefined;
      let role: string | undefined;

      // اولویت 1: از پاسخ refresh (اگر user را برگرداند)
      if (refreshData.data?.user?.id && refreshData.data?.user?.role) {
        userId = refreshData.data.user.id;
        role = refreshData.data.user.role;
      } else {
        // اولویت 2: از کوکی role موجود
        role = existingRole;
        // اولویت 3: از localToken قبلی (اگر هنوز معتبر است)
        if (!userId && existingLocalToken) {
          try {
            const keySecret = process.env.LOCAL_JWT_SECRET;

            const secret = new TextEncoder().encode(keySecret);
            const { payload } = await jwtVerify(existingLocalToken, secret);
            userId = payload.userId as string;
            if (!role) role = payload.role as string;
          } catch {}
        }
      }

      if (userId && role) {
        const keySecret = process.env.LOCAL_JWT_SECRET;

        const localSecret = new TextEncoder().encode(keySecret);
        const localPayload = { userId, role };
        const newLocalToken = await new SignJWT(localPayload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime(Number(process.env.JWT_EXPIRE_LOCAL_TOKEN))
          .sign(localSecret);

        pendingCookies.localToken = {
          value: newLocalToken,
          maxAge: Number(process.env.JWT_EXPIRE_LOCAL_TOKEN),
        };
        pendingCookies.role = {
          value: role,
          maxAge: Number(process.env.JWT_EXPIRE_LOCAL_TOKEN),
        };
      }

      response = await sendToBackend(newAccessToken);
    } else {
      const logoutRes = NextResponse.json(
        { message: "لطفاً دوباره وارد شوید" },
        { status: 401 },
      );
      logoutRes.cookies.delete("token");
      logoutRes.cookies.delete("refreshToken");
      logoutRes.cookies.delete("localToken");
      logoutRes.cookies.delete("role");
      return logoutRes;
    }
  }

  if (response.status === 401) {
    const logoutRes = NextResponse.json(
      { message: "نشست منقضی شده است" },
      { status: 401 },
    );
    logoutRes.cookies.delete("token");
    logoutRes.cookies.delete("refreshToken");
    logoutRes.cookies.delete("localToken");
    logoutRes.cookies.delete("role");
    return logoutRes;
  }

  const data = (await response.json()) as BackendResponse;
  const finalRes = NextResponse.json(data, { status: response.status });

  // ست کردن کوکی‌های جدید (هر کدام که وجود دارد)
  if (pendingCookies.token) {
    finalRes.cookies.set("token", pendingCookies.token.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: pendingCookies.token.maxAge,
      path: "/",
    });
  }
  if (pendingCookies.refreshToken) {
    finalRes.cookies.set("refreshToken", pendingCookies.refreshToken.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: pendingCookies.refreshToken.maxAge,
      path: "/",
    });
  }
  if (pendingCookies.localToken) {
    finalRes.cookies.set("localToken", pendingCookies.localToken.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: pendingCookies.localToken.maxAge,
      path: "/",
    });
  }
  if (pendingCookies.role) {
    finalRes.cookies.set("role", pendingCookies.role.value, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: pendingCookies.role.maxAge,
      path: "/",
    });
  }

  return finalRes;
}

// هندلرهای GET, POST, PUT, DELETE به همان شکل قبل باقی می‌مانند
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = buildBackendPath(path, req.nextUrl.search);
  return proxyRequest(req, backendPath, "GET");
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = buildBackendPath(path, req.nextUrl.search);
  let body: ProxyRequestBody;
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) body = await req.formData();
  else if (contentType.includes("application/json"))
    body = (await req.json()) as unknown as ProxyRequestBody;
  else body = await req.text();
  return proxyRequest(req, backendPath, "POST", body);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = buildBackendPath(path, req.nextUrl.search);
  let body: ProxyRequestBody = null;
  try {
    body = (await req.json()) as unknown as ProxyRequestBody;
  } catch {}
  return proxyRequest(req, backendPath, "PUT", body);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await params;
  const backendPath = buildBackendPath(path, req.nextUrl.search);
  return proxyRequest(req, backendPath, "DELETE");
}
