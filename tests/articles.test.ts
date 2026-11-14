import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getArticles } from "../lib/articles";
import manifest from "../content/migration.json";
test("all historical titles, dates and URLs survive migration", () => {
  const articles = getArticles();
  assert.equal(articles.length, 9);
  for (const entry of manifest) {
    const article = articles.find((a) => a.slug === entry.slug)!;
    assert.ok(article);
    assert.equal(article.title, entry.title);
    assert.equal(article.date, entry.date);
    assert.equal(article.legacyUrl, entry.oldUrl);
    assert.ok(article.body.length > 300);
  }
  assert.equal(articles[0].date, "2016-09-17");
});
const fixture = (published: string, extra = "") =>
  `---\ntitle: Test\nslug: test\ndescription: Testing\ndate: '2026-01-01'\ncategory: Testing\npublished: ${published}\n${extra}\n---\nHello world`;
test("drafts are excluded and invalid metadata fails closed", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "articles-"));
  try {
    fs.writeFileSync(path.join(dir, "test.mdx"), fixture("false"));
    assert.deepEqual(getArticles(dir), []);
    fs.writeFileSync(path.join(dir, "test.mdx"), fixture('"true"'));
    assert.throws(() => getArticles(dir), /published/);
    fs.writeFileSync(
      path.join(dir, "test.mdx"),
      fixture("true").replace("'2026-01-01'", "'2026-02-30'"),
    );
    assert.throws(() => getArticles(dir), /date/);
    fs.writeFileSync(
      path.join(dir, "test.mdx"),
      fixture("true").replace("slug: test", "slug: ../escape"),
    );
    assert.throws(() => getArticles(dir), /slug/);
  } finally {
    fs.rmSync(dir, { recursive: true });
  }
});
test("duplicate slugs fail the build", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "articles-"));
  try {
    for (const name of ["a", "b"])
      fs.writeFileSync(path.join(dir, name + ".mdx"), fixture("true"));
    assert.throws(() => getArticles(dir), /Duplicate/);
  } finally {
    fs.rmSync(dir, { recursive: true });
  }
});
