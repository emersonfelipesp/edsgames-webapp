"use client";

import { RoundedBox } from "@react-three/drei";
import { PALETTE } from "../palette";

/** A 16-bit style gamepad: D-pad, four face buttons, start and select. */
export function Gamepad() {
  return (
    <group>
      <RoundedBox args={[2.4, 0.28, 1.05]} radius={0.24} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={PALETTE.plastic} roughness={0.55} />
      </RoundedBox>

      {/* D-pad */}
      <group position={[-0.72, 0.18, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.52, 0.1, 0.18]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.6} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.1, 0.52]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.6} />
        </mesh>
      </group>

      {/* Face buttons */}
      {(
        [
          [0.62, 0.16, PALETTE.magenta],
          [0.92, -0.1, PALETTE.cyan],
          [0.92, 0.4, PALETTE.amber],
          [1.2, 0.16, PALETTE.lime],
        ] as const
      ).map(([x, z, color]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.18, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 20]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Start and select */}
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.16, 0.24]} rotation={[0, 0, Math.PI / 12]}>
          <boxGeometry args={[0.22, 0.06, 0.09]} />
          <meshStandardMaterial color={PALETTE.shellDark} roughness={0.6} />
        </mesh>
      ))}

      {/* Cable stub */}
      <mesh position={[0, 0, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 12]} />
        <meshStandardMaterial color={PALETTE.ink} roughness={0.8} />
      </mesh>
    </group>
  );
}
