import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "clave-secreta-dev";
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

//
const protectedRoutes = ["/shop/checkout", "/admin", "/profile", "/account"];
const publicAuthRoutes = ["/auth", "/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ✅ Si el usuario está logueado e intenta entrar a una ruta pública de autenticación → redirigir al home
  if (token && publicAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Si la ruta no está protegida → dejar pasar
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ❌ Si no hay token → redirigir al login
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Verificar token y redirigir según el rol
  try {
    const { payload } = await jwtVerify(token, ENCODED_KEY);
    const role = payload.role;

    // ❌ Usuario sin permisos para /admin
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ❌ Usuario admin no debería entrar a /account (o sección cliente)
    if (pathname.startsWith("/profile/account") && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("❌ Token inválido:", err);
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
