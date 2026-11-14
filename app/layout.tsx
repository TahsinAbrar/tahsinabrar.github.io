import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
const inter = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
import "./globals.css";
import { Header, Footer } from "@/components/Shell";
import { origin, pageMetadata } from "@/lib/metadata";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  ...pageMetadata(
    "Tahsin Abrar — Engineering, Architecture & Leadership",
    "Solution Architect working across backend engineering, distributed systems, software architecture, and engineering mentorship.",
    "/",
  ),
  title: {
    default: "Tahsin Abrar — Engineering, Architecture & Leadership",
    template: "%s | Tahsin Abrar",
  },
  icons: { icon: "/favicon.ico" },
};
const themeScript = `(function(){var q=matchMedia('(prefers-color-scheme: dark)');function apply(){var s;try{s=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=s==='light'||s==='dark'?s:q.matches?'dark':'light'}apply();q.addEventListener('change',apply);window.addEventListener('storage',apply)})()`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.variable}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <Script src="/scripts/analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
