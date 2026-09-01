import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { route, SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { ButtonLink } from "@/components/ui/Button";
import { LazyScene } from "@/components/three/LazyScene";

type StoreProps = {
  locale: Locale;
  dict: Dictionary;
  /** The store page shows the products without repeating the marketing intro. */
  compact?: boolean;
};

export function Store({ locale, dict, compact = false }: StoreProps) {
  return (
    <Section id={SECTION_IDS.store} className="bg-abyss">
      {compact ? null : (
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
                <h3 className="font-display font-semibold text-sm uppercase leading-relaxed sm:text-base">
                  {product.name}
                </h3>
                <span className="rounded-md bg-neon-cyan/10 px-2 py-1 font-display font-semibold text-xs text-neon-cyan">
                  {product.capacity}
                </span>
              </div>
              <p className="mt-3 font-display font-semibold text-sm uppercase text-neon-amber">
                {product.highlight}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.systems.map((system) => (
                  <li
                    key={system}
                    className="rounded-md border border-line bg-void px-2.5 py-1.5 text-xs text-muted"
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
              <p key={paragraph} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
            <p className="font-display font-semibold text-sm uppercase leading-relaxed text-neon-lime">
              {dict.store.shippingNote}
            </p>
            <ButtonLink href={route(locale, "store")} size="lg">
              {dict.actions.learnMore}
            </ButtonLink>
          </div>

          <div className="grid gap-6">
            <LazyScene variant="gamepad" className="h-48 sm:h-56 lg:h-56" />
            <div className="rounded-panel border border-line bg-panel p-6">
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-faint">
              {dict.store.paymentsLabel}
            </p>
            <Image
              src="/img/appmax.webp"
              alt={dict.store.paymentsLabel}
              width={948}
              height={360}
              className="mt-4 h-auto w-full rounded-lg bg-white/95 p-3"
            />
            <Image
              src="/img/selos-compra-segura.webp"
              alt=""
              width={1024}
              height={130}
              className="mt-4 h-auto w-full opacity-80"
            />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
