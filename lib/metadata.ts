import type { Metadata } from "next";
import { getDictionary, type Locale } from "./i18n";
import { otherLocale, route, type RouteKey } from "./routes";

export const SITE_URL = "https://www.edsgames.com.br";

type PageMetaInput = {
  locale: Locale;
  routeKey: RouteKey;
  title: string;
  description: string;
};

export function buildMetadata({
  locale,
  routeKey,
  title,
  description,
}: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const path = route(locale, routeKey);
  const other = otherLocale(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": route("pt-BR", routeKey),
        en: route("en", routeKey),
        [other]: route(other, routeKey),
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      title,
      description,
      url: path,
      images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/og.jpg"],
    },
    robots: { index: true, follow: true },
  };
}
