"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import { PALETTE } from "../palette";

type RetroConsoleProps = {
  animate?: boolean;
};

/**
 * A 16-bit style console built entirely from primitives: no external model, no
 * licence to track, and every colour comes from the site palette.
 */
export function RetroConsole({ animate = true }: RetroConsoleProps) {
  const led = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!animate || !led.current) return;
    const pulse = 0.6 + Math.sin(clock.elapsedTime * 2.4) * 0.4;
    led.current.scale.setScalar(0.9 + pulse * 0.18);
  });

  return (
    <group>
      {/* Body */}
      <RoundedBox args={[2.6, 0.52, 1.9]} radius={0.09} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.shell} roughness={0.62} metalness={0.05} />
      </RoundedBox>

      {/* Raised cartridge deck */}
      <RoundedBox
        args={[1.5, 0.24, 1.15]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.34, -0.15]}
        castShadow
      >
        <meshStandardMaterial color={PALETTE.shellDark} roughness={0.7} />
      </RoundedBox>

      {/* Cartridge slot */}
      <mesh position={[0, 0.47, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.12, 0.42]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.9} />
      </mesh>

      {/* Power and reset switches */}
      <RoundedBox args={[0.42, 0.12, 0.18]} radius={0.04} position={[-0.85, 0.3, 0.62]}>
        <meshStandardMaterial color={PALETTE.plastic} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.42, 0.12, 0.18]} radius={0.04} position={[-0.25, 0.3, 0.62]}>
        <meshStandardMaterial color={PALETTE.plastic} roughness={0.5} />
      </RoundedBox>

      {/* Power LED */}
      <group ref={led} position={[0.75, 0.3, 0.66]}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={PALETTE.red}
            emissive={PALETTE.red}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Controller ports */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0.05, 0.96]}>
          <boxGeometry args={[0.44, 0.2, 0.06]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.85} />
        </mesh>
      ))}

      {/* Vents */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((z) => (
        <mesh key={z} position={[1.05, 0.27, z]}>
          <boxGeometry args={[0.32, 0.02, 0.06]} />
          <meshStandardMaterial color={PALETTE.shellDark} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
