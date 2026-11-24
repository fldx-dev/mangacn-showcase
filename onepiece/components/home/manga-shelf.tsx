import { ShelfStock } from "@/components/home/shelf-stock";
import { InkFrame } from "@/components/ink-frame";

/** One spine per collected volume: the series stands at "110+". */
const VOLUMES = 110;

/** Cover stock, as theme utilities. Repeats weight the mix towards plain paper and greys. */
const STOCK = [
  "bg-paper",
  "bg-tone-1",
  "bg-ink",
  "bg-paper",
  "bg-tone-2",
  "bg-tone-1 halftone",
  "bg-paper",
  "bg-ink",
  "bg-tone-2",
  "bg-paper screentone-lines",
  "bg-tone-1",
];

/** The shelf is drawn from the volume number alone, so it is the same on every render. */
const SPINES = Array.from({ length: VOLUMES }, (_, index) => {
  const volume = index + 1;
  const numbered = volume === 1 || volume % 10 === 0;
  return {
    volume,
    numbered,
    height: 82 + ((volume * volume * 7 + volume * 13) % 19),
    stock: numbered
      ? "bg-paper"
      : volume % 14 === 6
        ? "bg-spot"
        : STOCK[(volume * 7 + (volume % 5) * 3 + Math.floor(volume / 9)) % STOCK.length],
    band: (volume * 5 + Math.floor(volume / 4)) % 4,
  };
});

/**
 * The series as a bookcase: 110 spines to read as a quantity, a bookend carrying the debut year,
 * and the three running totals hung from the bottom shelf as tags. The spines are decoration;
 * the four facts are one definition list.
 */
export function MangaShelf({ figures }: { figures: { value: string; label: string }[] }) {
  return (
    <div className="shelf">
      <ShelfStock />
      <div aria-hidden="true" className="shelf__rows">
        {SPINES.map((spine) => (
          <span
            key={spine.volume}
            className="spine"
            style={{ "--h": `${spine.height}%`, "--i": spine.volume } as React.CSSProperties}
          >
            <span className={`spine__body ${spine.stock}`} data-band={spine.band}>
              {spine.numbered && spine.volume}
            </span>
          </span>
        ))}
        <span className="shelf__rest">
          <span className="spine__body shelf__lean bg-paper" data-band="1" />
          <span className="shelf__note">Room for more.</span>
        </span>
      </div>
      <dl className="shelf__facts">
        <div className="shelf__debut">
          <dt>Debut in Weekly Shonen Jump</dt>
          <dd>1997</dd>
        </div>
        {figures.map((item) => (
          <div key={item.label} className="shelf__tag">
            <dt>
              <InkFrame
                as="span"
                shadow="hatch"
                className="pointer-events-none absolute inset-0 -z-1 [--outline-width:var(--outline-width-heavy)]"
              />
              {item.label}
            </dt>
            <dd data-count>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
