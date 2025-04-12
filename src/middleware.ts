import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.url.includes("/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/config", "/calendar", "/dashboards", "/"],
};
