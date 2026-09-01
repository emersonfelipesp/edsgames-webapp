import { IBM_Plex_Mono, Silkscreen } from "next/font/google";

/**
 * Fonts are downloaded at build time and served from our own origin, so a
 * visitor's browser never contacts a font CDN.
 *
 * Silkscreen is the arcade half of the brief: a genuine bitmap face, the kind
 * of lettering that sat on a cabinet marquee or a 8-bit title screen.
 *
 * Choosing it was an empirical decision rather than a taste one. The site's
 * default language is Portuguese, and most pixel faces draw accented *uppercase*
 * badly or not at all — Press Start 2P renders "APÓS EXTRAÍDO CONTRIBUIÇÃO" as
 * "APóS EXTRAíDO CONTRIBUIÇAO", and Sixtyfour drops the tilde entirely. Both
 * were rejected for that reason. Silkscreen draws Á Ã Ç É Í Ó Ú correctly at
 * full cap height, and ships a real 700 weight, so bold headings are not
 * synthetically smeared.
 *
 * Anyone swapping this face must re-check that sample string before merging.
 */
export const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-silkscreen",
});

/**
 * IBM Plex Mono for body copy and interface text: the "old computing" half of
 * the brief. A monospace face carries the terminal feeling the way Silkscreen
 * carries the arcade one, and Plex Mono stays readable at paragraph length in a
 * way a bitmap terminal font such as VT323 does not.
 */
export const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const fontVariables = `${silkscreen.variable} ${plexMono.variable}`;
