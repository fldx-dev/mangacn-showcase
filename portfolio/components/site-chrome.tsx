import Link from "next/link";
import { ARTIST } from "@/lib/works";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg uppercase tracking-wide sm:text-xl">
          {ARTIST.name.split(" ")[0]} <span className="text-spot">{ARTIST.name.split(" ")[1]}</span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 font-medium underline-offset-4 hover:text-spot hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display uppercase">
          {ARTIST.name} <span lang="ja" className="font-dialogue">{ARTIST.nameJa}</span>
        </p>
        <p className="text-muted-foreground">
          A made-up artist and made-up series, built to show mangacn components.
        </p>
      </div>
    </footer>
  );
}

export const PAGE_COLUMN = "mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6";
export const HEADING = "font-display text-[clamp(2rem,6vw,3.5rem)] leading-[0.95] uppercase";
