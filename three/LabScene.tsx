import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import ChristoSprite from './ChristoSprite';
import { COLORS, Progress, pointer, seg } from './common';

const BASE = 0.26; // platform top
const HEIGHT = 2.85; // character height

/** Vertical fade texture for the light beam */
function beamTexture() {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, 'rgba(95,227,255,0)');
  g.addColorStop(1, 'rgba(95,227,255,0.32)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 128);
  return new THREE.CanvasTexture(c);
}

const Particles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 90;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.4 + Math.random() * 0.9;
      const t = Math.random() * Math.PI * 2;
      a.set([Math.cos(t) * r, Math.random() * 3.2, Math.sin(t) * r], i * 3);
    }
    return a;
  }, []);
  useFrame((_, dt) => {
    const pos = ref.current!.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + dt * 0.35;
      if (y > 3.4) y = 0.2;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={COLORS.holo} size={0.035} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

const Hologram: React.FC<{ progress: Progress }> = ({ progress }) => {
  const ring = useRef<THREE.Mesh>(null);
  const beam = useMemo(beamTexture, []);

  useFrame(() => {
    const p = progress.current;
    ring.current!.position.y = BASE + p * HEIGHT;
    ring.current!.visible = p > 0.01 && p < 0.99;
  });

  return (
    <group>
      {/* Platform */}
      <mesh position={[0, BASE / 2, 0]}>
        <cylinderGeometry args={[1.25, 1.35, BASE, seg(48)]} />
        <meshStandardMaterial color="#0F2466" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, BASE + 0.005, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.95, 1.12, seg(64)]} />
        <meshBasicMaterial color={COLORS.holo} toneMapped={false} />
      </mesh>
      <mesh position={[0, BASE + 0.004, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.9, seg(48)]} />
        <meshBasicMaterial color={COLORS.holo} transparent opacity={0.18} toneMapped={false} />
      </mesh>
      {/* Light beam */}
      <mesh position={[0, BASE + 1.6, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 3.2, seg(48), 1, true]} />
        <meshBasicMaterial map={beam} transparent blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      <ChristoSprite position={[0, BASE, 0.05]} height={HEIGHT} reveal={progress} />

      {/* Scan line */}
      <mesh ref={ring} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.7, 0.78, seg(64)]} />
        <meshBasicMaterial color={COLORS.holo} transparent opacity={0.9} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <Particles />
    </group>
  );
};

const Rig: React.FC = () => {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.55, 0), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    const portrait = size.width / size.height < 0.9;
    pos.set(pointer.x * 0.6, (portrait ? 1.3 : 2.1) - pointer.y * 0.3, portrait ? Math.max(10.5, 6 / (size.width / size.height)) : 9.4);
    camera.position.lerp(pos, 1 - Math.exp(-4 * Math.min(dt, 0.05)));
    target.y = portrait ? 2.55 : 1.55;
    camera.lookAt(target);
  });
  return null;
};

const LabScene: React.FC<{ progress: Progress }> = ({ progress }) => (
  <SceneCanvas fov={32}>
    <Grid
      position={[0, 0, 0]}
      args={[30, 30]}
      cellSize={0.6}
      cellThickness={0.8}
      cellColor="#1F3C9E"
      sectionSize={3}
      sectionThickness={1.2}
      sectionColor="#3A6BFF"
      fadeDistance={16}
      fadeStrength={1.5}
      infiniteGrid
    />
    <Hologram progress={progress} />
    <Rig />
  </SceneCanvas>
);

export default LabScene;
