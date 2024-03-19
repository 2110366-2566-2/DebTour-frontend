import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    // console.log(request.nextauth.token)
    if(!request.nextauth.token){
      return NextResponse.rewrite(new URL('/auth', request.url))
    }

    const role = request.nextauth.token.role
    // console.log(role)

    if(request.nextUrl.pathname.startsWith('/agency/')
      || request.nextUrl.pathname.startsWith('/tourist/tours/member/')) {
      if(role !== 'Agency'){
        return NextResponse.rewrite(new URL('/auth', request.url))
      }
    }

    if(request.nextUrl.pathname.startsWith('/tourist/tours/join/')) {
      if(role !== 'Tourist'){
        return NextResponse.rewrite(new URL('/auth', request.url))
      }
    }
  },
  {
    // callbacks: {
    //   authorized: ({ token }) => token?.role === "admin",
    // },
    pages: {
      signIn: '/auth',
      error: '/error',
  },
  }
)
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/agency/:path*",
    // "/signup/agency/:path*",
    // "/signup/tourist/:path*",
    "/tourist/tours/join/:path*",
    "/tourist/tours/member/:path*",
],
};
