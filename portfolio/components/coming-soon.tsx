import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";

/** Placeholder for a page a later task builds. */
export function ComingSoon({ title, thought }: { title: string; thought: string }) {
  return (
    <div className={`${PAGE_COLUMN} items-start gap-8 pt-8 pb-20 sm:pt-12`}>
      <h1 className={HEADING}>{title}</h1>
      <ThoughtBubble className="text-base sm:text-lg">{thought}</ThoughtBubble>
      <CaptionBox font="body">This page is still in pencils. Check back soon.</CaptionBox>
      <Link href="/works" className="underline underline-offset-4 hover:text-spot">
        Meanwhile, read about the works &rarr;
      </Link>
    </div>
  );
}
