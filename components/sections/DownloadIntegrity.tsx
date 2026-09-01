import type { Dictionary } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";

type DownloadIntegrityProps = {
  dict: Dictionary;
};

/**
 * File-integrity guidance for the download page.
 *
 * These downloads are bootable system images that a visitor writes to a disk,
 * destroying whatever was on it. They travel through a third-party unlock page
 * and are unsigned, so a swapped file would be installed and booted with
 * nothing to catch it.
 *
 * Each entry in `downloadPage.downloads` carries a `checksum`. While it is
 * `null` this renders an honest "not verified yet" advisory rather than a
 * placeholder — a fake hash is worse than none, because a visitor would compare
 * against it and believe the answer.
 */
export function DownloadIntegrity({ dict }: DownloadIntegrityProps) {
  const page = dict.downloadPage;

  return (
    <Section className="bg-abyss">
      <SectionHeading title={page.integrityTitle} lead={page.integrityLead} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {page.downloads.map((item) => (
          <Panel key={item.name}>
            <h3 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-amber">
              {item.name}
            </h3>
            {item.checksum ? (
              <>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-faint">
                  {page.checksumLabel}
                </p>
                <code className="mt-2 block overflow-x-auto rounded-lg border border-line bg-void p-3 font-mono text-sm leading-relaxed text-muted">
                  {item.checksum}
                </code>
              </>
            ) : (
              <p className="mt-4 text-base leading-relaxed text-muted">
                {page.integrityUnverified}
              </p>
            )}
          </Panel>
        ))}
      </div>

      <Panel className="mt-6">
        <h3 className="font-display text-[0.8125rem] font-bold uppercase leading-relaxed text-neon-cyan">
          {page.verifyTitle}
        </h3>
        <dl className="mt-5 space-y-4">
          {page.verifySteps.map((step) => (
            <div key={step.os}>
              <dt className="text-sm uppercase tracking-[0.2em] text-faint">{step.os}</dt>
              <dd>
                <code className="mt-2 block overflow-x-auto rounded-lg border border-line bg-void p-3 font-mono text-sm text-muted">
                  {step.command}
                </code>
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel className="mt-6 border-neon-amber/30 bg-neon-amber/5">
        <p className="text-base leading-relaxed text-muted">{page.thirdPartyNote}</p>
      </Panel>
    </Section>
  );
}
