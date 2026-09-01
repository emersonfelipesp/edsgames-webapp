import { getDictionary, type Locale } from "@/lib/i18n";
import { PageShell } from "@/components/site/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Store } from "@/components/sections/Store";
import { Contact } from "@/components/sections/Contact";

export function StorePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.storePage;

  return (
    <PageShell locale={locale} routeKey="store" dict={dict}>
      <Section className="border-b border-line">
        <SectionHeading eyebrow={page.eyebrow} title={page.title} lead={page.lead} as="h1" />
      </Section>

      <Store locale={locale} dict={dict} compact />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel>
            <h2 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-cyan">
              {page.includedTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {page.included.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <h2 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-cyan">
              {page.howToOrderTitle}
            </h2>
            <ol className="mt-5 space-y-4">
              {page.howToOrder.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-neon-amber/10 font-display text-[0.75rem] text-neon-amber"
                  >
                    {index + 1}
                  </span>
                  <span className="text-base leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <Panel className="mt-6 border-neon-amber/30 bg-neon-amber/5">
          <h2 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-amber">
            {page.disclaimerTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{page.disclaimerBody}</p>
        </Panel>
      </Section>

      <Contact dict={dict} />
    </PageShell>
  );
}
