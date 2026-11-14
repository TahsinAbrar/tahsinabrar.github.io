import Comments from "@/components/Comments";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import { getArticles } from "@/lib/articles";
import { ArticleList, formatDate } from "@/components/ArticleList";
import { pageMetadata, jsonLd, origin } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticles().find((a) => a.slug === slug);
  if (!a) return {};
  return pageMetadata(a.title, a.description, `/blog/${slug}/`, a);
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getArticles();
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = articles
    .filter((b) => b.slug !== slug && b.category === a.category)
    .slice(0, 2);
  return (
    <main id="main" className="container article-container">
      <Link className="text-link" href="/blog/">
        <ArrowLeft size={16} aria-hidden="true" />
        All writing
      </Link>
      <header className="article-header">
        <span className="category">{a.category}</span>
        <h1>{a.title}</h1>
        <p>{a.description}</p>
        <div className="article-meta">
          <span>Tahsin Abrar</span>
          <time dateTime={a.date}>{formatDate(a.date)}</time>
          <span>{a.readingTime} min read</span>
          {a.updatedAt && (
            <span>
              Updated{" "}
              <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
            </span>
          )}
        </div>
        <div className="tags">
          {a.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </header>
      {a.coverImage && (
        <Image
          src={a.coverImage}
          alt={a.title}
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      {a.legacyUrl && (
        <aside className="archive-note" aria-label="Archive context">
          From the archive · Originally published in {a.date.slice(0, 4)}.
          Preserved as a historical reference; commands and software versions
          may no longer reflect current practice.
        </aside>
      )}
      <div className="prose">
        <MDXRemote
          source={a.body}
          components={{
            pre: (props) => <pre {...props} tabIndex={0} />,
            table: (props) => <table {...props} tabIndex={0} />,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </div>
      <Comments slug={a.slug} title={a.title} legacyUrl={a.legacyUrl} />
      {related.length > 0 && (
        <aside className="related" aria-label="Related articles">
          <h2>Keep reading</h2>
          <ArticleList articles={related} />
        </aside>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            dateModified: a.updatedAt ?? a.date,
            mainEntityOfPage: origin + "/blog/" + a.slug + "/",
            image: origin + "/og-image.png",
            author: { "@type": "Person", name: "Tahsin Abrar", url: origin },
          }),
        }}
      />
    </main>
  );
}
