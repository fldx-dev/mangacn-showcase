import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** The carved field: sixteen marks to a row. The stone shows as many rows as its shape allows. */
const COLS = 16;
const ROWS = 12;
/** The row she has underlined, and how many of its marks. heroes-b.css places the line to match. */
const READ_ROW = 2;
const READ_MARKS = 7;

/** Points of a three by three lattice inside a ten unit cell. */
const AT = [2, 5, 8];

/**
 * One carved mark: three or four straight and bent strokes on the lattice, picked by a fixed
 * integer sequence, so the server and every render draw the same stone. The marks are abstract
 * strokes and spell nothing.
 */
function carve(index: number): string {
  let seed = (index * 2654435761 + 97) >>> 0;
  const next = (span: number) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed >>> 11) % span;
  };
  const strokes: string[] = [];
  const count = 3 + next(2);
  for (let stroke = 0; stroke < count; stroke += 1) {
    const x = AT[next(3)];
    const y = AT[next(3)];
    const dx = x === 8 ? -3 : x === 2 ? 3 : next(2) ? 3 : -3;
    const dy = y === 8 ? -3 : y === 2 ? 3 : next(2) ? 3 : -3;
    const kind = next(6);
    // A stroke from the middle point is one step long; from an edge it may cross the cell.
    const run = next(2) + 1;
    if (kind < 2) strokes.push(`M${x} ${y}h${dx * (x === 5 ? 1 : run)}`);
    else if (kind < 4) strokes.push(`M${x} ${y}v${dy * (y === 5 ? 1 : run)}`);
    else if (kind === 4) strokes.push(`M${x} ${y}q${dx} 0 ${dx} ${dy}`);
    else strokes.push(`M${x} ${y}h0.01`);
  }
  return strokes.join("");
}

/** A whole row range of marks as one path. Strokes that leave a cell are kept inside the field. */
function field(pick: (row: number, col: number) => boolean): string {
  let d = "";
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (!pick(row, col)) continue;
      d += carve(row * COLS + col).replace(
        /M(\d+) (\d+)/g,
        (_, x: string, y: string) => `M${Number(x) + col * 10} ${Number(y) + row * 10}`,
      );
    }
  }
  return d;
}

const isRead = (row: number, col: number) => row === READ_ROW && col < READ_MARKS;
const STONE = field((row, col) => !isRead(row, col));
const READ = field(isRead);

/** Four fingers closing over an edge from behind it: the Flower-Flower Fruit holding the sheet. */
function Fingers({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 34 62"
      className={`robin-hand ${className}`}
    >
      {[
        { y: 2, reach: 22 },
        { y: 16, reach: 30 },
        { y: 30, reach: 27 },
        { y: 44, reach: 18 },
      ].map(({ y, reach }) => (
        <g key={y}>
          <path
            d={`M34 ${y}H${34 - reach + 6}a6 6 0 0 0 0 12H34z`}
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d={`M${34 - reach * 0.45} ${y + 3.5}v5`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * A Poneglyph on a white page, and a scholar's notes around it. The stone is the dark mass and
 * carries her name; one line of its marks is underlined in red and led out to the margin, where
 * the only thing she ever asked for is written. Hands that grow out of the stone hold her poster.
 */
export function HeroRobin({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="robin relative isolate">
      <div className={`${WRAP} pt-6 sm:pt-10`}>{back}</div>

      <div className={`${WRAP} robin-sheet`}>
        <span aria-hidden="true" className="robin-stone" />

        <div className="robin-name dark flex min-w-0 flex-col items-start gap-3 text-ink">
          <Badge variant="outline">{member.role}</Badge>
          <h1 id="crew-name" className="robin-name__title font-display uppercase">
            {member.name}
          </h1>
          <p className="font-dialogue text-lg text-muted-foreground sm:text-xl">
            &ldquo;{member.epithet}&rdquo;
          </p>
        </div>

        <div aria-hidden="true" className="robin-glyphs dark">
          <svg
            viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`}
            preserveAspectRatio="xMinYMin slice"
            focusable="false"
            className="robin-glyphs__field"
            fill="none"
            strokeWidth="1.15"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d={STONE} stroke="var(--tone-3)" />
            <path d={READ} stroke="var(--ink)" strokeWidth="1.3" />
          </svg>
          <span className="robin-glyphs__read" />
          <span className="robin-glyphs__lead" />
        </div>

        <p className="robin-quote font-dialogue">
          <span className="sr-only">{member.name}: </span>
          {member.quote}
        </p>

        <p className="robin-about text-base leading-relaxed sm:text-lg">{member.about}</p>

        <div className="robin-poster">
          <div className="robin-poster__sheet relative">
            <HeroPoster
              member={member}
              poster={poster}
              sizes="(min-width: 1024px) 14rem, (min-width: 640px) 13rem, 42vw"
              fallbackClassName="text-[0.5rem] sm:text-[0.62rem]"
            />
            <Fingers className="robin-hand--top" />
            <Fingers className="robin-hand--side" />
          </div>
          {note && <p className="robin-poster__note text-xs text-muted-foreground">{note}</p>}
        </div>

        <dl className="robin-facts">
          <div className="robin-facts__item robin-facts__item--dream">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              The dream
            </dt>
            <dd className="font-dialogue text-lg leading-snug sm:text-xl">{member.dream}</dd>
          </div>
          <div className="robin-facts__item">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              Bounty
            </dt>
            <dd className="font-display text-lg whitespace-nowrap uppercase sm:text-xl">
              ฿ {member.bounty}
            </dd>
          </div>
          <div className="robin-facts__item">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              Joined
            </dt>
            <dd className="font-display text-lg uppercase sm:text-xl">{member.joined}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
