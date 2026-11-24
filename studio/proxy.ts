import { NextResponse, type NextRequest } from "next/server";
import { ONBOARDING_COOKIE, SESSION_COOKIE } from "@/lib/session";

// Fake auth routing on two flag cookies:
// - /app/* and /welcome need the session; without it, back to the login page.
// - /login and /signup with a session go to the dashboard instead.
// - /app with the first-run flag still set goes to /welcome (once, until finished or skipped).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.has(SESSION_COOKIE);
  const to = (path: string) => NextResponse.redirect(new URL(path, request.url));

  if (pathname === "/login" || pathname === "/signup") {
    return signedIn ? to("/app") : NextResponse.next();
  }
  if (!signedIn) return to("/login");
  if (pathname === "/app" && request.cookies.has(ONBOARDING_COOKIE)) return to("/welcome");
  return NextResponse.next();
}

export const config = {
  matcher: ["/app", "/app/:path*", "/welcome", "/login", "/signup"],
};
