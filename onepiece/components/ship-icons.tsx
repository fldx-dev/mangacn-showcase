import type * as React from "react";

// Two original ink drawings in the theme's colours, both sailing right. They are simple marks
// for the voyage timeline, not reproductions of the series' artwork.

const INK = {
  stroke: "var(--ink)",
  strokeWidth: 2,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

function Waves() {
  return (
    <path d="M2 57q4-4 8 0t8 0 8 0 8 0 8 0 8 0 8 0" fill="none" {...INK} strokeWidth={1.5} />
  );
}

/** A small caravel with a sheep figurehead. */
export function GoingMerry(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <path d="M30 42V7" fill="none" {...INK} />
      <path d="M30 7l10 3.5L30 14z" fill="var(--spot)" {...INK} strokeWidth={1.5} />
      <path d="M13 16q17-5 34 0l-2 19q-15-4-30 0z" fill="var(--paper)" {...INK} />
      <path d="M14 23q16-4 32 0" fill="none" stroke="var(--spot)" strokeWidth={3} />
      <path d="M5 41h44l4-5 3 5q-5 14-15 14H17Q7 55 5 41z" fill="var(--tone-2)" {...INK} />
      <path d="M9 46h43" fill="none" {...INK} strokeWidth={1.5} />
      {/* Sheep figurehead: woolly head, curled horn. */}
      <circle cx="56" cy="31" r="6" fill="var(--paper)" {...INK} />
      <path d="M52 27q-5-1-5 4t4 3q2-1 1-3" fill="none" {...INK} strokeWidth={1.5} />
      <circle cx="58" cy="30" r="1" fill="var(--ink)" />
      <Waves />
    </svg>
  );
}

/** A two-masted brig with a sun-maned lion figurehead. */
export function ThousandSunny(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <path d="M22 42V5M38 42V9" fill="none" {...INK} />
      <path d="M22 5l9 3-9 3z" fill="var(--spot)" {...INK} strokeWidth={1.5} />
      <path d="M9 13q13-4 26 0l-1.5 12q-11.5-3-23 0zM10 28q12-3 24 0l-1 9q-11-3-22 0z" fill="var(--paper)" {...INK} />
      <path d="M31 16q7-2 14 0l-1 18q-6-2-12 0z" fill="var(--paper)" {...INK} />
      <path d="M10 18q12-3 24 0M32 23q6-2 12 0" fill="none" stroke="var(--spot)" strokeWidth={3} />
      <path d="M3 41h46l3-3 3 3q-4 14-16 14H16Q5 55 3 41z" fill="var(--spot)" {...INK} />
      <path d="M7 46h45" fill="none" stroke="var(--paper)" strokeWidth={2} />
      {/* Lion figurehead: a face in a mane of sun rays. */}
      <path
        d="M56 21l2 4 4-2-1 4.5 4.5 1-3.5 3 3 3.5-4.5.5.5 4.5-4-2-2.5 4-2-4-4 2 .5-4.5-4.5-.5 3-3.5-3.5-3 4.5-1-1-4.5 4 2z"
        fill="var(--paper)"
        {...INK}
        strokeWidth={1.5}
      />
      <circle cx="56" cy="31" r="4.5" fill="var(--paper)" {...INK} strokeWidth={1.5} />
      <circle cx="57.5" cy="30" r="1" fill="var(--ink)" />
      <Waves />
    </svg>
  );
}
