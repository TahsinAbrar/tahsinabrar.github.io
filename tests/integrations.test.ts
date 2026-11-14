import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { commentPage } from "../lib/comments";
import manifest from "../content/migration.json";

test("migrated comments retain original dated URL lookup without new identifiers", () => {
  for (const entry of manifest) {
    const page = commentPage(entry.slug, entry.title, entry.oldUrl);
    assert.equal(page.url, "https://tahsinabrar.com" + entry.oldUrl);
    assert.equal("identifier" in page, false);
  }
  assert.equal(commentPage("future-post", "Future").identifier, "article:future-post");
});

test("analytics uses owner-selected ID, initializes once, and excludes previews", () => {
  const source = fs.readFileSync("public/scripts/analytics.js", "utf8");
  for (const hostname of ["127.0.0.1", "localhost", "preview.example.com", "tahsinabrar.com", "www.tahsinabrar.com"]) {
    const scripts: { src: string }[] = [];
    const window: { dataLayer?: unknown[][] } = {};
    const context = vm.createContext({ window, location: { hostname }, document: {
      createElement: () => ({}), head: { appendChild: (script: { src: string }) => scripts.push(script) },
    }});
    vm.runInContext(source, context);
    vm.runInContext(source, context);
    const production = ["tahsinabrar.com", "www.tahsinabrar.com"].includes(hostname);
    assert.equal(scripts.length, production ? 1 : 0);
    if (production) {
      assert.match(scripts[0].src, /id=G-0CVZ3VWFXZ$/);
      assert.equal(window.dataLayer?.length, 2);
      assert.equal(window.dataLayer?.[1][1], "G-0CVZ3VWFXZ");
    } else assert.equal(window.dataLayer, undefined);
  }
});
