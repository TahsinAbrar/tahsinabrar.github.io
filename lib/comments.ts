export function commentPage(slug: string, title: string, legacyUrl?: string) {
  // The original embed used URL lookup (no identifier). Never give migrated
  // posts a new slug identifier: that risks starting an unrelated thread.
  return {
    url: `https://tahsinabrar.com${legacyUrl ?? `/blog/${slug}/`}`,
    title,
    ...(legacyUrl ? {} : { identifier: `article:${slug}` }),
  };
}
