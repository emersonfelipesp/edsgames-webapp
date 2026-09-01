"use client";

import { useSyncExternalStore } from "react";

type ConnectionLike = EventTarget & { saveData?: boolean; effectiveType?: string };

function getConnection(): ConnectionLike | undefined {
  return (navigator as Navigator & { connection?: ConnectionLike }).connection;
}

function subscribe(onChange: () => void): () => void {
  const connection = getConnection();
  connection?.addEventListener("change", onChange);
  return () => connection?.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  const connection = getConnection();
  const slowNetwork =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "3g";

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === "number" && deviceMemory < 2;

  return !slowNetwork && !lowMemory;
}

/**
 * Decides whether this device should download and run the Three.js bundle.
 *
 * The scenes are decorative, so a visitor on Data Saver, a 2G or 3G connection,
 * or a very low-memory phone gets the static fallback instead of roughly 240 KB
 * of compressed WebGL runtime. The server answer is `false`, which makes the
 * heavy path opt-in rather than opt-out.
 */
export function useHeavyGraphicsAllowed(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
