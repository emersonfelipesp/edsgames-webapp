import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { otherLocale, route, type RouteKey } from "@/lib/routes";
import { cn } from "@/lib/cn";

type LanguageToggleProps = {
  locale: Locale;
  routeKey: RouteKey;
  dict: Dictionary;
  className?: string;
};

/**
 * A plain pair of links rather than a client-side switcher. It works without
 * JavaScript, needs no state, and always lands on the same page in the other
 * language instead of bouncing the visitor back to the home page.
 */
export function LanguageToggle({ locale, routeKey, dict, className }: LanguageToggleProps) {
  const other = otherLocale(locale);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-line bg-panel p-0.5",
        className,
      )}
      role="group"
      aria-label={dict.footer.languageLabel}
    >
      {/* Below `sm` the header has to fit a logo, this control, the theme
          toggle and the menu button on a 320 px screen, so the current-locale
          chip drops and only the switch link remains. `sm:grid` is a responsive
          variant, so it beats `hidden` inside the media query — unlike two
          unprefixed display utilities, which resolve by stylesheet order. */}
      <span
        aria-current="true"
        className="hidden min-h-11 min-w-11 place-items-center rounded-md bg-neon-cyan/15 px-2.5 font-display text-[0.75rem] leading-none text-neon-cyan sm:grid"
      >
        {dict.localeShort}
      </span>
      <Link
        href={route(other, routeKey)}
        hrefLang={other}
        lang={other}
        className="grid min-h-11 min-w-11 place-items-center rounded-md px-2.5 font-display text-[0.75rem] leading-none text-muted transition-colors hover:text-ink"
      >
        <span className="sr-only">{dict.otherLocaleName}</span>
        <span aria-hidden="true">{dict.otherLocaleShort}</span>
      </Link>
    </div>
  );
}
