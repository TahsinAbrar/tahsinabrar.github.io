import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { origin } from "@/lib/metadata";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: origin + "/" },
    { url: origin + "/blog/" },
    ...getArticles().map((a) => ({
      url: origin + "/blog/" + a.slug + "/",
      lastModified: a.updatedAt ?? a.date,
    })),
  ];
}
