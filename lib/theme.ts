"use client";

import { useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "edsgames-theme";

/** Fired on `window` whenever the preference changes in this tab. */
const THEME_EVENT = "edsgames:themechange";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStoredPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    // Private mode, or the visitor blocked site data. "system" is the answer
    // that needs no storage at all.
    return "system";
  }
}

function subscribePreference(onChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onChange);
  // `storage` fires in the *other* tabs, which keeps them in step.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The visitor's stored choice. The server answer is "system", which is also
 * what `public/theme-init.js` leaves the document in when nothing is stored,
 * so hydration never disagrees with the pre-paint state.
 */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribePreference, readStoredPreference, () => "system");
}

function subscribeResolved(onChange: () => void): () => void {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  const stop = subscribePreference(onChange);
  return () => {
    query.removeEventListener("change", onChange);
    stop();
  };
}

function readResolved(): ResolvedTheme {
  const preference = readStoredPreference();
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * The theme actually in force, with "system" already resolved. Used by things
 * that cannot read a CSS variable — the Three.js canvases, for one.
 */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribeResolved, readResolved, () => "dark");
}

export function setThemePreference(preference: ThemePreference): void {
  const root = document.documentElement;

  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }

  try {
    if (preference === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // The choice still applies for this page view; it just will not persist.
  }

  // `ThemeColorSync` observes this and updates the browser chrome.
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** The cycle order of the toggle: follow the system, then force each theme. */
export const THEME_CYCLE: readonly ThemePreference[] = ["system", "light", "dark"];

export function nextThemePreference(current: ThemePreference): ThemePreference {
  const index = THEME_CYCLE.indexOf(current);
  return THEME_CYCLE[(index + 1) % THEME_CYCLE.length];
}
