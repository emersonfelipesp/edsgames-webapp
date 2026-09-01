import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { route, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/metadata";

const ROUTE_KEYS: RouteKey[] = ["home", "download", "store", "contribute"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTE_KEYS.map((key) => ({
      url: new URL(route(locale, key), SITE_URL).toString(),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
    })),
  );
}
