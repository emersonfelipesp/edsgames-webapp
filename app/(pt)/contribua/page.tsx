import type { Metadata } from "next";
import { ContributePage } from "@/components/pages/ContributePage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const dict = getDictionary("pt-BR");

export const metadata: Metadata = buildMetadata({
  locale: "pt-BR",
  routeKey: "contribute",
  title: dict.meta.contributeTitle,
  description: dict.meta.contributeDescription,
});

export default function Page() {
  return <ContributePage locale="pt-BR" />;
}
