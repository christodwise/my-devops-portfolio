import React, { useMemo } from 'react';
import * as THREE from 'three';

export const COLORS = {
  skin: '#F6CBA9',
  skinShade: '#EDAE88',
  hair: '#6B3420',
  jacket: '#FFA21A',
  hoodie: '#FF7A2E',
  pants: '#3E4C74',
  shoe: '#FFFFFF',
  sole: '#FF6B1A',
  accent: '#FF6B1A',
  desk: '#FF8A3D',
  wood: '#D9A066',
  white: '#FBF8F3',
  screen: '#141826',
  rack: '#2B2F3E',
  navy: '#0A1A4F',
  holo: '#5FE3FF',
};

export const isCoarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const isSmallScreen = () => typeof window !== 'undefined' && window.innerWidth < 768;

/** Fewer segments on phones keeps the scenes cheap */
export const seg = (desktop: number) => (isSmallScreen() ? Math.max(8, Math.round(desktop * 0.6)) : desktop);

/** Soft round shadow on the floor; much cheaper than real-time shadow maps */
export const BlobShadow: React.FC<{ position?: [number, number, number]; scale?: number; opacity?: number }> = ({
  position = [0, 0.01, 0],
  scale = 1.6,
  opacity = 0.35,
}) => {
  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(40,24,10,1)');
    g.addColorStop(1, 'rgba(40,24,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh position={position} rotation-x={-Math.PI / 2} scale={scale}>
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

/** Shared scroll state the DOM writes and the scenes read every frame (no re-renders) */
export type Progress = { current: number };

/** Pointer position in -1..1, written by a window listener */
export const pointer = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const damp = THREE.MathUtils.damp;
