"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { route, SECTION_IDS, type RouteKey } from "@/lib/routes";
import { LanguageToggle } from "./LanguageToggle";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type HeaderProps = {
  locale: Locale;
  routeKey: RouteKey;
  dict: Dictionary;
};

export function Header({ locale, routeKey, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const home = route(locale, "home");

  const links = [
    { label: dict.nav.about, href: `${home}#${SECTION_IDS.about}` },
    { label: dict.nav.features, href: `${home}#${SECTION_IDS.features}` },
    { label: dict.nav.store, href: route(locale, "store") },
    { label: dict.nav.contribute, href: route(locale, "contribute") },
    { label: dict.nav.faq, href: `${home}#${SECTION_IDS.faq}` },
  ];

  // The drawer is a full-screen overlay on small viewports, so the page behind
  // it must not scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-void/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:h-20 sm:px-8">
        <Link href={home} className="flex shrink-0 items-center" aria-label={dict.meta.siteName}>
          <Image
            src="/img/logo.png"
            alt={dict.meta.siteName}
            width={1032}
            height={298}
            priority
            className="h-11 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label={dict.nav.menu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 font-display text-[0.625rem] uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <LanguageToggle locale={locale} routeKey={routeKey} dict={dict} />
          {/* Wrapped rather than given `hidden` directly: the button's own
              `inline-flex` is a display utility too, and which one wins depends
              on stylesheet order rather than on the order of the class names. */}
          <div className="hidden sm:block">
            <ButtonLink href={route(locale, "download")}>{dict.nav.download}</ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-200",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-abyss lg:hidden"
      >
        <nav className="mx-auto w-full max-w-6xl px-5 py-4" aria-label={dict.nav.menu}>
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line/60 font-display text-[0.6875rem] uppercase tracking-wide text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={route(locale, "download")}
            size="lg"
            className="mt-5 w-full"
          >
            {dict.actions.downloadFree}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
