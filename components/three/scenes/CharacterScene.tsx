"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Stage } from "../Stage";
import { PixelCharacter } from "../models/PixelCharacter";
import type { SceneProps } from "../types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

function Rig({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate || !group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.8;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <PixelCharacter animate={animate} />
    </group>
  );
}

export function CharacterScene({ paused = false }: SceneProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Stage distance={4.6} paused={paused}>
      <Rig animate={!reducedMotion && !paused} />
    </Stage>
  );
}
