import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/chapter-reader";
import { ReaderShell } from "@/components/reader-shell";
import { pageAlt } from "@/lib/pages";
import {
  chapterHref,
  findChapter,
  getSeries,
  pageSrc,
  SERIES,
  seriesHref,
  toChapters,
} from "@/lib/series";

// Every chapter is prerendered, so the route opts out of instant-navigation validation and blocks
// on its params. An unknown slug or chapter never reaches it: proxy.ts answers it with a real 404.
export const instant = false;

export function generateStaticParams() {
  return SERIES.flatMap((series) =>
    series.chapters.map((chapter) => ({ slug: series.slug, chapter: String(chapter.number) })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/series/[slug]/[chapter]">): Promise<Metadata> {
  const { slug, chapter: segment } = await params;
  const series = getSeries(slug);
  const chapter = series && findChapter(series, segment);
  if (!series || !chapter) return {};
  return {
    title: `Chapter ${chapter.number}: ${chapter.title} · ${series.title}`,
    description: `Read ${series.title} chapter ${chapter.number}, "${chapter.title}" (${chapter.pages} pages). ${series.tagline}`,
  };
}

export default async function ChapterPage({ params }: PageProps<"/series/[slug]/[chapter]">) {
  const { slug, chapter: segment } = await params;
  const series = getSeries(slug);
  const chapter = series && findChapter(series, segment);
  if (!series || !chapter) notFound();

  const pages = Array.from({ length: chapter.pages }, (_, page) => ({
    src: pageSrc(series, chapter.number, page),
    alt: `Page ${page + 1}. ${pageAlt({ series, chapter, page })}`,
  }));
  const link = (number: number) => {
    const found = series.chapters.find((item) => item.number === number);
    return found && { href: chapterHref(series, number), number, title: found.title };
  };

  return (
    <ReaderShell
      crumbs={[
        { label: "Library", href: "/" },
        { label: series.title, href: seriesHref(series) },
        { label: `Chapter ${chapter.number}` },
      ]}
    >
      <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col px-4 pt-2 pb-12 md:px-8">
        {/* key: a new chapter opens at its first page. */}
        <ChapterReader
          key={chapter.number}
          series={series.title}
          seriesHref={seriesHref(series)}
          chapter={{ number: chapter.number, title: chapter.title }}
          pages={pages}
          chapters={toChapters(series)}
          previous={link(chapter.number - 1)}
          next={link(chapter.number + 1)}
          complete={series.status === "completed"}
        />
      </div>
    </ReaderShell>
  );
}
