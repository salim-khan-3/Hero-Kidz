// import { NextResponse } from "next/server";

// const privateRoute = ["/dashboard","/cart","/checkout"]

// export async function proxy(request) {
//     return NextResponse.redirect(new URL("/",request.url))
// }

// export const config = {
//     matcher: ["/dashboard/:path", "/cart/:path","/checkout/:path"]
// };



// src/proxy.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = ["/dashboard", "/cart", "/checkout"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // যদি প্রাইভেট route এবং token না থাকে → login page এ redirect
  if (privateRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// matcher দিয়ে proxy কোন path handle করবে
export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
