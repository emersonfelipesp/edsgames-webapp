"use client";

import { RoundedBox } from "@react-three/drei";
import { PALETTE } from "../palette";

type CartridgeProps = {
  color?: string;
  labelColor?: string;
};

/** A game cartridge: shell, label and the ridged grip along the top edge. */
export function Cartridge({
  color = PALETTE.plastic,
  labelColor = PALETTE.cyan,
}: CartridgeProps) {
  return (
    <group>
      <RoundedBox args={[1.05, 1.15, 0.16]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color={color} roughness={0.55} />
      </RoundedBox>

      {/* Label */}
      <mesh position={[0, 0.12, 0.085]}>
        <planeGeometry args={[0.78, 0.62]} />
        <meshStandardMaterial
          color={labelColor}
          emissive={labelColor}
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>

      {/* Grip ridges */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.62, 0]}>
          <boxGeometry args={[0.06, 0.08, 0.18]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.8} />
        </mesh>
      ))}

      {/* Connector */}
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[0.8, 0.12, 0.1]} />
        <meshStandardMaterial color={PALETTE.amber} metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}
