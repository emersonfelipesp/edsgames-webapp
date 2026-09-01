import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";
import { PageShell } from "@/components/site/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { ButtonLink } from "@/components/ui/Button";
import { LazyScene } from "@/components/three/LazyScene";

export function DownloadPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.downloadPage;

  return (
    <PageShell locale={locale} routeKey="download" dict={dict}>
      <Section className="border-b border-line">
        <SectionHeading
          eyebrow={page.eyebrow}
          title={page.title}
          lead={page.lead}
          as="h1"
        />
        <div className="mt-8 space-y-4">
          {page.beforeYouStart.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section className="bg-abyss">
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel>
            <h2 className="font-display font-semibold text-sm uppercase leading-relaxed text-neon-cyan">
              {page.requirementsTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{page.requirements}</p>
          </Panel>
          <Panel>
            <h2 className="font-display font-semibold text-sm uppercase leading-relaxed text-neon-cyan">
              {page.needTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {page.needItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel className="mt-6 border-red-500/40 bg-red-500/8">
          <h2 className="font-display font-semibold text-sm uppercase leading-relaxed text-red-400">
            {page.warningTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink">{page.warningBody}</p>
        </Panel>
      </Section>

      <Section>
        <SectionHeading title={page.toolsTitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.tools.map((tool) => (
            <Panel key={tool.name} interactive className="flex flex-col gap-4">
              <div>
                <h3 className="font-display font-semibold text-sm uppercase leading-relaxed">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{tool.description}</p>
              </div>
              <ButtonLink href={tool.href} external variant="secondary" className="self-start">
                {tool.name}
              </ButtonLink>
            </Panel>
          ))}
        </div>
      </Section>

      <Section className="bg-abyss">
        <SectionHeading title={page.downloadsTitle} lead={page.downloadsNote} />
        <LazyScene variant="cartridges" className="mt-8 h-44 sm:h-52 lg:h-56" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {page.downloads.map((item) => (
            <Panel key={item.name} interactive className="flex flex-col gap-5">
              <div>
                <h3 className="font-display font-semibold text-sm uppercase leading-relaxed text-neon-amber">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <ButtonLink href={item.href} external size="lg" className="mt-auto self-start">
                {dict.actions.downloadFree}
              </ButtonLink>
            </Panel>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-faint">{page.expandNote}</p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={page.stepsTitle} />
            <ol className="mt-8 space-y-5">
              {page.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-neon-cyan/10 font-display font-semibold text-xs text-neon-cyan"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title={page.retrobatTitle} />
            <ol className="mt-8 space-y-5">
              {page.retrobatSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-neon-magenta/10 font-display font-semibold text-xs text-neon-magenta"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="bg-abyss">
        <Image
          src="/img/consoles.webp"
          alt={page.gamesListAlt}
          width={1080}
          height={1350}
          className="mx-auto h-auto w-full max-w-4xl rounded-panel border border-line"
        />
      </Section>
    </PageShell>
  );
}
