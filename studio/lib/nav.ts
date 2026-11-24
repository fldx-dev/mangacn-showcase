// The dashboard's sections, in sidebar order.
export const APP_NAV = [
  { title: "Overview", url: "/app" },
  { title: "Files", url: "/app/files" },
  { title: "Settings", url: "/app/settings" },
] as const;

/** The section a path is in: the longest nav url that is the path or a parent of it. */
export function navTitle(pathname: string) {
  const matches = APP_NAV.filter(
    (item) => pathname === item.url || pathname.startsWith(`${item.url}/`),
  );
  return matches.sort((a, b) => b.url.length - a.url.length)[0]?.title ?? "Overview";
}
