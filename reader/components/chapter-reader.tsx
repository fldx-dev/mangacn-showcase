"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useSyncExternalStore } from "react";
import type { Chapter } from "@/components/blocks/chapter-list/chapter-list";
import { Reader, type ReaderChapter, type ReaderUrl, useReader } from "@/components/blocks/reader/reader";
import type { SpreadPage } from "@/components/blocks/spread-viewer/spread-viewer";
import { spreadIndexOf, spreadStarts } from "@/components/blocks/spread-viewer/use-spread";
import { Panel } from "@/components/panel";
import { SfxText } from "@/components/sfx-text";
import { SpeechBubble } from "@/components/speech-bubble";
import { Button } from "@/components/ui/button";

interface ChapterLink {
  href: string;
  number: number;
  title: string;
}

export interface ChapterReaderProps {
  series: string;
  seriesHref: string;
  chapter: ReaderChapter;
  pages: SpreadPage[];
  chapters: Chapter[];
  previous?: ChapterLink;
  next?: ChapterLink;
  /** The series has ended: its last chapter's end card says so. */
  complete?: boolean;
}

// Inkwell reads like a manga: right to left, Left arrow (and the left half of the page) is next.
const DIRECTION = "rtl";

// Phones get one page at a time. The server cannot know the width, so it renders the single page
// (the smaller layout) and a desktop switches to the spread once hydrated.
const PHONE = "(max-width: 767px)";
function subscribe(onChange: () => void) {
  const query = window.matchMedia(PHONE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// The page lives in the address as ?page=5, replaced (not pushed) on every turn.
const url: ReaderUrl = {
  read: () => window.location.search,
  write: (search) => window.history.replaceState(window.history.state, "", search),
};

/** How far (px) a pointer may move between press and release and still count as a tap. */
const TAP = 10;

/**
 * mangacn's `Reader` for one chapter, plus what it does not do itself: arrow keys without focusing
 * the pages first, tap zones on the pages, a single page on phones, the page in the address, and
 * links to the chapters either side (with an end card on the last page).
 */
export function ChapterReader({
  series,
  seriesHref,
  chapter,
  pages,
  chapters,
  previous,
  next,
  complete = false,
}: ChapterReaderProps) {
  const single = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE).matches,
    () => true,
  );
  const count = pages.length;
  const reader = useReader({ count, single, url });
  const root = useRef<HTMLDivElement>(null);

  // Turns by whole spreads, as the viewer's own buttons do: +1 reads on, -1 reads back; "first"
  // and "last" go to the ends.
  const turnRef = useRef<(by: number | "first" | "last") => void>(() => {});
  useEffect(() => {
    turnRef.current = (by) => {
      const starts = spreadStarts(count, single);
      const index =
        by === "first"
          ? 0
          : by === "last"
            ? starts.length - 1
            : spreadIndexOf(reader.page, count, single) + by;
      const target = starts[index];
      if (target !== undefined && target !== reader.page) reader.setPage(target);
    };
  });

  // The viewer only hears its keys while it has focus. With nothing focused (a fresh page load),
  // the window passes them on; a focused viewer has already handled (and prevented) the key.
  useEffect(() => {
    const keys: Record<string, number | "first" | "last"> = {
      ArrowLeft: DIRECTION === "rtl" ? 1 : -1,
      ArrowRight: DIRECTION === "rtl" ? -1 : 1,
      Home: "first",
      End: "last",
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      const target = event.target as Node;
      if (target !== document.body && !root.current?.contains(target)) return;
      if (target instanceof HTMLElement && target.closest("a, button, input, textarea, select"))
        return;
      const by = keys[event.key];
      if (by === undefined) return;
      event.preventDefault();
      turnRef.current(by);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Tap zones: the left half of the pages reads on (right to left), the right half reads back. A
  // swipe also ends in a click, so a press that moved is not a tap.
  const press = useRef<{ x: number; y: number } | null>(null);
  const onClick = (event: MouseEvent) => {
    const area = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-slot="spread-viewer-pages"]',
    );
    const from = press.current;
    press.current = null;
    if (!area || !from) return;
    if (Math.hypot(event.clientX - from.x, event.clientY - from.y) > TAP) return;
    const rect = area.getBoundingClientRect();
    const left = event.clientX < rect.left + rect.width / 2;
    turnRef.current(left === (DIRECTION === "rtl") ? 1 : -1);
  };

  const atEnd = count > 0 && reader.current === count;

  return (
    <div
      ref={root}
      className="flex flex-col gap-6 [&_[data-slot=spread-viewer-pages]]:cursor-pointer"
      onPointerDown={(event) => {
        press.current = { x: event.clientX, y: event.clientY };
      }}
      onClick={onClick}
    >
      {/* Reader is a section here (the shell owns the page's main), which makes its title an h2. */}
      <h1 className="sr-only">{`${series}, chapter ${chapter.number}: ${chapter.title}`}</h1>
      <Reader
        as="section"
        series={series}
        chapter={chapter}
        pages={pages}
        chapters={chapters}
        direction={DIRECTION}
        single={single}
        page={reader.page}
        onPageChange={reader.setPage}
        className="mx-auto"
      />
      {atEnd && (
        <Panel
          shadow
          caption={`End of chapter ${chapter.number}`}
          className="items-center gap-4 px-5 pt-10 pb-6 text-center"
        >
          <SfxText size="md" rotate={-4}>
            {next ? "Next!" : "Fin"}
          </SfxText>
          <SpeechBubble tail="bottom-right" className="text-base">
            {next
              ? `Next up: chapter ${next.number}, "${next.title}".`
              : complete
                ? "That's the whole story. Thanks for reading!"
                : "You're all caught up. The next chapter lands soon."}
          </SpeechBubble>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={next ? next.href : seriesHref} />}
          >
            {next ? `Read chapter ${next.number}` : "Back to the series"}
          </Button>
        </Panel>
      )}
      {/* Chapters either side. Next sits on the left, as the viewer's Next button does. */}
      <nav aria-label="Chapters" className="flex flex-wrap items-center justify-between gap-3">
        {next ? (
          <Button variant="outline" nativeButton={false} render={<Link href={next.href} />}>
            <ArrowLeftIcon data-icon="inline-start" aria-hidden />
            {`Next: chapter ${next.number}`}
          </Button>
        ) : (
          <span />
        )}
        {previous && (
          <Button variant="outline" nativeButton={false} render={<Link href={previous.href} />}>
            {`Previous: chapter ${previous.number}`}
            <ArrowRightIcon data-icon="inline-end" aria-hidden />
          </Button>
        )}
      </nav>
    </div>
  );
}
