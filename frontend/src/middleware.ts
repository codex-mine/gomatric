import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that strictly require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/profile",
  "/settings",
  "/my-bookings",
];

// Guest-only auth routes that should not be accessible once logged in
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = !!(accessToken || refreshToken);

  // Check if current path starts with any protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if current path is a guest-only auth route
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If unauthenticated user tries to access a protected route
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login/register/forgot-password/reset-password
  if (isAuthRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    // Ensure redirectParam is a safe relative path to prevent open redirect vulnerabilities
    const isValidRedirect =
      redirectParam &&
      redirectParam.startsWith("/") &&
      !redirectParam.startsWith("//") &&
      !AUTH_ROUTES.some((route) => redirectParam === route || redirectParam.startsWith(`${route}/`));

    const targetUrl = new URL(isValidRedirect ? redirectParam : "/dashboard", request.url);
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/my-bookings/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/auth/:path*",
  ],
};