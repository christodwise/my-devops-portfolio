import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import ChristoSprite from './ChristoSprite';
import { Container, Plant, ServerRack } from './Props';
import { BlobShadow, pointer } from './common';

const Yard: React.FC<{ awake: boolean }> = ({ awake }) => {
  return (
    <group>
      {/* Christo stands on a container like a stage, and gets excited when you reach for a contact button */}
      <BlobShadow position={[0, 0.01, 0]} scale={3.2} opacity={0.3} />
      <Container position={[0, 0, 0]} color="#3D5AFE" size={[1.8, 0.7, 0.8]} />
      <BlobShadow position={[0, 0.715, 0.05]} scale={1.1} opacity={0.35} />
      <ChristoSprite position={[0, 0.71, 0.05]} height={2.6} excited={awake} />

      {/* Container stack behind */}
      <BlobShadow position={[1.6, 0.01, -1.6]} scale={4} opacity={0.25} />
      <Container position={[1.4, 0, -1.6]} rotation={[0, -0.2, 0]} color="#FF5FA2" />
      <Container position={[2.3, 0, -0.7]} rotation={[0, -1.3, 0]} color="#3DDC97" size={[1.2, 0.6, 0.6]} />
      <Container position={[1.5, 0.6, -1.5]} rotation={[0, 0.15, 0]} color="#FFD23F" size={[1.2, 0.6, 0.6]} />

      <ServerRack position={[-1.8, 0, -1.4]} rotation={[0, 0.5, 0]} units={5} />
      <BlobShadow position={[-1.8, 0.01, -1.4]} scale={1.8} opacity={0.3} />
      <Plant position={[3.3, 0, 0.7]} scale={0.9} />
      <BlobShadow position={[3.3, 0.01, 0.7]} scale={1.1} opacity={0.3} />

      {/* Scattered paper, like unread tickets */}
      {[[0.9, 1.1, 0.4], [-1, 1.2, -0.6], [2.4, 0.6, 1.2], [-0.4, 1.5, 0.3]].map(([x, z, r], i) => (
        <mesh key={i} position={[x, 0.012, z]} rotation={[-Math.PI / 2, 0, r]}>
          <planeGeometry args={[0.32, 0.24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

const BUBBLE_AT = new THREE.Vector3(0.1, 3.7, 0.05);

/** Pins a DOM speech bubble above Christo's head */
const BubbleFollower: React.FC<{ bubble: React.RefObject<HTMLDivElement | null> }> = ({ bubble }) => {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    if (!bubble.current) return;
    v.copy(BUBBLE_AT).project(camera);
    const x = (v.x * 0.5 + 0.5) * size.width;
    const y = (-v.y * 0.5 + 0.5) * size.height;
    bubble.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
    bubble.current.style.opacity = '1';
  });
  return null;
};

const Rig: React.FC = () => {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const first = useRef(true);
  useFrame((_, dt) => {
    const aspect = size.width / size.height;
    const portrait = aspect < 0.9;
    const d = portrait ? 1.2 : aspect < 1.3 ? 1.4 : 1.25;
    pos.set(4.2 * d + pointer.x * 0.4, 3.6 * d - pointer.y * 0.25, 7.4 * d);
    // Portrait (phones): the scene has its own box below the text, so just centre it
    look.set(portrait ? 0.5 : -2.2, portrait ? 1.9 : 1.3, 0);
    const k = first.current ? 1 : 1 - Math.exp(-4 * Math.min(dt, 0.05));
    first.current = false;
    camera.position.lerp(pos, k);
    target.lerp(look, k);
    camera.lookAt(target);
  });
  return null;
};

const ContactScene: React.FC<{ awake: boolean; bubble: React.RefObject<HTMLDivElement | null> }> = ({ awake, bubble }) => (
  <SceneCanvas fov={30}>
    <Yard awake={awake} />
    <Rig />
    <BubbleFollower bubble={bubble} />
  </SceneCanvas>
);

export default ContactScene;
