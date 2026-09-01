import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-16 sm:py-24", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "mt-3 font-display font-bold uppercase leading-[1.25] text-balance",
          Tag === "h1"
            ? "text-3xl sm:text-5xl lg:text-6xl"
            : "text-2xl sm:text-3xl lg:text-4xl",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg text-pretty">{lead}</p>
      ) : null}
    </header>
  );
}
