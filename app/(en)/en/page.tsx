import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const dict = getDictionary("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  routeKey: "home",
  title: dict.meta.title,
  description: dict.meta.description,
});

export default function Page() {
  return <HomePage locale="en" />;
}
