import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "Admin"
    )
      return NextResponse.rewrite(new URL("/login", req.url));
    if (
      req.nextUrl.pathname.startsWith("/users") &&
      req.nextauth.token?.role !== "User"
    )
      return NextResponse.rewrite(new URL("/login", req.url));
    if (
      req.nextUrl.pathname.startsWith("/employee") &&
      req.nextauth.token?.role !== "Employee"
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/users/:path*", "/employee/:path*"],
};