import type { Metadata } from "next";
export const origin = "https://tahsinabrar.com";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  article?: { date: string; updatedAt?: string },
): Metadata {
  const url = origin + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tahsin Abrar",
      locale: "en_US",
      type: article ? "article" : "website",
      ...(article
        ? {
            publishedTime: article.date,
            modifiedTime: article.updatedAt ?? article.date,
          }
        : {}),
      images: [
        {
          url: origin + "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Tahsin Abrar — Engineering, architecture, and leadership",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [origin + "/og-image.png"],
    },
  };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
