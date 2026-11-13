import { NextResponse } from "next/server";
import checkAdminLogin from "./lib/adminLogin";
import checkLoginUser from "./lib/checkLoginUser";

export async function proxy(request) {
  const url = request.nextUrl.pathname;

  // Login pages ko check se bahar rakho warna loop lagega
  if (url === "/login" || url === "/admin-login") {
    return NextResponse.next();
  }

  const admin = await checkAdminLogin(request);
  const user = await checkLoginUser(request);

  const userExcluded = ["/checkout", "/profile", "/cart"];

  // Sirf exact nahi, /checkout/123 jaisa bhi pakarna hai
  const needUserLogin = userExcluded.some(
    (path) => url === path || url.startsWith(path + "/"),
  );

  if (needUserLogin && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (url.startsWith("/admin") && !admin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/cart/:path*",
  ],
};
