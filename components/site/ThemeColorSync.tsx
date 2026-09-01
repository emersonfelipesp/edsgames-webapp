"use client";

import { useEffect } from "react";
import { useResolvedTheme } from "@/lib/theme";

const THEME_COLORS = { dark: "#06060c", light: "#f4f4f9" } as const;

/**
 * Keeps `<meta name="theme-color">` in step with the theme actually in force.
 *
 * The static markup ships two media-scoped copies, which are correct only while
 * the visitor is following the system. Once a theme has been forced, the
 * browser chrome would otherwise stay the colour the operating system asked
 * for — a dark page under a light address bar. Writing the resolved colour into
 * both copies covers every case, including the system flipping while the page
 * is open.
 */
export function ThemeColorSync() {
  const theme = useResolvedTheme();

  useEffect(() => {
    const color = THEME_COLORS[theme];
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", color));
  }, [theme]);

  return null;
}
