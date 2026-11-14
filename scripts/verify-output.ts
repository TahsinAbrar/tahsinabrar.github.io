import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { load } from "cheerio";
import { getArticles } from "../lib/articles";
import manifest from "../content/migration.json";
const out = "out";
assert.ok(fs.existsSync(out), "static export must exist");
assert.equal(fs.readFileSync(out + "/CNAME", "utf8").trim(), "tahsinabrar.com");
for (const file of [
  ".nojekyll",
  "index.html",
  "blog/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "atom.xml",
  "og-image.png",
])
  assert.ok(fs.existsSync(path.join(out, file)), file);
for (const entry of manifest) {
  const html = fs.readFileSync(
    path.join(out, entry.newUrl, "index.html"),
    "utf8",
  );
  const $ = load(html);
  assert.equal($("h1").text(), entry.title);
  assert.equal($("#disqus_thread").length, 1, "article comment mount");
  assert.ok($(`time[datetime="${entry.date}"]`).length);
  assert.equal(
    $("link[rel=canonical]").attr("href"),
    "https://tahsinabrar.com" + entry.newUrl,
  );
  const legacy = load(
    fs.readFileSync(path.join(out, entry.oldUrl, "index.html"), "utf8"),
  );
  assert.equal(legacy("a").attr("href"), entry.newUrl);
  assert.ok(
    legacy("meta[http-equiv=refresh]").attr("content")?.includes(entry.newUrl),
  );
}
const published = getArticles();
const sitemap = fs.readFileSync(out + "/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, published.length + 2);
for (const a of published) assert.ok(sitemap.includes("/blog/" + a.slug + "/"));
function walk(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
}
let checked = 0;
for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
  const text = fs.readFileSync(file, "utf8");
  assert.ok(
    !/mailto:|abrar\.cste|admin@admin\.com/.test(
      text,
    ),
    `private contact exposure: ${file}`,
  );
  const $ = load(text);
  $("pre").each((_, element) => {
    assert.equal(
      $(element).attr("tabindex"),
      "0",
      "code blocks must support keyboard scrolling: " + file,
    );
  });
  let previousHeading = 0;
  $("h1,h2,h3,h4,h5,h6").each((_, element) => {
    const level = Number(element.tagName.slice(1));
    assert.ok(level <= previousHeading + 1, "skipped heading level in " + file);
    previousHeading = level;
  });
  for (const element of $(
    "a[href],img[src],script[src],link[href]",
  ).toArray()) {
    const value = $(element).attr("href") ?? $(element).attr("src");
    if (!value || !value.startsWith("/") || value.startsWith("//")) continue;
    const target = value.split(/[?#]/)[0];
    let local = path.join(out, decodeURIComponent(target));
    if (target.endsWith("/")) local = path.join(local, "index.html");
    assert.ok(fs.existsSync(local), `missing ${value} in ${file}`);
    checked++;
    if (value.includes("#")) {
      const fragment = value.split("#")[1];
      const targetFile = fs.statSync(local).isDirectory()
        ? path.join(local, "index.html")
        : local;
      assert.ok(
        load(fs.readFileSync(targetFile, "utf8"))(`[id="${fragment}"]`).length,
        `missing anchor ${value}`,
      );
    }
  }
}
for (const file of walk("public").filter((f) => !f.endsWith("CNAME"))) {
  const relative = path.relative("public", file);
  assert.ok(fs.existsSync(path.join(out, relative)), relative);
}
console.log(
  `Verified ${published.length} articles, ${manifest.length} redirects, canonical metadata, sitemap, CNAME, privacy and ${checked} local links/assets.`,
);
