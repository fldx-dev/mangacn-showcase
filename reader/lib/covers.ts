// Cover and portrait art as inline SVG data URIs: screentone fields, an ink motif per series and
// a title band. An SVG inside <img> cannot read the page's CSS variables or webfonts, so the
// sepia palette is written out here and type falls back to generic stacks.

export const PAPER = "#f3e8cf";
export const TONE = "#d9c8a6";
export const INK = "#2a1c12";
export const SPOT = "#b34a2b";

export type Motif = "lighthouse" | "kite" | "tower";

/** Screentone fills: dots, diagonal lines or crosshatch, at a given density. */
export function tones(id: string): string {
  return `<defs>
<pattern id="${id}-dots" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${TONE}"/><circle cx="4" cy="4" r="1.9" fill="${INK}" opacity=".55"/></pattern>
<pattern id="${id}-fine" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="${PAPER}"/><circle cx="3" cy="3" r="1" fill="${INK}" opacity=".5"/></pattern>
<pattern id="${id}-lines" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="${TONE}"/><rect width="2" height="7" fill="${INK}" opacity=".45"/></pattern>
<pattern id="${id}-cross" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="${TONE}"/><rect width="1.6" height="7" fill="${INK}" opacity=".5"/><rect width="7" height="1.6" fill="${INK}" opacity=".5"/></pattern>
</defs>`;
}

const FIELDS = ["dots", "lines", "cross", "fine"] as const;

export function motif(kind: Motif, n: number, id: string): string {
  switch (kind) {
    case "lighthouse": {
      const beam = -18 + (n % 4) * 9;
      return `<g transform="rotate(${beam} 100 128)"><path d="M100 128 L200 92 L200 164 Z" fill="${PAPER}" opacity=".85"/><path d="M100 128 L0 98 L0 158 Z" fill="${PAPER}" opacity=".6"/></g>
<path d="M84 250 L91 140 L109 140 L116 250 Z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
<path d="M88 190 L112 190 M86 220 L114 220" stroke="${SPOT}" stroke-width="9"/>
<rect x="88" y="116" width="24" height="24" fill="${SPOT}" stroke="${INK}" stroke-width="4"/>
<path d="M84 116 L100 100 L116 116 Z" fill="${INK}"/>
<path d="M0 252 Q25 240 50 252 T100 252 T150 252 T200 252 V300 H0 Z" fill="url(#${id}-lines)" stroke="${INK}" stroke-width="3"/>`;
    }
    case "kite": {
      const tilt = -14 + (n % 3) * 14;
      return `<path d="M0 300 V236 L30 236 L30 214 L62 214 L62 244 L96 244 L96 222 L130 222 L130 250 L168 250 L168 228 L200 228 V300 Z" fill="${INK}"/>
<g transform="rotate(${tilt} 110 140)"><path d="M110 78 L150 140 L110 206 L70 140 Z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
<path d="M110 78 L110 206 M70 140 L150 140" stroke="${INK}" stroke-width="2.5"/>
<path d="M110 78 L150 140 L110 140 Z" fill="${SPOT}"/>
<path d="M110 206 Q90 226 112 240 T104 272" fill="none" stroke="${INK}" stroke-width="3"/>
<path d="M98 228 l10 -6 l2 10 Z M106 252 l10 -4 l0 10 Z" fill="${SPOT}"/></g>`;
    }
    case "tower": {
      const lit = (n * 5) % 12;
      const windows = Array.from({ length: 12 }, (_, i) => {
        const x = 70 + (i % 3) * 22;
        const y = 120 + Math.floor(i / 3) * 34;
        return `<rect x="${x}" y="${y}" width="14" height="20" fill="${i === lit ? SPOT : INK}"/>`;
      }).join("");
      return `<circle cx="${150 - (n % 3) * 16}" cy="96" r="22" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
<circle cx="${160 - (n % 3) * 16}" cy="90" r="20" fill="url(#${id}-${FIELDS[n % 3]})"/>
<rect x="60" y="104" width="80" height="196" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>${windows}
<path d="M30 300 V230 H60 M140 250 H172 V300" fill="url(#${id}-dots)" stroke="${INK}" stroke-width="3"/>`;
    }
  }
}

export function escape(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

/** Splits a title into at most two lines for the title band. */
function titleLines(title: string): string[] {
  const words = title.toUpperCase().split(" ");
  if (title.length <= 14 || words.length === 1) return [title.toUpperCase()];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

// The title runs in a band along the bottom and the folio sits top-left: the top-right corner is
// where volume-grid and series-header stamp the cover (NEW, 連載中), so it holds only sky.
/** A cover: a screentone field, the series' ink motif, a title band and, for a volume, a folio. */
export function coverArt(title: string, kind: Motif, volume = 0): string {
  const id = `c${volume}`;
  const lines = titleLines(title);
  const size = Math.min(20, Math.floor(300 / Math.max(...lines.map((l) => l.length)) / 0.75));
  const text = lines
    .map(
      (line, i) =>
        `<text x="100" y="${(lines.length === 1 ? 276 : 264) + i * (size + 4)}" font-family="Impact, 'Arial Black', sans-serif" font-size="${size}" fill="${INK}" text-anchor="middle" letter-spacing="1">${escape(line)}</text>`,
    )
    .join("");
  const folio =
    volume > 0
      ? `<rect x="10" y="10" width="40" height="36" fill="${INK}"/><text x="30" y="38" font-family="Impact, 'Arial Black', sans-serif" font-size="26" fill="${PAPER}" text-anchor="middle">${volume}</text>`
      : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">${tones(id)}<rect width="200" height="300" fill="url(#${id}-${FIELDS[volume % FIELDS.length]})"/><g transform="translate(0 -40)">${motif(kind, volume, id)}</g><rect y="236" width="200" height="64" fill="${PAPER}"/><path d="M0 236 H200" stroke="${INK}" stroke-width="4"/>${text}${folio}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** A portrait: an inked bust on a screentone sky; `hair` is a path over a 300×400 box. */
export function portraitArt(hair: string, field: (typeof FIELDS)[number], accent = false): string {
  const id = "p";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">${tones(id)}<rect width="300" height="400" fill="url(#${id}-${field})"/>
<path d="M40 400 C40 300 90 270 150 270 C210 270 260 300 260 400 Z" fill="${accent ? SPOT : PAPER}" stroke="${INK}" stroke-width="6"/>
<circle cx="150" cy="190" r="72" fill="${PAPER}" stroke="${INK}" stroke-width="6"/><path d="${hair}" fill="${INK}"/>
<circle cx="125" cy="200" r="7" fill="${INK}"/><circle cx="175" cy="200" r="7" fill="${INK}"/>
<path d="M135 238 Q150 246 165 238" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
