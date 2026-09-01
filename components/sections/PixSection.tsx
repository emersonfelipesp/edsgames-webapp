import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/routes";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { CopyPixButton } from "@/components/ui/CopyPixButton";
import { PIX_QR_IMAGE, PIX_RECEIVER } from "@/lib/pix";

type PixSectionProps = {
  dict: Dictionary;
  /** The standalone page renders its own heading, so it can hide this one. */
  withHeading?: boolean;
};

export function PixSection({ dict, withHeading = true }: PixSectionProps) {
  const { pix } = dict;

  return (
    <Section id={SECTION_IDS.contribute} className="bg-abyss">
      {withHeading ? (
        <SectionHeading
          eyebrow={pix.eyebrow}
          title={pix.title}
          lead={pix.lead}
          align="center"
        />
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <Panel className="flex flex-col items-center gap-6 text-center">
          <div className="w-full max-w-70 overflow-hidden rounded-xl bg-white p-3">
            <Image
              src={PIX_QR_IMAGE}
              alt={pix.qrAlt}
              width={1080}
              height={1350}
              className="h-auto w-full"
            />
          </div>
          <CopyPixButton
            label={pix.copyButton}
            copiedLabel={pix.copied}
            failedLabel={pix.copyFailed}
            keyLabel={pix.keyLabel}
          />
          <dl className="w-full border-t border-line pt-5 text-left text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <dt className="text-faint">{pix.receiverLabel}</dt>
              <dd className="font-mono text-muted">{PIX_RECEIVER}</dd>
            </div>
            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <dt className="text-faint">PIX</dt>
              <dd className="text-muted">{pix.receiverCity}</dd>
            </div>
          </dl>
        </Panel>

        <div className="grid gap-6">
          <Panel>
            <h3 className="font-display text-sm uppercase leading-relaxed text-neon-cyan">
              {pix.howToTitle}
            </h3>
            <ol className="mt-5 space-y-4">
              {pix.howToSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 font-display text-[0.625rem] text-neon-cyan"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel>
            <h3 className="font-display text-sm uppercase leading-relaxed text-neon-magenta">
              {pix.useTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{pix.useDescription}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{pix.description}</p>
          </Panel>
        </div>
      </div>
    </Section>
  );
}
