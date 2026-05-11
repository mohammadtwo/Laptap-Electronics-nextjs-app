import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export  async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const protectedAdminRoutes = ["/admin", "/admin/profile"];
  const protectedUserRoutes = ["/profile", "/cart", "/checkout"];
  const publicRoute = [
    "/admin/auth",
    "/auth",
    "/api/auth/refresh",
    "/api/auth/login",
  ];
  if (publicRoute.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  const isAdminRoute = protectedAdminRoutes.some((route) =>
    path.startsWith(route),
  );
  const isUserRoute = protectedUserRoutes.some((route) =>
    path.startsWith(route),
  );
  const isProtected = isAdminRoute || isUserRoute;

  const localToken = req.cookies.get("localToken")?.value;

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
      return redirectToLogin(isAdminRoute, req.url);
    }
  }

  return NextResponse.next();
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
