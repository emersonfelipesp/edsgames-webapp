import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

const dict = getDictionary("pt-BR");

export const metadata: Metadata = buildMetadata({
  locale: "pt-BR",
  routeKey: "home",
  title: dict.meta.title,
  description: dict.meta.description,
});

export const viewport: Viewport = {
  themeColor: "#06060c",
  colorScheme: "dark",
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
