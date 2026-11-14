import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="blog-label">404 · Page not found</span>
      <h1>This page isn’t here.</h1>
      <p>Try the writing archive or head back to the portfolio.</p>
      <Link className="text-link" href="/blog/">
        Browse all articles →
      </Link>
    </main>
  );
}
