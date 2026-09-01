import { getDictionary, type Locale } from "@/lib/i18n";
import { PageShell } from "@/components/site/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PixSection } from "@/components/sections/PixSection";

export function ContributePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale} routeKey="contribute" dict={dict}>
      <Section className="border-b border-line">
        <SectionHeading
          eyebrow={dict.pix.eyebrow}
          title={dict.pix.title}
          lead={dict.pix.lead}
          as="h1"
          align="center"
        />
      </Section>
      <PixSection dict={dict} withHeading={false} />
    </PageShell>
  );
}
