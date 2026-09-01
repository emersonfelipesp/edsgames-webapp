import type { Dictionary } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoFacade } from "./VideoFacade";

const YOUTUBE_VIDEO_ID = "bTv9H6AhK94";

type IntroProps = {
  dict: Dictionary;
};

export function Intro({ dict }: IntroProps) {
  return (
    <Section className="bg-abyss">
      <SectionHeading
        eyebrow={dict.intro.eyebrow}
        title={dict.intro.title}
        align="center"
      />
      <div className="mx-auto mt-12 max-w-4xl">
        <VideoFacade
          videoId={YOUTUBE_VIDEO_ID}
          label={dict.intro.videoLabel}
          playLabel={dict.actions.playVideo}
        />
      </div>
    </Section>
  );
}
