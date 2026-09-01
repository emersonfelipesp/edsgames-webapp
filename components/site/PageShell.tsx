import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";
import { Header } from "./Header";
import { Footer } from "./Footer";

type PageShellProps = {
  locale: Locale;
  routeKey: RouteKey;
  dict: Dictionary;
  children: ReactNode;
};

export function PageShell({ locale, routeKey, dict, children }: PageShellProps) {
  return (
    <div className="crt-scanlines flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-lg focus:bg-neon-amber focus:px-4 focus:font-display font-semibold focus:text-xs focus:uppercase focus:text-void"
      >
        {dict.nav.skipToContent}
      </a>
      <Header locale={locale} routeKey={routeKey} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} routeKey={routeKey} dict={dict} />
    </div>
  );
}
