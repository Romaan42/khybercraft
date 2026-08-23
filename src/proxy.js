import { NextResponse } from "next/server";
import checkAdminLogin from "./lib/adminLogin";
import checkLoginUser from "./lib/checkLoginUser";

export async function proxy(request) {
  const url = await request.nextUrl.pathname;
  const admin = await checkAdminLogin();
  const user = await checkLoginUser();

  if ((url === "/checkout" || url === "/profile") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (url.startsWith("/admin") && !admin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout", "/profile"],
};
