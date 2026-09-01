import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const dict = getDictionary("pt-BR");

export const metadata: Metadata = buildMetadata({
  locale: "pt-BR",
  routeKey: "home",
  title: dict.meta.title,
  description: dict.meta.description,
});

export default function Page() {
  return <HomePage locale="pt-BR" />;
}
