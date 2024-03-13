import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const role = cookieStore.get('role')
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }if(request.nextUrl.pathname.startsWith('/agency')){
  if(request.nextUrl.pathname.startsWith('/agency')) {
    if(!role || role.value!=='agency'){
      return NextResponse.rewrite(new URL('/auth', request.url))
    }
  }
  if(request.nextUrl.pathname.startsWith('/tourist/tours/join/') 
  || request.nextUrl.pathname.startsWith('/tourist/tours/member/')){
    if(!role || role.value!=='tourist'){
      return NextResponse.rewrite(new URL('/auth', request.url))
    }
  }
}

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
