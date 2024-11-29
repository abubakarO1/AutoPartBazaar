import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";




export async function middleware(req) {
  // Extract token (session) from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the restricted route
  const restrictedPath = "/pages/home";

  if (req.nextUrl.pathname === restrictedPath) {
    // If no token, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/pages/login", req.url));
    }
  }

  // Allow request to continue if authenticated or not accessing restricted route
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/pages/home"], // List of routes to protect
};


