import { FocusLines } from "@/components/focus-lines";

/**
 * A typeset wanted poster for when no artwork file is present (the public repository ships
 * without the series' artwork). It fills the same 2:3 box as a picture; every size inside is in
 * em, so the caller scales the whole poster with one font size in `className`.
 */
export function PosterFallback({
  epithet,
  name,
  className = "text-[0.6rem] sm:text-xs",
}: {
  epithet: string;
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`relative isolate flex aspect-[2/3] w-full flex-col items-center justify-between overflow-clip border-2 border-ink bg-tone-1 p-[0.9em] text-center text-ink ${className}`}
    >
      <span className="font-display text-[2.6em] leading-none tracking-wide uppercase">Wanted</span>
      <span className="relative isolate mt-[0.6em] flex w-full flex-1 items-center justify-center border-2 border-ink bg-paper">
        <FocusLines color="tone" length="long" count={40} />
        <span className="-rotate-6 px-[0.4em] font-display text-[1.7em] leading-tight text-balance text-spot uppercase">
          {epithet}
        </span>
      </span>
      <span className="mt-[0.8em] font-display text-[0.8em] tracking-[0.25em] uppercase">
        Dead or alive
      </span>
      <span className="font-display text-[1.3em] leading-tight text-balance uppercase">{name}</span>
    </span>
  );
}
