import type { Dictionary } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { LazyScene } from "@/components/three/LazyScene";

type FeaturesProps = {
  dict: Dictionary;
};

const ACCENTS = [
  "text-neon-magenta",
  "text-neon-cyan",
  "text-neon-amber",
  "text-neon-lime",
] as const;

const ICONS = [
  // Heart — nostalgia
  "M12 21s-7.5-4.7-9.4-9A5.3 5.3 0 0 1 12 6.5 5.3 5.3 0 0 1 21.4 12c-1.9 4.3-9.4 9-9.4 9Z",
  // Tag — free
  "M3 12V4h8l10 10-8 8L3 12Zm4.5-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  // Stack — library
  "M12 3 2 8l10 5 10-5-10-5Zm-8.2 8.7L2 12.5l10 5 10-5-1.8-.8-8.2 4.1-8.2-4.1Z",
  // People — community
  "M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a7 7 0 0 1 14 0v1H2v-1Zm15.2-5.8A6 6 0 0 1 22 20v1h-4v-1a8.9 8.9 0 0 0-.8-3.7Z",
] as const;

export function Features({ dict }: FeaturesProps) {
  return (
    <Section id={SECTION_IDS.features}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center">
        <SectionHeading eyebrow={dict.features.eyebrow} title={dict.features.title} />
        <LazyScene variant="character" className="lg:h-72" />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dict.features.items.map((item, index) => (
          <Panel key={item.title} interactive className="p-6">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className={`size-8 ${ACCENTS[index % ACCENTS.length]}`}
            >
              <path d={ICONS[index % ICONS.length]} />
            </svg>
            <h3 className="mt-5 font-display font-semibold text-sm uppercase leading-relaxed">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
