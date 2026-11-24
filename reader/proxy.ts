import { type NextRequest, NextResponse } from "next/server";
import { SERIES } from "@/lib/series";

// Under cacheComponents, an unknown /series/[slug] streams its not-found with a 200 on the first
// request (dynamicParams is unavailable). The slugs are known up front, so an unknown one is
// rewritten here to a path no route matches: Next renders app/not-found.tsx with a real 404, and
// the address bar keeps the requested URL.
const SLUGS = new Set(SERIES.map((series) => series.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !SLUGS.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/series/:slug/:path*",
};
