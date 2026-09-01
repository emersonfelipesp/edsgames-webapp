import { Press_Start_2P, Space_Grotesk } from "next/font/google";

/**
 * Fonts are downloaded at build time and served from our own origin, so a
 * visitor's browser never contacts a third-party font CDN.
 */
export const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const fontVariables = `${pressStart.variable} ${spaceGrotesk.variable}`;
