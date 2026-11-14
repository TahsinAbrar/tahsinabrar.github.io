import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import manifest from "../content/migration.json" with { type: "json" };

test("every migrated article keeps its slug, date and legacy URL", () => {
  assert.equal(manifest.length, 9);
  for (const entry of manifest) {
    assert.ok(
      fs.existsSync(`content/articles/${entry.slug}.mdx`),
      entry.slug,
    );
    assert.match(entry.oldUrl, /^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9-]+\/$/);
    assert.equal(entry.newUrl, `/blog/${entry.slug}/`);
  }
});
