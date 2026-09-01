"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Stage } from "../Stage";
import { Gamepad } from "../models/Gamepad";
import type { SceneProps } from "../types";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

function Rig({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate || !group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.7;
    group.current.rotation.x = 0.55 + Math.sin(t * 0.5) * 0.08;
    group.current.position.y = -0.35 + Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]} rotation={[0.55, 0, 0]}>
      <Gamepad />
    </group>
  );
}

export function GamepadScene({ paused = false }: SceneProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Stage distance={5.2} paused={paused}>
      <Rig animate={!reducedMotion && !paused} />
    </Stage>
  );
}
