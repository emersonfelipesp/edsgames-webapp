"use client";

import { useState } from "react";
import { INTERFACE_SOURCES, ResponsiveImage } from "@/components/ui/ResponsiveImage";

type VideoFacadeProps = {
  videoId: string;
  label: string;
  playLabel: string;
};

/**
 * A click-to-load YouTube facade. Nothing from youtube.com is requested until
 * the visitor actually asks for the video, so the page loads no third-party
 * script and sets no third-party cookie by default.
 */
export function VideoFacade({ videoId, label, playLabel }: VideoFacadeProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-panel border border-line bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={label}
          // Only what playback actually needs. The default YouTube embed snippet
          // also asks for clipboard-write, accelerometer and gyroscope; none of
          // them are used to play a video, and this frame is third-party.
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          // `allow-same-origin` here means youtube-nocookie.com's own origin, not
          // ours, so the frame still cannot reach this document.
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={playLabel}
      className="group relative block aspect-video w-full overflow-hidden rounded-panel border border-line bg-black"
    >
      <ResponsiveImage
        sources={INTERFACE_SOURCES}
        sizes="(max-width: 896px) 100vw, 896px"
        alt=""
        width={1600}
        height={892}
        className="absolute inset-0 size-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span
          aria-hidden="true"
          className="grid size-16 place-items-center rounded-full bg-accent text-on-accent shadow-[0_0_40px_-8px_var(--color-accent)] transition-transform duration-200 group-hover:scale-110 sm:size-20"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 size-7 sm:size-9">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-media-scrim/90 to-transparent p-4 text-left font-display text-[0.75rem] uppercase leading-relaxed text-on-media sm:p-6 sm:text-base">
        {playLabel}
      </span>
    </button>
  );
}
