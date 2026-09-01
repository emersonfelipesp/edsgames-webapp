"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Stage } from "../Stage";
import { RetroConsole } from "../models/RetroConsole";
import { Cartridge } from "../models/Cartridge";
import type { SceneProps } from "../types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { PALETTE } from "../palette";

function Rig({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const cartridge = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.22) * 0.55 - 0.35;
    if (cartridge.current) {
      // Slide the cartridge toward the slot and back out again, on a loop.
      const cycle = (Math.sin(t * 0.55) + 1) / 2;
      cartridge.current.position.y = 1.0 + cycle * 0.5;
      cartridge.current.rotation.z = Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.75, 0]} rotation={[0.08, -0.35, 0]}>
      <RetroConsole animate={animate} />
      <group ref={cartridge} position={[0, 1.2, -0.15]}>
        <Cartridge color={PALETTE.plastic} labelColor={PALETTE.magenta} />
      </group>
    </group>
  );
}

export function ConsoleScene({ paused = false }: SceneProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Stage distance={5.4} paused={paused}>
      <Rig animate={!reducedMotion && !paused} />
    </Stage>
  );
}
