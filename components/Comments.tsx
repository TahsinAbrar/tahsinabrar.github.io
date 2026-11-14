"use client";

import { useEffect } from "react";
import { commentPage } from "@/lib/comments";

type Page = ReturnType<typeof commentPage>;
type Config = (this: { page: Page }) => void;
declare global {
  interface Window {
    disqus_config?: Config;
    DISQUS?: { reset: (options: { reload: boolean; config: Config }) => void };
  }
}

export default function Comments(props: { slug: string; title: string; legacyUrl?: string }) {
  const { slug, title, legacyUrl } = props;
  useEffect(() => {
    if (!["tahsinabrar.com", "www.tahsinabrar.com"].includes(location.hostname)) return;
    const config: Config = function () {
      this.page = commentPage(slug, title, legacyUrl);
    };
    window.disqus_config = config;
    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true, config });
    } else if (!document.getElementById("disqus-embed")) {
      const script = document.createElement("script");
      script.id = "disqus-embed";
      script.src = "https://tahsinabrar.disqus.com/embed.js";
      script.async = true;
      script.dataset.timestamp = String(Date.now());
      document.head.appendChild(script);
    }
  }, [slug, title, legacyUrl]);

  return (
    <section className="related" aria-label="Comments">
      <h2>Comments</h2>
      <div id="disqus_thread">
        <p>Disqus comments load on the published website. Local previews do not connect to the live discussion.</p>
      </div>
      <noscript>Please enable JavaScript to view Disqus comments.</noscript>
    </section>
  );
}
