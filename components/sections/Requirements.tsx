import type { Dictionary } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";

type RequirementsProps = {
  dict: Dictionary;
};

export function Requirements({ dict }: RequirementsProps) {
  return (
    <Section className="bg-abyss">
      <SectionHeading
        eyebrow={dict.requirements.eyebrow}
        title={dict.requirements.title}
        align="center"
      />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {dict.requirements.items.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 rounded-panel border border-line bg-panel/60 p-5"
          >
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-lg bg-neon-magenta/10 font-display text-[0.5625rem] text-neon-magenta"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
