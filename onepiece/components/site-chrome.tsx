import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/story", label: "Story" },
  { href: "/#crew", label: "Crew" },
  { href: "/#numbers", label: "Numbers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="rubber-link font-display text-lg tracking-wide uppercase sm:text-xl"
        >
          One <span className="text-spot">Piece</span>
        </Link>
        <nav aria-label="Sections" className="order-3 flex w-full items-center justify-center gap-1 sm:order-none sm:w-auto">
          {NAV.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              nativeButton={false}
              render={<Link href={item.href} />}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <Button variant="sfx" nativeButton={false} render={<Link href="/#set-sail" />}>
          Set sail!
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display uppercase">
          One <span className="text-spot">Piece</span> fan page
        </p>
        <p className="max-w-2xl text-muted-foreground">
          An unofficial, non-commercial fan page made to show the mangacn components. One Piece
          and its artwork are &copy; Eiichiro Oda / Shueisha and Toei Animation; nothing here is
          affiliated with or endorsed by them. Rights holder and want something removed?{" "}
          <a
            href="https://github.com/fldx-dev/mangacn/issues"
            target="_blank"
            rel="noreferrer noopener"
            className="ink-link"
          >
            Open an issue
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
