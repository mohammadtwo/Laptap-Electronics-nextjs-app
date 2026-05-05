import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedAdminRoutes = ["/admin", "/admin/profile"];
const protectedUserRoutes = ["/profile", "/cart", "/checkout"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = [
    "/admin/auth",
    "/auth",
    "/api/auth/refresh",
    "/api/auth/login",
    
  ];
  if (publicRoute.some(route=>path.startsWith(route))) {
    return NextResponse.next();
  }

  const isAdminRoute = protectedAdminRoutes.some((route) =>
    path.startsWith(route),
  );
  const isUserRoute = protectedUserRoutes.some((route) =>
    path.startsWith(route),
  );
  const isProtected = isAdminRoute || isUserRoute;

  const cookieStore = await cookies();
  const localToken = cookieStore.get("localToken")?.value;

  if (isProtected && !localToken) {
    return redirectToLogin(isAdminRoute, req.url);
  }

  if (localToken) {
    try {
      const secret = new TextEncoder().encode(process.env.LOCAL_JWT_SECRET);
      const { payload } = await jwtVerify(localToken, secret);
      const role = payload.role as string;

      if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/admin/auth", req.url));
      }
      if (isUserRoute && role !== "user") {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Local token invalid:", error);
      const refreshResult = await tryRefreshToken(req);
      if (refreshResult.success) {
        return NextResponse.redirect(req.url);
      } else {
        return redirectToLogin(isAdminRoute, req.url);
      }
    }
  }

  return NextResponse.next();
}

async function tryRefreshToken(
  req: NextRequest,
): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) return { success: false };

    const refreshRes = await fetch(
      new URL("/api/auth/refresh", req.url).toString(),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );
    return { success: refreshRes.ok };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false };
  }
}

function redirectToLogin(isAdminRoute: boolean, currentUrl: string | URL) {
  const response = NextResponse.redirect(
    new URL(isAdminRoute ? "/admin/auth" : "/auth", currentUrl),
  );
  response.cookies.delete("token");
  response.cookies.delete("refreshToken");
  response.cookies.delete("localToken");
  response.cookies.delete("role");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/cart", "/checkout"],
};
