import type { Dictionary } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";

type FaqProps = {
  dict: Dictionary;
};

/**
 * Native `<details>` elements: keyboard-operable, screen-reader friendly and
 * fully functional with no JavaScript at all.
 */
export function Faq({ dict }: FaqProps) {
  return (
    <Section id={SECTION_IDS.faq}>
      <SectionHeading
        eyebrow={dict.faq.eyebrow}
        title={dict.faq.title}
        align="center"
      />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-panel border border-line bg-panel/60">
        {dict.faq.items.map((item) => (
          <details key={item.question} className="group px-5 py-2 sm:px-7">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-2 font-display font-semibold text-sm uppercase leading-relaxed text-ink">
              {item.question}
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-md border border-line-bright text-neon-cyan transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
