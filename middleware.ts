import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/test", "/results", "/skills", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((p) =>
    pathname === p || pathname.startsWith(p + "/")
  );

  if (!isProtected) {
    return NextResponse.next();
  }

<<<<<<< HEAD
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    const url = new URL("/", request.url);
=======
  const jwtToken = request.cookies.get("auth-token")?.value;
  const nextAuthToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!jwtToken && !nextAuthToken) {
    const url = new URL("/login", request.url);
>>>>>>> 8da0f92bf37dff5380fe813b327ca2169fa89efd
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/test/:path*", "/results/:path*", "/skills/:path*", "/profile/:path*"],
};
