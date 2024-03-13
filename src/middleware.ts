import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const id = cookieStore.get('id')
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
  if(request.nextUrl.pathname.startsWith('/agency')){
    if(!id || id.value!=='agency'){
      return NextResponse.rewrite(new URL('/auth', request.url))
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/agency/:path*",
    "/signup/agency/:path*",
    "/signup/tourist/:path*",
    "/intermediate/:path*",
    "/tourist/tours/join/:path*",
    "/tourist/tours/member/:path*",
],
};
