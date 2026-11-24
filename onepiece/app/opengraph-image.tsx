import { ImageResponse } from "next/og";

export const alt = "One Piece: a mangacn showcase. Unofficial fan page.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The theme's paper, ink and spot red as hex: the image renderer reads neither oklch nor var().
const PAPER = "#fbf9f4";
const INK = "#1a1715";
const SPOT = "#d62a1f";

// Type only: no series artwork and nothing from public/. The face is the one bundled with
// next/og (Geist Regular); a stroke in the fill colour gives it the weight of display type.
const word = (color: string, shadow: string) =>
  ({
    fontSize: 178,
    lineHeight: 1,
    letterSpacing: 12,
    color,
    WebkitTextStroke: `10px ${color}`,
    textShadow: `10px 10px 0 ${shadow}`,
  }) as const;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: PAPER,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "36px 52px 44px",
            border: `14px solid ${INK}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                background: INK,
                color: PAPER,
                fontSize: 26,
                letterSpacing: 6,
              }}
            >
              UNOFFICIAL FAN PAGE
            </div>
            <div style={{ display: "flex", width: 44, height: 44, borderRadius: 22, background: SPOT }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", transform: "rotate(-3deg)" }}>
            <div style={{ ...word(INK, SPOT), marginRight: 64 }}>ONE</div>
            <div style={word(SPOT, INK)}>PIECE</div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "12px 24px",
                border: `6px solid ${INK}`,
                background: PAPER,
                color: INK,
                fontSize: 42,
                boxShadow: `8px 8px 0 ${INK}`,
              }}
            >
              a mangacn showcase
            </div>
            <div style={{ display: "flex", color: INK, fontSize: 26, letterSpacing: 4 }}>
              SET SAIL FOR THE GRAND LINE
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
