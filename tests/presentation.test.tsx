import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleList } from "../components/ArticleList";
import { getArticles } from "../lib/articles";
test("blog listing can follow its h1 with h2 article titles", () => {
  const html = renderToStaticMarkup(
    <ArticleList articles={getArticles()} headingLevel={2} />,
  );
  assert.equal((html.match(/<h2>/g) || []).length, 9);
});
