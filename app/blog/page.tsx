import { ArticleList } from "@/components/ArticleList";
import { getArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Writing",
  "Practical notes on backend engineering, Linux, databases, and developer tools.",
  "/blog/",
);
export default function Blog() {
  const articles = getArticles();
  return (
    <main id="main" className="container blog-container">
      <header className="blog-hero">
        <span className="blog-label">The engineering notebook</span>
        <h1>Learning, in writing.</h1>
        <p>
          Practical notes, useful discoveries, and lessons from building
          software. Shared along the way.
        </p>
      </header>
      <div className="archive-intro">
        <span>All writing</span>
        <span>{articles.length} articles</span>
      </div>
      <ArticleList articles={articles} headingLevel={2} />
    </main>
  );
}
