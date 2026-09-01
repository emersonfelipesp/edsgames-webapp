"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tells a component whether it is near the viewport. Used to keep Three.js
 * canvases from mounting — and from rendering frames — while they are far off
 * screen, which matters most on the phones this site is built for.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView, hasBeenInView };
}
