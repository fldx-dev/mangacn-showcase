import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaptionBox } from "@/components/caption-box";
import { InkArrow } from "@/components/ink-arrow";
import { PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";
import { VerticalText } from "@/components/vertical-text";
import { POSTS, formatPostDate, type PostBlock } from "@/lib/posts";

// Every post is prerendered and the route blocks on its params, as /works/[slug] does.
export const instant = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((item) => item.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case "h":
      return <h2 className="pt-4 font-display text-2xl uppercase sm:text-3xl">{block.text}</h2>;
    case "caption":
      return <CaptionBox className="text-lg sm:text-xl">{block.text}</CaptionBox>;
    case "thought":
      return (
        <div className="flex flex-col items-start gap-2 self-stretch sm:items-end">
          <InkArrow direction="down" length="sm" curve="left" label="Margin note" />
          <ThoughtBubble tailSide="right" className="text-base sm:text-lg">{block.text}</ThoughtBubble>
        </div>
      );
    default:
      return <p className="text-base leading-relaxed sm:text-lg">{block.text}</p>;
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const index = POSTS.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const post = POSTS[index];
  // Posts are newest first: "newer" is the one before, "older" the one after.
  const newer = POSTS[index - 1];
  const older = POSTS[index + 1];

  return (
    <div className={`${PAGE_COLUMN} gap-10 pt-8 pb-20 sm:pt-12`}>
      <Link href="/blog" className="self-start text-sm underline underline-offset-4 hover:text-spot">
        &larr; All posts
      </Link>

      <article aria-labelledby="post-title" className="mx-auto flex w-full max-w-3xl gap-4 sm:gap-8">
        {/* The Japanese title runs down the right edge of the column, as a manga page title does. */}
        <div className="order-last shrink-0">
          <VerticalText
            lang="ja"
            className="sticky top-24 border-l-2 border-ink pl-3 font-dialogue text-2xl leading-none tracking-[0.2em] sm:pl-4 sm:text-4xl"
          >
            {post.titleJa}
          </VerticalText>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="flex flex-col gap-3">
            <p className="font-display text-xs uppercase text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> &middot; {post.tag}
            </p>
            <h1 id="post-title" className="font-display text-[clamp(1.75rem,5vw,3rem)] leading-[1.05] uppercase">
              {post.title}
            </h1>
          </header>
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      <nav aria-label="More posts" className="mx-auto flex w-full max-w-3xl flex-col gap-3 border-t-2 border-ink pt-6 sm:flex-row sm:justify-between">
        {older ? (
          <Link href={`/blog/${older.slug}`} className="hover:text-spot">
            &larr; Older: <span className="font-display uppercase">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/blog/${newer.slug}`} className="hover:text-spot sm:text-right">
            Newer: <span className="font-display uppercase">{newer.title}</span> &rarr;
          </Link>
        )}
      </nav>
    </div>
  );
}
