import { cn } from "@/lib/cn";

type Shot = {
  /** Path under `public/img/games/`. */
  src: string;
  /** Intrinsic size, so the tile reserves its space before the file arrives. */
  width: number;
  height: number;
};

/**
 * Screenshots of games that actually run on the product, captured at each
 * system's native resolution — a Mega Drive frame really is 320×224 — and
 * upscaled by the browser with `image-rendering: pixelated`. Nothing is
 * re-rendered or smoothed, which is why a 224-line frame still looks like one.
 *
 * The sets are grouped so that each placement reads as an era rather than a
 * random shuffle: the 16-bit consoles on the home page, the 32/64-bit
 * generation beside the feature grid, the disc era in the store, and a wider
 * arcade-and-cartridge spread on the download page.
 */
const SHOT_SETS = {
  sixteenBit: [
    { src: "/img/games/sonic-2.webp", width: 320, height: 224 },
    { src: "/img/games/super-mario-world.webp", width: 256, height: 224 },
    { src: "/img/games/golden-axe.webp", width: 320, height: 224 },
    { src: "/img/games/street-fighter-2.webp", width: 256, height: 224 },
  ],
  classics: [
    { src: "/img/games/metal-slug-x.webp", width: 320, height: 224 },
    { src: "/img/games/donkey-kong-country.webp", width: 256, height: 224 },
    { src: "/img/games/symphony-of-the-night.webp", width: 512, height: 332 },
    { src: "/img/games/super-mario-64.webp", width: 640, height: 480 },
  ],
  discEra: [
    { src: "/img/games/crash-bandicoot.webp", width: 512, height: 349 },
    { src: "/img/games/tekken-3.webp", width: 320, height: 240 },
    { src: "/img/games/mario-kart-64.webp", width: 320, height: 240 },
    { src: "/img/games/crazy-taxi.webp", width: 512, height: 382 },
  ],
  arcade: [
    { src: "/img/games/nam-1975.webp", width: 320, height: 224 },
    { src: "/img/games/contra-3.webp", width: 256, height: 224 },
    { src: "/img/games/sonic-1.webp", width: 320, height: 224 },
    { src: "/img/games/metal-slug-3.webp", width: 320, height: 224 },
    { src: "/img/games/super-metroid.webp", width: 256, height: 224 },
    { src: "/img/games/gran-turismo.webp", width: 320, height: 240 },
  ],
} as const satisfies Record<string, readonly Shot[]>;

export type GameShotSet = keyof typeof SHOT_SETS;

type GameShotsProps = {
  set: GameShotSet;
  className?: string;
};

/**
 * A grid of game screenshots.
 *
 * This is a server component on purpose: there is no video, no capability
 * gating and no motion left to negotiate, so nothing here needs the browser.
 * The tiles are lazily loaded and carry an empty `alt` under `aria-hidden`,
 * because the surrounding copy already says what the library contains — the
 * grid is there to show it, not to restate it.
 */
export function GameShots({ set, className }: GameShotsProps) {
  return (
    <ul aria-hidden="true" className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
      {SHOT_SETS[set].map((shot) => (
        <li
          key={shot.src}
          className="overflow-hidden rounded-panel border border-line bg-void"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot.src}
            alt=""
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            className="pixelated aspect-[4/3] size-full object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
