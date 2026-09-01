import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const dict = getDictionary("pt-BR");
const enDict = getDictionary("en");

/**
 * With two root layouts there is no shared shell for the 404 page, so it
 * renders its own document. It is bilingual because a visitor arriving on an
 * unknown URL has not chosen a language yet.
 */
export default function NotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="antialiased">
        <main className="grid min-h-dvh place-items-center px-5 py-20 text-center">
          <div>
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-neon-magenta">
              404
            </p>
            <h1 className="text-glitch mt-5 font-display font-semibold text-2xl uppercase sm:text-4xl">
              {dict.notFound.title}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
              {dict.notFound.description}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-faint" lang="en">
              {enDict.notFound.description}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-neon-amber px-5 font-display font-semibold text-xs uppercase text-void"
              >
                {dict.actions.backToHome}
              </Link>
              <Link
                href="/en/"
                lang="en"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line-bright px-5 font-display font-semibold text-xs uppercase text-muted"
              >
                {enDict.actions.backToHome}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
