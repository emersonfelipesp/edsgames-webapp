import type { Locale } from "./i18n";

/**
 * Every route exists twice: Brazilian Portuguese at the site root and English
 * under `/en`. Keeping the mapping in one table means the language toggle can
 * always send a visitor to the same page in the other language instead of
 * dropping them on the home page.
 */
export type RouteKey = "home" | "download" | "store" | "contribute";

const PATHS: Record<Locale, Record<RouteKey, string>> = {
  "pt-BR": {
    home: "/",
    download: "/download/",
    store: "/loja/",
    contribute: "/contribua/",
  },
  en: {
    home: "/en/",
    download: "/en/download/",
    store: "/en/store/",
    contribute: "/en/contribute/",
  },
};

export function route(locale: Locale, key: RouteKey): string {
  return PATHS[locale][key];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt-BR" ? "en" : "pt-BR";
}

/** Anchors on the home page, shared by both languages. */
export const SECTION_IDS = {
  about: "sobre",
  features: "recursos",
  store: "loja",
  contribute: "contribua",
  faq: "faq",
  contact: "contato",
} as const;
