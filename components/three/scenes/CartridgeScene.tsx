"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Stage } from "../Stage";
import { Cartridge } from "../models/Cartridge";
import type { SceneProps } from "../types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { PALETTE } from "../palette";

const CARTRIDGES = [
  { x: -1.5, color: PALETTE.plastic, label: PALETTE.cyan, speed: 0.42 },
  { x: 0, color: "#3a2a4d", label: PALETTE.magenta, speed: 0.32 },
  { x: 1.5, color: "#243a2e", label: PALETTE.lime, speed: 0.5 },
];

function Rig({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate || !group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      const config = CARTRIDGES[index];
      child.rotation.y = t * config.speed;
      child.position.y = Math.sin(t * 0.9 + index) * 0.16;
    });
  });

  return (
    <group ref={group}>
      {CARTRIDGES.map((config) => (
        <group key={config.x} position={[config.x, 0, 0]}>
          <Cartridge color={config.color} labelColor={config.label} />
        </group>
      ))}
    </group>
  );
}

export function CartridgeScene({ paused = false }: SceneProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Stage distance={5.6} shadows={false} paused={paused}>
      <Rig animate={!reducedMotion && !paused} />
    </Stage>
  );
}
