import type { Dictionary, Locale } from "@/lib/i18n";
import { route, SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { ButtonLink } from "@/components/ui/Button";
import { GameShots } from "@/components/media/GameShots";

type StoreProps = {
  locale: Locale;
  dict: Dictionary;
  /** The store page shows the products without repeating the marketing intro. */
  compact?: boolean;
};

export function Store({ locale, dict, compact = false }: StoreProps) {
  return (
    <Section id={SECTION_IDS.store} className="bg-abyss">
      {compact ? (
        // The store page already carries the page title as its `h1`; this keeps
        // the product list from jumping straight from `h1` to `h3`.
        <h2 className="sr-only">{dict.store.title}</h2>
      ) : (
        <SectionHeading
          eyebrow={dict.store.eyebrow}
          title={dict.store.title}
          lead={dict.store.lead}
          align="center"
        />
      )}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {dict.store.products.map((product, index) => (
          <Panel key={product.name} interactive className="flex flex-col overflow-hidden p-0">
            <div
              aria-hidden="true"
              className={
                index === 0
                  ? "bg-grid h-28 bg-gradient-to-br from-neon-cyan/20 via-panel to-panel sm:h-32"
                  : "bg-grid h-28 bg-gradient-to-br from-neon-magenta/20 via-panel to-panel sm:h-32"
              }
            />
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed sm:text-lg">
                  {product.name}
                </h3>
                <span className="rounded-md bg-neon-cyan/10 px-2 py-1 font-display text-[0.75rem] text-neon-cyan">
                  {product.capacity}
                </span>
              </div>
              <p className="mt-3 font-display text-[0.8125rem] font-bold uppercase text-neon-amber">
                {product.highlight}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.systems.map((system) => (
                  <li
                    key={system}
                    className="rounded-md border border-line bg-void px-2.5 py-1.5 text-sm text-muted"
                  >
                    {system}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        ))}
      </div>

      {compact ? null : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-4">
            {dict.store.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
            <p className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-lime">
              {dict.store.shippingNote}
            </p>
            {/* Descriptive on its own: "Learn more" tells a screen-reader user
                cycling through links nothing about where it goes. */}
            <ButtonLink href={route(locale, "store")} size="lg" prefetch={false}>
              {dict.store.cta}
            </ButtonLink>
          </div>

          <div className="grid gap-6">
            <GameShots set="discEra" />
            <div className="rounded-panel border border-line bg-panel p-6">
            <p className="font-display text-[0.75rem] uppercase tracking-[0.2em] text-faint">
              {dict.store.paymentsLabel}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/appmax.webp"
              alt={dict.store.paymentsLabel}
              width={948}
              height={360}
              loading="lazy"
              decoding="async"
              className="mt-4 h-auto w-full rounded-lg bg-white/95 p-3"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/selos-compra-segura.webp"
              alt=""
              width={1024}
              height={130}
              loading="lazy"
              decoding="async"
              className="mt-4 h-auto w-full rounded-lg bg-plate px-2 py-1 opacity-80"
            />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
