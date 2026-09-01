"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { PALETTE } from "../palette";

type PixelCharacterProps = {
  animate?: boolean;
};

const SKIN = "#f2c49b";
const SHIRT = PALETTE.cyan;
const TROUSERS = "#2f3a8c";
const HAIR = "#2b1c14";

/**
 * A voxel arcade fighter, assembled from boxes in the spirit of the sprite work
 * the site is nostalgic about. Arms and legs swing gently when animation is on.
 */
export function PixelCharacter({ animate = true }: PixelCharacterProps) {
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const body = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.6) * 0.35;
    if (rightArm.current) rightArm.current.rotation.x = -Math.sin(t * 1.6) * 0.35;
    if (body.current) body.current.position.y = Math.sin(t * 1.6) * 0.06;
  });

  return (
    <group ref={body}>
      {/* Head */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.62, 0.6, 0.6]} />
        <meshStandardMaterial color={SKIN} roughness={0.75} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.48, -0.02]} castShadow>
        <boxGeometry args={[0.68, 0.16, 0.64]} />
        <meshStandardMaterial color={HAIR} roughness={0.85} />
      </mesh>
      {/* Headband */}
      <mesh position={[0, 1.3, 0.01]}>
        <boxGeometry args={[0.66, 0.12, 0.66]} />
        <meshStandardMaterial
          color={PALETTE.red}
          emissive={PALETTE.red}
          emissiveIntensity={0.25}
          roughness={0.6}
        />
      </mesh>
      {/* Eyes */}
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, 1.14, 0.31]}>
          <boxGeometry args={[0.1, 0.12, 0.02]} />
          <meshStandardMaterial color={PALETTE.ink} />
        </mesh>
      ))}

      {/* Torso */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.7, 0.72, 0.42]} />
        <meshStandardMaterial color={SHIRT} roughness={0.6} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.43, 0.78, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.22, 0.66, 0.24]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.43, 0.78, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.22, 0.66, 0.24]} />
          <meshStandardMaterial color={SKIN} roughness={0.75} />
        </mesh>
      </group>

      {/* Legs */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, -0.16, 0]} castShadow>
          <boxGeometry args={[0.28, 0.6, 0.3]} />
          <meshStandardMaterial color={TROUSERS} roughness={0.7} />
        </mesh>
      ))}
      {[-0.18, 0.18].map((x) => (
        <mesh key={`shoe-${x}`} position={[x, -0.52, 0.04]} castShadow>
          <boxGeometry args={[0.3, 0.16, 0.4]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
