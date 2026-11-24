import type { Metadata } from "next";
import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { InkMark } from "@/components/ink-mark";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";
import { VerticalText } from "@/components/vertical-text";
import { POSTS, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Studio diary of Oriha Sumi: process notes, tools, fairs and margins.",
};

export default function BlogPage() {
  return (
    <div className={`${PAGE_COLUMN} gap-10 pt-8 pb-20 sm:pt-12`}>
      <header className="flex flex-col items-start gap-4">
        <h1 className={HEADING}>Blog</h1>
        <ThoughtBubble className="text-base sm:text-lg">
          Studio diary, process notes and <InkMark kind="underline" color="spot">too many</InkMark> photos of pens.
        </ThoughtBubble>
      </header>
      <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <article className="flex gap-4 border-t-2 border-ink pt-4 sm:gap-6">
              {/* The Japanese title as the post's spine, read top to bottom. */}
              <VerticalText
                lang="ja"
                className="shrink-0 border-r-2 border-ink pr-3 font-dialogue text-xl leading-none tracking-widest sm:text-2xl"
              >
                {post.titleJa}
              </VerticalText>
              <div className="flex min-w-0 flex-col items-start gap-3">
                <p className="font-display text-xs uppercase text-muted-foreground">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time> &middot; {post.tag}
                </p>
                <h2 className="font-display text-2xl leading-tight uppercase sm:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-spot hover:underline underline-offset-4">
                    {post.title}
                  </Link>
                </h2>
                <CaptionBox font="body" className="text-base">{post.excerpt}</CaptionBox>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="text-sm underline underline-offset-4 hover:text-spot"
                >
                  Read the post &rarr;
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
