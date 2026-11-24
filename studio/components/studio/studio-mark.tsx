import Link from "next/link";
import { PenToolIcon } from "lucide-react";
import { STUDIO } from "@/lib/site";

/** The studio's mark: a pen nib and the name, linking home. */
export function StudioMark() {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium">
      <PenToolIcon aria-hidden className="size-4" />
      {STUDIO.name}
    </Link>
  );
}
