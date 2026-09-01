import type { Dictionary, Locale } from "@/lib/i18n";
import { route } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import {
  BOX_ART_SOURCES,
  INTERFACE_SOURCES,
  ResponsiveImage,
} from "@/components/ui/ResponsiveImage";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 size-96 rounded-full bg-neon-magenta/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-24 size-96 rounded-full bg-neon-cyan/12 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-neon-lime/40 bg-neon-lime/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-lime">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-neon-lime animate-blink" />
            {dict.hero.badge}
          </p>

          <h1 className="text-glitch mt-6 font-display text-[1.75rem] font-bold uppercase leading-[1.25] text-balance sm:text-5xl lg:text-[3.75rem] lg:leading-[1.15]">
            {dict.hero.title}
          </h1>

          <p className="mt-6 text-base font-semibold uppercase leading-relaxed tracking-wide text-neon-cyan sm:text-lg">
            {dict.hero.subtitle}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg text-pretty">
            {dict.hero.lead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={route(locale, "download")} size="lg">
              {dict.actions.downloadFree}
            </ButtonLink>
            <ButtonLink href={route(locale, "store")} variant="secondary" size="lg">
              {dict.actions.seeStore}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {dict.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-xl font-bold text-neon-amber sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-faint sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative pb-16 sm:pb-20 lg:pb-0">
          {/* The real EmulationStation interface, framed like a CRT. */}
          <div className="relative overflow-hidden rounded-panel border border-line bg-panel p-2 shadow-neon-cyan">
            <ResponsiveImage
              sources={INTERFACE_SOURCES}
              sizes="(max-width: 1024px) 100vw, 560px"
              alt={dict.hero.screenshotAlt}
              width={1600}
              height={892}
              priority
              className="h-auto w-full rounded-xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-xl bg-gradient-to-t from-void/40 to-transparent"
            />
          </div>

          {/* The retail box art, overlapping the frame. */}
          <ResponsiveImage
            sources={BOX_ART_SOURCES}
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
            alt=""
            width={555}
            height={777}
            className="animate-float absolute -bottom-2 right-2 w-28 drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] sm:w-36 lg:-bottom-12 lg:-right-6 lg:w-44"
          />
        </div>
      </div>
    </section>
  );
}
