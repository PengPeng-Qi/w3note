import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 定义路由类型
const publicRoutes = ["/login", "/register", "/api/auth"];
const authRoutes = ["/login", "/register"]; // 已登录用户不能访问的路由

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 处理根路径
    if (pathname === "/") {
      if (token) {
        return NextResponse.redirect(new URL("/notes/center", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 如果已登录且试图访问登录页面，重定向到首页
    if (token && authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/notes/center", request.url));
    }

    // 如果未登录且访问需要认证的页面，重定向到登录
    if (!token && !publicRoutes.some((route) => pathname.startsWith(route))) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next|.*\\.).*)"],
};
