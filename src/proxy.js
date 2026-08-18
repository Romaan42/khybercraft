import { NextResponse } from "next/server";
import checkAdminLogin from "./lib/adminLogin";

export async function proxy(request) {
  const url = await request.nextUrl.pathname;
  const admin = await checkAdminLogin();
  if (url.startsWith("/admin") && !admin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
