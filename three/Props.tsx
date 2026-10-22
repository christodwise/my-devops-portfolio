import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, reducedMotion, seg } from './common';

type V3 = [number, number, number];

const LED_COLORS = ['#3DDC97', '#3DDC97', '#5FE3FF', '#FFD23F'];

/** Server rack with blinking status LEDs */
export const ServerRack: React.FC<{ position?: V3; rotation?: V3; units?: number }> = ({ position, rotation, units = 7 }) => {
  const leds = useRef<THREE.MeshBasicMaterial[]>([]);
  const height = units * 0.3 + 0.2;
  const still = reducedMotion();

  const ledMats = useMemo(
    () => Array.from({ length: units * 3 }, (_, i) => new THREE.MeshBasicMaterial({ color: LED_COLORS[i % LED_COLORS.length] })),
    [units]
  );
  leds.current = ledMats;

  useFrame((state) => {
    if (still) return;
    const t = state.clock.elapsedTime;
    ledMats.forEach((m, i) => {
      const on = Math.sin(t * (3 + (i % 5)) + i * 1.7) > -0.2;
      m.color.set(on ? LED_COLORS[i % LED_COLORS.length] : '#2A2F45');
    });
  });

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[0.95, height, 0.95]} radius={0.06} smoothness={2} position={[0, height / 2, 0]}>
        <meshStandardMaterial color={COLORS.rack} roughness={0.6} />
      </RoundedBox>
      {Array.from({ length: units }, (_, u) => (
        <group key={u} position={[0, 0.25 + u * 0.3, 0.48]}>
          <RoundedBox args={[0.8, 0.24, 0.04]} radius={0.02} smoothness={2}>
            <meshStandardMaterial color="#3A4057" roughness={0.5} />
          </RoundedBox>
          {[0, 1, 2].map((l) => (
            <mesh key={l} position={[-0.3 + l * 0.08, 0, 0.025]} material={ledMats[u * 3 + l]}>
              <boxGeometry args={[0.04, 0.04, 0.01]} />
            </mesh>
          ))}
          {[0, 1, 2, 3].map((v) => (
            <mesh key={v} position={[0.05 + v * 0.08, 0, 0.022]}>
              <boxGeometry args={[0.05, 0.14, 0.005]} />
              <meshStandardMaterial color="#252A3C" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

export const Plant: React.FC<{ position?: V3; scale?: number }> = ({ position, scale = 1 }) => {
  const leaves = useMemo(
    () => Array.from({ length: 9 }, (_, i) => {
      const a = (i / 9) * Math.PI * 2;
      return { a, tilt: 0.5 + (i % 3) * 0.2, h: 0.55 + (i % 4) * 0.1 };
    }),
    []
  );
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.32, 0.24, 0.6, seg(24)]} />
        <meshStandardMaterial color={COLORS.white} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, seg(24)]} />
        <meshStandardMaterial color="#6B4A2E" />
      </mesh>
      {leaves.map((l, i) => (
        <mesh
          key={i}
          position={[Math.cos(l.a) * 0.18, 0.6 + l.h * 0.5, Math.sin(l.a) * 0.18]}
          rotation={[Math.sin(l.a) * l.tilt, 0, -Math.cos(l.a) * l.tilt]}
          scale={[0.16, l.h, 0.05]}
        >
          <sphereGeometry args={[1, seg(16), seg(12)]} />
          <meshStandardMaterial color={i % 2 ? '#56B870' : '#3E9A5A'} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

/** The debugging duck */
export const Duck: React.FC<{ position?: V3; rotation?: V3; scale?: number }> = ({ position, rotation, scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh position={[0, 0.1, 0]} scale={[1, 0.8, 1.2]}>
      <sphereGeometry args={[0.13, seg(16), seg(16)]} />
      <meshStandardMaterial color="#FFD23F" roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.25, 0.06]}>
      <sphereGeometry args={[0.085, seg(16), seg(16)]} />
      <meshStandardMaterial color="#FFD23F" roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.23, 0.15]} scale={[1, 0.5, 1]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshStandardMaterial color="#FF8A3D" />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.04, 0.28, 0.13]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    ))}
  </group>
);

/** Shipping container, the Docker kind */
export const Container: React.FC<{ position?: V3; rotation?: V3; color: string; size?: V3 }> = ({ position, rotation, color, size = [1.4, 0.6, 0.6] }) => {
  const ribs = Math.floor(size[0] / 0.12);
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.04} smoothness={2} position={[0, size[1] / 2, 0]}>
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      {Array.from({ length: ribs }, (_, i) => (
        <mesh key={i} position={[-size[0] / 2 + 0.1 + i * 0.12, size[1] / 2, size[2] / 2 + 0.005]}>
          <boxGeometry args={[0.03, size[1] * 0.8, 0.02]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};
