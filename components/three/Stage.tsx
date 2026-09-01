"use client";

import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { PALETTE } from "./palette";

type StageProps = {
  children: ReactNode;
  /** Camera distance. Larger values frame more of the model. */
  distance?: number;
  shadows?: boolean;
  /** Stop rendering frames without unmounting, so the WebGL context survives. */
  paused?: boolean;
};

/**
 * The shared canvas: camera, lighting and ground shadow, so the individual
 * scenes only have to describe their props.
 *
 * When the visitor prefers reduced motion the frame loop switches to `demand`,
 * which renders a single still frame instead of running continuously. Nothing
 * here is meaningful content, so the canvas is hidden from assistive
 * technology by its wrapper.
 */
export function Stage({ children, distance = 6, shadows = true, paused = false }: StageProps) {
  const reducedMotion = usePrefersReducedMotion();
  // Phones pay for every extra pixel and every shadow map, so they get neither.
  const smallScreen =
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const castShadows = shadows && !smallScreen;

  return (
    <Canvas
      style={{ height: "100%", width: "100%" }}
      dpr={smallScreen ? [1, 1.4] : [1, 1.75]}
      frameloop={reducedMotion || paused ? "demand" : "always"}
      shadows={castShadows}
      gl={{ antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 1.6, distance], fov: 38 }}
    >
      <color attach="background" args={[PALETTE.void]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={[PALETTE.cyan, PALETTE.magenta, 0.5]} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.5}
        castShadow={castShadows}
        shadow-mapSize={[512, 512]}
      />
      <pointLight position={[-4, 2, 3]} intensity={22} color={PALETTE.magenta} distance={14} />
      <pointLight position={[4, 1, 4]} intensity={18} color={PALETTE.cyan} distance={14} />
      {children}
      {castShadows ? (
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.5}
          scale={12}
          blur={2.6}
          far={4}
          resolution={256}
        />
      ) : null}
    </Canvas>
  );
}
