import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import { CONTENT_SECURITY_POLICY } from "@/lib/csp";
import { THEME_INIT_SCRIPT } from "@/lib/theme-init-script";
import "../globals.css";

const dict = getDictionary("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  routeKey: "home",
  title: dict.meta.title,
  description: dict.meta.description,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f9" },
    { media: "(prefers-color-scheme: dark)", color: "#06060c" },
  ],
  colorScheme: "light dark",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Applies a stored theme choice before the first paint, so a visitor
            who forced light or dark never sees the other one flash. Inlined
            rather than fetched: as an external file this cost 304 ms of
            render-blocking time on mobile for 1.1 KB. It is a frozen constant
            with nothing interpolated, so no `dangerouslySetInnerHTML` is
            needed - React renders a string child of `<script>` as script text. */}
        <script>{THEME_INIT_SCRIPT}</script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
