"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useHeavyGraphicsAllowed } from "@/lib/hooks/useHeavyGraphicsAllowed";
import { cn } from "@/lib/cn";

export type ClipName = "hillside" | "platformer" | "rungun" | "shooter";

/**
 * The clips are generated, not filmed — see `tools/pixel-clips/`. They reproduce
 * the *level design language* of the eras the site is nostalgic about — the
 * checkerboard hills and loops, the brick-and-warp-pipe plains, the desert
 * firefight — because that furniture is what makes a scene read as its genre at
 * a glance. No protagonist, logo or level layout is copied from a real game.
 */
const CLIPS: Record<ClipName, { base: string }> = {
  hillside: { base: "/video/hillside" },
  platformer: { base: "/video/platformer" },
  rungun: { base: "/video/rungun" },
  shooter: { base: "/video/shooter" },
};

type RetroClipProps = {
  clip: ClipName;
  className?: string;
};

/**
 * A decorative looping clip.
 *
 * It is muted, `playsInline` and has no controls, so it is ambient rather than
 * a player: nothing here is content a visitor needs, which is why the whole
 * element is hidden from assistive technology.
 *
 * Nothing is fetched until the clip approaches the viewport, and it pauses
 * rather than unmounting when it leaves — decoding frames for a clip eight
 * screens down is exactly the waste a mobile-first site cannot afford, but so
 * is tearing the element down and re-fetching on the way back.
 *
 * Under `prefers-reduced-motion`, on Data Saver, on a 2G/3G connection or on a
 * device reporting under 2 GB of memory, the poster frame is shown on its own
 * and no video is ever requested.
 */
export function RetroClip({ clip, className }: RetroClipProps) {
  const { ref, inView, hasBeenInView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const heavyMediaAllowed = useHeavyGraphicsAllowed();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { base } = CLIPS[clip];
  const playable = hasBeenInView && heavyMediaAllowed && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      // A rejected play() is normal — a background tab, or a policy that wants
      // a gesture. The poster stays visible underneath either way.
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, playable]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-panel border border-line bg-void",
        "h-56 sm:h-72 lg:h-80",
        className,
      )}
    >
      {playable ? (
        <video
          ref={videoRef}
          poster={`${base}.webp`}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          tabIndex={-1}
          disablePictureInPicture
          className="pixelated size-full object-cover"
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${base}.webp`}
          alt=""
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
          className="pixelated size-full object-cover"
        />
      )}
    </div>
  );
}
