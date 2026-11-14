import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"));
}
export function ArticleList({
  articles,
  headingLevel = 3,
}: {
  articles: Article[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return articles.length ? (
    <div className="article-list">
      {articles.map((a) => (
        <article className="article-row" key={a.slug}>
          <div className="article-meta">
            <span className="category">{a.category}</span>
            <span>
              <time dateTime={a.date}>{formatDate(a.date)}</time> ·{" "}
              {a.readingTime} min read
            </span>
          </div>
          <Link href={"/blog/" + a.slug + "/"} className="article-title">
            <Heading>{a.title}</Heading>
            <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
          <p>{a.description}</p>
        </article>
      ))}
    </div>
  ) : (
    <p>New writing will appear here when it is published.</p>
  );
}
