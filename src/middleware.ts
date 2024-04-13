import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request) {
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
    const role = request.nextauth.token.role;
    if (request.nextUrl.pathname.startsWith("/admin/") && role !== "Admin") {
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
    if (
      (request.nextUrl.pathname.startsWith("/agency/") ||
        request.nextUrl.pathname.startsWith("/tourist/tours/member/")) &&
      role !== "Agency"
    ) {
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/tourist/tours/join/") &&
      role !== "Tourist"
    ) {
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
  },
  {
    pages: {
      signIn: "/auth",
      error: "/error",
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/agency/:path*",

    // "/signup/agency/:path*",
    // "/signup/tourist/:path*",

    "/tourist/tours/join/:path*",
    "/tourist/tours/member/:path*",
    "/admin/:path*",
  ],
};
