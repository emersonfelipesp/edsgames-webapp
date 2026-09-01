import type { Metadata } from "next";
import { StorePage } from "@/components/pages/StorePage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const dict = getDictionary("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  routeKey: "store",
  title: dict.meta.storeTitle,
  description: dict.meta.storeDescription,
});

export default function Page() {
  return <StorePage locale="en" />;
}
