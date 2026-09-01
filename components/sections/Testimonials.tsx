import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";

type TestimonialsProps = {
  dict: Dictionary;
};

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <Section>
      <SectionHeading
        eyebrow={dict.testimonials.eyebrow}
        title={dict.testimonials.title}
        align="center"
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {dict.testimonials.items.map((item) => (
          <li key={item.name}>
            <Panel className="flex h-full flex-col">
              <figure className="flex h-full flex-col">
              <blockquote className="flex-1 text-sm leading-relaxed text-ink sm:text-base">
                <span aria-hidden="true" className="mr-1 text-neon-magenta">
                  &ldquo;
                </span>
                {item.quote}
                <span aria-hidden="true" className="ml-1 text-neon-magenta">
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                <Image
                  src={item.avatar}
                  alt=""
                  width={80}
                  height={80}
                  className="size-11 rounded-full border border-line object-cover"
                />
                <span>
                  <span className="block font-display text-[0.625rem] uppercase leading-relaxed">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs text-faint">{item.role}</span>
                </span>
              </figcaption>
              </figure>
            </Panel>
          </li>
        ))}
      </ul>
    </Section>
  );
}
