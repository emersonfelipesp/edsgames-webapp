import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

const dict = getDictionary("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  routeKey: "home",
  title: dict.meta.title,
  description: dict.meta.description,
});

export const viewport: Viewport = {
  themeColor: "#06060c",
  colorScheme: "dark",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
