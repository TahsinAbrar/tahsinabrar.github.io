import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
export interface Article {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  published: boolean;
  coverImage?: string;
  legacyUrl?: string;
  body: string;
}
function validDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export function getArticles(
  directory = path.join(process.cwd(), "content/articles"),
): Article[] {
  const slugs = new Set<string>();
  return fs
    .readdirSync(directory)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      const fail = (field: string): never => {
        throw new Error(`${file}: invalid ${field}`);
      };
      for (const field of ["title", "slug", "description", "category"])
        if (typeof data[field] !== "string" || !data[field].trim()) fail(field);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) fail("slug");
      if (slugs.has(data.slug)) throw new Error(`Duplicate slug: ${data.slug}`);
      slugs.add(data.slug);
      if (typeof data.published !== "boolean") fail("published");
      if (!validDate(data.date)) fail("date");
      if (data.updatedAt != null && !validDate(data.updatedAt))
        fail("updatedAt");
      if (
        data.tags != null &&
        (!Array.isArray(data.tags) ||
          !data.tags.every((t: unknown) => typeof t === "string"))
      )
        fail("tags");
      if (
        data.readingTime != null &&
        (!Number.isFinite(data.readingTime) || data.readingTime <= 0)
      )
        fail("readingTime");
      if (
        data.coverImage != null &&
        (typeof data.coverImage !== "string" ||
          !data.coverImage.startsWith("/") ||
          data.coverImage.startsWith("//"))
      )
        fail("coverImage");
      if (
        data.legacyUrl != null &&
        (typeof data.legacyUrl !== "string" ||
          !/^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9-]+\/$/.test(data.legacyUrl))
      )
        fail("legacyUrl");
      return {
        title: data.title,
        slug: data.slug,
        description: data.description,
        date: data.date,
        updatedAt: data.updatedAt ?? undefined,
        category: data.category,
        tags: data.tags ?? [],
        readingTime:
          data.readingTime ??
          Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        published: data.published,
        coverImage: data.coverImage ?? undefined,
        legacyUrl: data.legacyUrl,
        body: content,
      } satisfies Article;
    })
    .filter((a) => a.published)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
