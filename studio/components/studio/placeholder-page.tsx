import { Panel } from "@/components/panel";

/** A section that a later task fills: its heading and blank manga panels where content goes. */
export function PlaceholderPage({
  title,
  note,
  tones,
}: {
  title: string;
  note: string;
  tones: readonly ("halftone" | "lines" | "cross" | "none")[];
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl leading-tight uppercase">{title}</h1>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>
      <div aria-hidden className="grid auto-rows-min gap-4 md:grid-cols-3">
        {tones.map((tone, index) => (
          <Panel key={index} as="div" tone={tone} className="aspect-video" />
        ))}
      </div>
      <Panel
        as="div"
        caption="Blank page"
        className="min-h-64 flex-1 items-center justify-center text-sm text-muted-foreground"
      >
        Nothing drawn here yet.
      </Panel>
    </>
  );
}
