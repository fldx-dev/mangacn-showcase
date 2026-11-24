"use client";

import { useEffect, useState } from "react";
import { GoingMerry, ThousandSunny } from "@/components/ship-icons";

export interface ChartStop {
  slug: string;
  name: string;
  chapters: string;
  saga: string;
  /** True on the first arc of a saga: the chart names the saga there. */
  sagaStart: boolean;
}

interface Sea {
  name: string;
  /** Index of the first stop in this sea. */
  from: number;
}

const STEP = 20;
const TOP = 16;
const WIDTH = 100;

/** Where stop `index` sits on the chart: a route that swings from side to side as it runs south. */
function at(index: number): [number, number] {
  return [50 + 27 * Math.sin(index * 0.95 + 0.4), TOP + index * STEP];
}

/** One curved leg of the route, from the stop before `index` to stop `index`. */
function leg(index: number): string {
  const [x0, y0] = at(index - 1);
  const [x1, y1] = at(index);
  return `C${x0.toFixed(1)} ${y0 + STEP / 2} ${x1.toFixed(1)} ${y1 - STEP / 2} ${x1.toFixed(1)} ${y1}`;
}

/**
 * The sea chart beside the story: every arc is an island on one route, grouped into the three
 * seas it crosses. The ship sits at the arc being read (the list item crossing the middle of the
 * screen), the route behind it is inked in, and every island is a link. Without JavaScript the
 * chart is a still map with working links.
 */
export function StoryChart({
  stops,
  seas,
  sunnyFrom,
}: {
  stops: ChartStop[];
  seas: Sea[];
  /** Index of the first stop sailed on the Thousand Sunny. */
  sunnyFrom: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = stops
      .map((stop) => document.getElementById(stop.slug))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = stops.findIndex((stop) => stop.slug === entry.target.id);
          if (index >= 0) setActive(index);
        }
      },
      // A thin band across the middle of the screen: one arc crosses it at a time.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, [stops]);

  const height = TOP * 2 + (stops.length - 1) * STEP;
  const [x0, y0] = at(0);
  const start = `M${x0.toFixed(1)} ${y0}`;
  const route = start + stops.slice(1).map((_, i) => leg(i + 1)).join("");
  const sailed = start + stops.slice(1, active + 1).map((_, i) => leg(i + 1)).join("");
  const [shipX, shipY] = at(active);
  const current = stops[active];
  const Ship = active >= sunnyFrom ? ThousandSunny : GoingMerry;
  const progress = stops.length > 1 ? active / (stops.length - 1) : 0;

  return (
    <>
      {/* Wide screens: the chart stands beside the text. */}
      <aside aria-label="Sea chart" className="story-chart hidden flex-col lg:flex">
        <p className="story-chart__now">
          <span className="font-display text-xs tracking-widest text-spot uppercase">
            Stop {active + 1} of {stops.length}
          </span>
          <span className="font-display text-base leading-tight uppercase">{current.name}</span>
          <span className="font-dialogue text-sm text-muted-foreground">{current.chapters}</span>
        </p>
        <div className="story-chart__map">
          <svg
            viewBox={`0 0 ${WIDTH} ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            role="img"
            aria-label={`Route through ${stops.length} arcs; now at ${current.name}`}
          >
            {seas.map((sea, index) => {
              const top = index === 0 ? 0 : at(sea.from)[1] - STEP / 2;
              const next = seas[index + 1];
              const bottom = next ? at(next.from)[1] - STEP / 2 : height;
              return (
                <g key={sea.name}>
                  <rect
                    x={0}
                    y={top}
                    width={WIDTH}
                    height={bottom - top}
                    fill={index % 2 ? "var(--tone-1)" : "var(--paper)"}
                  />
                  {index > 0 && (
                    <line
                      x1={0}
                      x2={WIDTH}
                      y1={top}
                      y2={top}
                      stroke="var(--spot)"
                      strokeWidth={4}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </g>
              );
            })}
            <path d={route} className="story-chart__route" />
            <path d={sailed} className="story-chart__sailed" />
          </svg>
          {seas.map((sea, index) => (
            <span
              key={sea.name}
              className="story-chart__sea"
              style={{ top: `${((index === 0 ? 0 : at(sea.from)[1] - STEP / 2) / height) * 100}%` }}
            >
              {sea.name}
            </span>
          ))}
          <ol className="contents">
            {stops.map((stop, index) => {
              const [x, y] = at(index);
              return (
                <li key={stop.slug} className="contents">
                  <a
                    href={`#${stop.slug}`}
                    title={`${stop.name}, ${stop.chapters}`}
                    aria-current={index === active ? "step" : undefined}
                    data-passed={index <= active}
                    data-saga-start={stop.sagaStart}
                    className="story-chart__stop"
                    style={{ left: `${x}%`, top: `${(y / height) * 100}%` }}
                  >
                    <span className="sr-only">
                      {stop.name}, {stop.chapters}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
          <span
            aria-hidden="true"
            className="story-chart__ship"
            style={{ left: `${shipX}%`, top: `${(shipY / height) * 100}%` }}
          >
            <Ship className="size-full" />
          </span>
        </div>
      </aside>

      {/* Phones: the same position as a strip under the header. */}
      <div aria-hidden="true" className="story-strip flex flex-col lg:hidden">
        <p className="flex min-w-0 items-baseline gap-2">
          <span className="shrink-0 font-display text-xs text-spot tabular-nums">
            {active + 1}/{stops.length}
          </span>
          <span className="truncate font-display text-sm uppercase">{current.name}</span>
          <span className="ml-auto shrink-0 font-dialogue text-xs text-muted-foreground">
            {current.chapters}
          </span>
        </p>
        <div className="story-strip__track">
          <span className="story-strip__sailed" style={{ scale: `${progress} 1` }} />
          <span className="story-strip__ship" style={{ left: `${progress * 100}%` }}>
            <Ship className="size-full" />
          </span>
        </div>
      </div>
    </>
  );
}
