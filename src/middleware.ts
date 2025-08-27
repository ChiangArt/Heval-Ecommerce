import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { logError } from "./app/utils/logger";

const SECRET_KEY = process.env.APP_JWT_SECRET || "clave-secreta-dev";
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

//
const protectedRoutes = ["/shop/checkout", "/admin", "/profile", "/account"];
const publicAuthRoutes = ["/auth", "/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (token && publicAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, ENCODED_KEY);
    const role = payload.role;

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/profile/account") && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    logError("❌ Token inválido:", err);
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("error", "invalid_token");
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/shop/checkout/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/account/:path*",
    "/auth/:path*",

  ],
};
