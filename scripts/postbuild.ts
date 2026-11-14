import fs from "node:fs";
import path from "node:path";
import { getArticles } from "../lib/articles";
import { origin } from "../lib/metadata";
const articles = getArticles();
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
const aliases: Record<string, string> = {
  "/about/": "/#about",
  "/resume/": "/#experience",
  "/page2/": "/blog/",
};
for (const a of articles)
  if (a.legacyUrl) aliases[a.legacyUrl] = "/blog/" + a.slug + "/";
for (const [old, target] of Object.entries(aliases)) {
  const dir = path.join("out", old);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page moved | Tahsin Abrar</title><link rel="canonical" href="${origin + target}"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${target}"></head><body><main><h1>This page has moved</h1><p><a href="${target}">Continue to ${escape(target)}</a></p></main></body></html>`,
  );
}
// Historical Jekyll paths included /public/; preserve exact original bytes there.
for (const entry of [
  "images",
  "css",
  "favicon.ico",
  "apple-touch-icon-precomposed.png",
]) {
  fs.mkdirSync("out/public", { recursive: true });
  fs.cpSync(path.join("public", entry), path.join("out/public", entry), {
    recursive: true,
  });
}
fs.writeFileSync("out/.nojekyll", "");
fs.writeFileSync(
  "out/atom.xml",
  `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Tahsin Abrar — Writing</title><link href="${origin}/atom.xml" rel="self"/><link href="${origin}/blog/"/><id>${origin}/</id><updated>${articles[0]?.date ?? "2026-11-14"}T00:00:00Z</updated><author><name>Tahsin Abrar</name></author>${articles.map((a) => `<entry><title>${escape(a.title)}</title><link href="${origin}/blog/${a.slug}/"/><id>${origin}${a.legacyUrl?.replace(/\/$/, "") ?? "/blog/" + a.slug + "/"}</id><updated>${a.updatedAt ?? a.date}T00:00:00Z</updated><summary>${escape(a.description)}</summary></entry>`).join("")}</feed>`,
);
console.log(
  `Generated ${Object.keys(aliases).length} compatibility pages, legacy assets and Atom feed.`,
);
