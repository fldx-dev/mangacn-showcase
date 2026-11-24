import { notFound } from "next/navigation";

// Placeholder: the chapter reader is the next task. Until then every chapter link lands on this
// segment's not-found, which says the reader is coming soon. Replace this file (and delete the
// not-found.tsx beside it) when the reader is built.
export default function ChapterPage(): never {
  notFound();
}
