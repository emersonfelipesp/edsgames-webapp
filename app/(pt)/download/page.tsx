import type { Metadata } from "next";
import { DownloadPage } from "@/components/pages/DownloadPage";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

const dict = getDictionary("pt-BR");

export const metadata: Metadata = buildMetadata({
  locale: "pt-BR",
  routeKey: "download",
  title: dict.meta.downloadTitle,
  description: dict.meta.downloadDescription,
});

export default function Page() {
  return <DownloadPage locale="pt-BR" />;
}
