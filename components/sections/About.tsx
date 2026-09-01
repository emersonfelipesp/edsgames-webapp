import type { Dictionary } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { GameShots } from "@/components/media/GameShots";

type AboutProps = {
  dict: Dictionary;
};

export function About({ dict }: AboutProps) {
  return (
    <Section id={SECTION_IDS.about}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow={dict.about.eyebrow} title={dict.about.title} />
          <div className="mt-6 space-y-5">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <Panel className="mt-8 border-neon-amber/30 bg-neon-amber/5">
            <p className="font-display text-[0.75rem] uppercase leading-relaxed text-neon-amber">
              {dict.about.storageNote.title}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {dict.about.storageNote.description}
            </p>
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <GameShots set="sixteenBit" />
          {dict.about.systems.map((system, index) => (
            <Panel key={system.name} interactive>
              <p
                className={
                  index === 0
                    ? "font-display text-[0.75rem] uppercase tracking-[0.2em] text-neon-cyan"
                    : "font-display text-[0.75rem] uppercase tracking-[0.2em] text-neon-magenta"
                }
              >
                {system.kind}
              </p>
              <h3 className="mt-3 font-display text-sm font-bold uppercase leading-relaxed sm:text-xl">
                {system.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{system.description}</p>
            </Panel>
          ))}
        </div>
      </div>
    </Section>
  );
}
