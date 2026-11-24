"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { chartToneFill } from "@/components/chart-tones";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Panel } from "@/components/panel";
import { chapterReaders, pagesThisWeek } from "@/lib/studio-data";

// Bars filled with screentone (chart-tones' patterns, defined once on the page) and outlined
// in ink: the series read by density, not hue, like a printed page.
const readersConfig = {
  readers: { label: "Readers (k)", color: "var(--ink)" },
} satisfies ChartConfig;

const pagesConfig = {
  pencils: { label: "Pencils", color: "var(--ink)" },
  inks: { label: "Inks", color: "var(--ink)" },
  tones: { label: "Tones", color: "var(--ink)" },
} satisfies ChartConfig;

const STAGES = [
  { key: "pencils", tone: "dots1" },
  { key: "inks", tone: "crossHatch" },
  { key: "tones", tone: "dots3" },
] as const;

export function OverviewCharts() {
  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <Panel as="section" caption="First-week readers" className="min-w-0">
        <h2 className="sr-only">First-week readers per chapter, in thousands</h2>
        <ChartContainer config={readersConfig} className="aspect-auto h-64 w-full">
          <BarChart accessibilityLayer data={chapterReaders} margin={{ left: -16, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="chapter" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={48} domain={[30, 50]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="readers"
              fill={chartToneFill("dots2")}
              stroke="var(--color-readers)"
              strokeWidth={1.5}
            />
          </BarChart>
        </ChartContainer>
      </Panel>
      <Panel as="section" caption="Chapter 42 this week" className="min-w-0">
        <h2 className="sr-only">Chapter 42 pages finished per day, by stage</h2>
        <ChartContainer config={pagesConfig} className="aspect-auto h-64 w-full">
          <BarChart accessibilityLayer data={pagesThisWeek} margin={{ left: -24, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={48} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            {STAGES.map(({ key, tone }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="pages"
                fill={chartToneFill(tone)}
                stroke={`var(--color-${key})`}
                strokeWidth={1.5}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </Panel>
    </div>
  );
}
