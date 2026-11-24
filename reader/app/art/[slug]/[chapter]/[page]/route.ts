import { pageArt } from "@/lib/pages";
import { findChapter, getSeries } from "@/lib/series";

// One chapter page as an SVG image. Pages are drawn from their address, so a page never changes
// and can be cached for good.
export async function GET(
  _request: Request,
  { params }: RouteContext<"/art/[slug]/[chapter]/[page]">,
) {
  const { slug, chapter: segment, page: number } = await params;
  const series = getSeries(slug);
  const chapter = series && findChapter(series, segment);
  const page = Number(number);
  if (!series || !chapter || String(page) !== number || page < 1 || page > chapter.pages) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(pageArt({ series, chapter, page: page - 1 }), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
