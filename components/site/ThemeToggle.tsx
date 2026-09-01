"use client";

import type { Dictionary } from "@/lib/i18n";
import {
  nextThemePreference,
  setThemePreference,
  useThemePreference,
  type ThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  dict: Dictionary;
  className?: string;
};

const ICONS: Record<ThemePreference, string> = {
  // Monitor — follow the operating system
  system:
    "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6v2h3v2H7v-2h3v-2H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v7h14V7H5Z",
  // Sun
  light:
    "M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-1-13h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.2 5.6l1.4-1.4 2.2 2.1L6.4 7.7 4.2 5.6Zm12 12 1.4-1.4 2.2 2.1-1.4 1.5-2.2-2.2Zm3.6-12-2.2 2.1-1.4-1.4 2.2-2.1 1.4 1.4ZM7.8 17.6l-2.2 2.2-1.4-1.5 2.2-2.1 1.4 1.4Z",
  // Moon
  dark: "M12.7 2a9 9 0 1 0 9.3 10.7A7.5 7.5 0 0 1 12.7 2Z",
};

/**
 * One button that cycles: follow the system, force light, force dark.
 *
 * "System" is a first-class state rather than an implicit default, so a visitor
 * who once chose a theme can hand control back to their operating system. It is
 * also the state the site ships in — the inline theme bootstrap writes nothing
 * unless a choice has been stored.
 */
export function ThemeToggle({ dict, className }: ThemeToggleProps) {
  const preference = useThemePreference();
  const next = nextThemePreference(preference);

  return (
    <button
      type="button"
      onClick={() => setThemePreference(next)}
      title={dict.theme.current[preference]}
      aria-label={`${dict.theme.current[preference]}. ${dict.theme.switchTo[next]}`}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line",
        "text-muted transition-colors hover:border-neon-cyan hover:text-neon-cyan",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
        <path d={ICONS[preference]} />
      </svg>
    </button>
  );
}
