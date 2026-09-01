import { ptBR, type Dictionary } from "./pt-BR";
import { en } from "./en";

export type Locale = "pt-BR" | "en";

export const LOCALES: readonly Locale[] = ["pt-BR", "en"];
export const DEFAULT_LOCALE: Locale = "pt-BR";

const DICTIONARIES: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
