import { NextRequest, NextResponse } from "next/server";

function verifyJwtStructure(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode and validate header
    const header = JSON.parse(atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (header.alg !== "HS256") return false;

    // Decode payload and check expiry + claims
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    );

    if (!payload.exp || payload.exp * 1000 < Date.now()) return false;
    if (!payload.userId || !payload.role || payload.role !== "admin") return false;
    if (!signatureB64 || signatureB64.length < 10) return false;

    // Full cryptographic verification happens in route handlers via jsonwebtoken
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token || !verifyJwtStructure(token)) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      if (token) response.cookies.delete("admin_token");
      return response;
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token || !verifyJwtStructure(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
