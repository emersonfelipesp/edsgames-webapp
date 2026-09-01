import type { Dictionary } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";

type ContactProps = {
  dict: Dictionary;
};

export function Contact({ dict }: ContactProps) {
  return (
    <Section id={SECTION_IDS.contact}>
      <Panel className="mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          lead={dict.contact.description}
          align="center"
        />
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-display text-[0.5625rem] uppercase tracking-[0.2em] text-neon-cyan">
              {dict.contact.hoursLabel}
            </dt>
            <dd className="mt-3 text-sm text-muted">{dict.contact.hours}</dd>
          </div>
          <div>
            <dt className="font-display text-[0.5625rem] uppercase tracking-[0.2em] text-neon-cyan">
              {dict.contact.emailLabel}
            </dt>
            <dd className="mt-3">
              <a
                href={`mailto:${dict.contact.email}`}
                className="text-sm text-ink underline decoration-neon-cyan/60 underline-offset-4 transition-colors hover:text-neon-cyan"
              >
                {dict.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </Panel>
    </Section>
  );
}
