import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuth = !!token;
  const isAdmin = token?.role === "ADMIN";

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return null;
  }

  if (isAdminPage) {
    if (!isAuth) {
      let from = request.nextUrl.pathname;
      if (request.nextUrl.search) {
        from += request.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
      );
    }
    
    // Optional: Restricted admin only
    if (!isAdmin) {
       return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return null;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
