import { Pixelify_Sans, Space_Grotesk } from "next/font/google";

/**
 * Fonts are downloaded at build time and served from our own origin, so a
 * visitor's browser never contacts a third-party font CDN.
 */
/**
 * Pixelify Sans rather than Press Start 2P: the latter has no usable uppercase
 * accented glyphs, so Portuguese headings rendered "APóS" and "CONTRIBUIÇAO".
 * Pixelify Sans covers Latin Extended, which this site's default language needs.
 */
export const pixelFont = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-pixel",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const fontVariables = `${pixelFont.variable} ${spaceGrotesk.variable}`;
