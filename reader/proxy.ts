import { type NextRequest, NextResponse } from "next/server";
import { findChapter, getSeries } from "@/lib/series";

// Under cacheComponents, an unknown /series/[slug] or /series/[slug]/[chapter] streams its
// not-found with a 200 on the first request (dynamicParams is unavailable). The slugs and chapter
// numbers are known up front, so an unknown one is rewritten here to a path no route matches: Next
// renders app/not-found.tsx with a real 404, and the address bar keeps the requested URL.
export function proxy(request: NextRequest) {
  const [, , slug, chapter] = request.nextUrl.pathname.split("/");
  const series = slug ? getSeries(slug) : undefined;
  if (slug && (!series || (chapter && !findChapter(series, chapter)))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/series/:slug/:path*",
};
