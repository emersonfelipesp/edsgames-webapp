"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/lib/hooks/useInView";
import { useHeavyGraphicsAllowed } from "@/lib/hooks/useHeavyGraphicsAllowed";
import { cn } from "@/lib/cn";
import type { SceneProps } from "./types";

export type SceneVariant = "console" | "gamepad" | "cartridges" | "character";

/**
 * Every scene is code-split and client-only, so the Three.js runtime never
 * reaches the initial payload of any route. A scene is only mounted once it has
 * come near the viewport, which keeps a phone from compiling shaders for a
 * canvas eight screens further down the page. Once mounted it stays mounted and
 * merely stops rendering frames when it scrolls away: tearing the canvas down
 * would drop and re-create a WebGL context on every pass.
 */
const SCENES: Record<SceneVariant, React.ComponentType<SceneProps>> = {
  console: dynamic(() => import("./scenes/ConsoleScene").then((m) => m.ConsoleScene), {
    ssr: false,
  }),
  gamepad: dynamic(() => import("./scenes/GamepadScene").then((m) => m.GamepadScene), {
    ssr: false,
  }),
  cartridges: dynamic(() => import("./scenes/CartridgeScene").then((m) => m.CartridgeScene), {
    ssr: false,
  }),
  character: dynamic(() => import("./scenes/CharacterScene").then((m) => m.CharacterScene), {
    ssr: false,
  }),
};

type LazySceneProps = {
  variant: SceneVariant;
  className?: string;
};

export function LazyScene({ variant, className }: LazySceneProps) {
  const { ref, inView, hasBeenInView } = useInView<HTMLDivElement>();
  const heavyGraphicsAllowed = useHeavyGraphicsAllowed();
  const Scene = SCENES[variant];

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
      {hasBeenInView && heavyGraphicsAllowed ? (
        <Scene paused={!inView} />
      ) : (
        <div className="bg-grid size-full opacity-30" />
      )}
    </div>
  );
}
