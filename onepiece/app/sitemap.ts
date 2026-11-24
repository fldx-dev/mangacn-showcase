import type { MetadataRoute } from "next";
import { CREW } from "@/lib/crew";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/story`, priority: 0.8 },
    ...CREW.map((member) => ({ url: `${SITE_URL}/crew/${member.slug}`, priority: 0.6 })),
  ];
}
