import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { route, SECTION_IDS, type RouteKey } from "@/lib/routes";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { LOGO_SOURCES, ResponsiveImage } from "@/components/ui/ResponsiveImage";

type FooterProps = {
  locale: Locale;
  routeKey: RouteKey;
  dict: Dictionary;
};

export function Footer({ locale, routeKey, dict }: FooterProps) {
  const home = route(locale, "home");
  const year = new Date().getFullYear();

  const links = [
    { label: dict.nav.home, href: home },
    { label: dict.nav.download, href: route(locale, "download") },
    { label: dict.nav.store, href: route(locale, "store") },
    { label: dict.nav.contribute, href: route(locale, "contribute") },
    { label: dict.nav.faq, href: `${home}#${SECTION_IDS.faq}` },
  ];

  return (
    <footer className="border-t border-line bg-abyss">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <ResponsiveImage
            sources={LOGO_SOURCES}
            sizes="194px"
            alt={dict.meta.siteName}
            width={1032}
            height={298}
            className="h-14 w-auto rounded-lg bg-plate object-contain px-2 py-1"
          />
          <p className="mt-4 max-w-xs text-base leading-relaxed text-muted">{dict.footer.tagline}</p>
          <div className="mt-6 flex items-center gap-2">
            <LanguageToggle locale={locale} routeKey={routeKey} dict={dict} />
            <ThemeToggle dict={dict} />
          </div>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <h2 className="font-display text-[0.75rem] uppercase tracking-[0.2em] text-neon-cyan">
            {dict.footer.navTitle}
          </h2>
          <ul className="mt-2">
            {links.map((link) => (
              <li key={link.href}>
                {/* Footer links are not a likely next click, and prefetching all
                    of them pulled ~46 KB of RSC payload on first load - more
                    than the document itself. */}
                <Link
                  href={link.href}
                  prefetch={false}
                  className="flex min-h-11 items-center text-base text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-[0.75rem] uppercase tracking-[0.2em] text-neon-cyan">
            {dict.footer.contactTitle}
          </h2>
          <p className="mt-4 text-base text-muted">{dict.contact.hours}</p>
          <a
            href={`mailto:${dict.contact.email}`}
            className="mt-1 inline-flex min-h-11 items-center text-base text-ink underline decoration-neon-cyan/60 underline-offset-4 transition-colors hover:text-neon-cyan"
          >
            {dict.contact.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
          <p className="text-sm leading-relaxed text-faint">{dict.footer.disclaimer}</p>
          <p className="mt-3 text-sm text-faint">
            © {year} EDSGAMES. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
