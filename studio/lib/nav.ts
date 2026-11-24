// The dashboard's sections, in sidebar order. Later tasks fill the pages.
export const APP_NAV = [
  { title: "Overview", url: "/app" },
  { title: "Files", url: "/app/files" },
  { title: "Settings", url: "/app/settings" },
] as const;

export function navTitle(pathname: string) {
  return APP_NAV.find((item) => item.url === pathname)?.title ?? "Overview";
}
