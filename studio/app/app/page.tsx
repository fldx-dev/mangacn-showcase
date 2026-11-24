import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ActivityFeed } from "@/components/activity-feed";
import { ActivityStats } from "@/components/activity-stats";
import { ChartTones } from "@/components/chart-tones";
import { InkSplashLoader } from "@/components/ink-splash-loader";
import { OverviewCharts } from "@/components/studio/overview-charts";
import { STUDIO } from "@/lib/site";
import { overviewEvents, overviewStats } from "@/lib/studio-data";

export const metadata: Metadata = { title: "Overview" };

// The heading is static; the numbers are "fetched" per request (a short fake delay stands in for
// a real API), so the ink-splash loader holds their place while they stream in.
export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl leading-tight uppercase">Overview</h1>
        <p className="text-sm text-muted-foreground">
          {STUDIO.series}: readers, pages and what the audience is saying this week.
        </p>
      </div>
      <Suspense fallback={<OverviewLoading />}>
        <OverviewData />
      </Suspense>
    </>
  );
}

async function OverviewData() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 700));
  return (
    <div className="flex min-w-0 flex-col gap-8 pb-6">
      <ChartTones className="text-ink" />
      <ActivityStats stats={overviewStats} title="This week" />
      <OverviewCharts />
      <ActivityFeed events={overviewEvents} pageSize={6} />
    </div>
  );
}

function OverviewLoading() {
  return (
    <div className="flex min-h-96 flex-1 flex-col items-center justify-center gap-3">
      <InkSplashLoader size="lg" label="Loading the overview" />
      <p aria-hidden className="font-dialogue text-sm text-muted-foreground">
        Inking the numbers…
      </p>
    </div>
  );
}
