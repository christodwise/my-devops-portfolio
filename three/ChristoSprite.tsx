import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Progress, pointer, reducedMotion } from './common';

// The character artwork split into puppet layers (public/puppet/*.png), all the same size as the original
const IMG_W = 276;
const IMG_H = 646;
const LAYERS = ['legs', 'torso', 'head', 'blink', 'arms'] as const;
type Layer = (typeof LAYERS)[number];

// Pivots in image pixels
const HEM = { x: 128, y: 312 }; // bottom of the jacket: torso breathes and sways from here
const NECK = { x: 128, y: 103 }; // head tilts and nods around here

const textures: Partial<Record<Layer, THREE.Texture>> = {};
function layerTexture(name: Layer) {
  if (!textures[name]) {
    const t = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}puppet/${name}.png`);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    textures[name] = t;
  }
  return textures[name]!;
}

const holoVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Below the scan line: the artwork as-is. Above it: a cyan, scan-lined hologram of the same artwork.
const holoFragment = /* glsl */ `
  uniform sampler2D map;
  uniform float scan;
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(map, vUv);
    if (tex.a < 0.04) discard;
    if (vUv.y < scan) {
      gl_FragColor = tex;
    } else {
      float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
      float lines = 0.55 + 0.45 * sin(vUv.y * 420.0 - time * 6.0);
      vec3 holo = vec3(0.37, 0.89, 1.0) * (0.35 + luma * 1.1) * lines;
      float flicker = 0.85 + 0.15 * sin(time * 23.0);
      gl_FragColor = vec4(holo, tex.a * 0.62 * flicker);
    }
    float band = smoothstep(0.012, 0.0, abs(vUv.y - scan));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.75, 0.97, 1.0), band * tex.a);
    gl_FragColor.a = max(gl_FragColor.a, band * tex.a);
    #include <colorspace_fragment>
  }
`;

interface Props {
  position?: [number, number, number];
  height?: number;
  /** Hologram reveal: 0 = all hologram, 1 = fully solid */
  reveal?: Progress;
  /** Bouncier, happier motion, e.g. when someone reaches for a contact button */
  excited?: boolean;
}

/**
 * The character artwork as a cut-out puppet: the torso breathes and sways, the head tilts toward
 * the pointer and nods, the arms tap away at the laptop, and the eyes blink. Always faces the camera.
 */
const ChristoSprite: React.FC<Props> = ({ position = [0, 0, 0], height = 2.7, reveal, excited }) => {
  const width = (height * IMG_W) / IMG_H;
  const still = reducedMotion();

  // Image pixel -> local units (origin at the feet, centre line at x = 0)
  const px = (x: number, y: number) => new THREE.Vector3((x / IMG_W - 0.5) * width, (1 - y / IMG_H) * height, 0);
  const hem = px(HEM.x, HEM.y);
  const neck = px(NECK.x, NECK.y);
  const centre = new THREE.Vector3(0, height / 2, 0);

  const uniforms = useMemo(() => ({ scan: { value: 0 }, time: { value: 0 } }), []);
  const mats = useMemo(() => {
    const make = (name: Layer) => {
      const map = layerTexture(name);
      if (reveal) {
        return new THREE.ShaderMaterial({
          uniforms: { map: { value: map }, scan: uniforms.scan, time: uniforms.time },
          vertexShader: holoVertex,
          fragmentShader: holoFragment,
          transparent: true,
          depthWrite: false,
        });
      }
      return new THREE.MeshBasicMaterial({ map, transparent: true, alphaTest: 0.04, toneMapped: false, depthWrite: false });
    };
    return Object.fromEntries(LAYERS.map((l) => [l, make(l)])) as unknown as Record<Layer, THREE.Material>;
  }, [reveal, uniforms]);

  const root = useRef<THREE.Group>(null);
  const hop = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const arms = useRef<THREE.Group>(null);
  const blink = useRef<THREE.Mesh>(null);
  const world = useMemo(() => new THREE.Vector3(), []);
  const energy = useRef(0);
  const nextBlink = useRef(2);
  const blinkAt = useRef(-10);
  const doubleBlink = useRef(false);

  useFrame((state, dt) => {
    const t = still ? 0 : state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);

    // Face the camera around the vertical axis
    root.current!.getWorldPosition(world);
    root.current!.rotation.y = Math.atan2(state.camera.position.x - world.x, state.camera.position.z - world.z);

    energy.current = THREE.MathUtils.damp(energy.current, excited && !still ? 1 : 0, 5, d);
    const e = energy.current;

    // Whole body: a happy hop when excited
    hop.current!.position.y = e * Math.abs(Math.sin(t * 6)) * 0.14;

    // Torso: breathing and a slow weight shift from the hips
    torso.current!.scale.y = 1 + Math.sin(t * 2) * 0.008;
    torso.current!.rotation.z = Math.sin(t * 0.8) * 0.012 + e * Math.sin(t * 6) * 0.02;

    // Head: tilts toward the pointer, nods along, bobs more when excited
    const tilt = -pointer.x * 0.07 + Math.sin(t * 0.7) * 0.025 + e * Math.sin(t * 6 + 1) * 0.06;
    head.current!.rotation.z = THREE.MathUtils.damp(head.current!.rotation.z, tilt, 4, d);
    head.current!.position.y = neck.y - hem.y + Math.sin(t * 1.3) * 0.006;

    // Arms: tap the laptop in short bursts, like typing
    const burst = Math.max(0, Math.sin(t * 0.9));
    arms.current!.position.y = Math.abs(Math.sin(t * 11)) * 0.007 * burst + e * Math.abs(Math.sin(t * 6)) * 0.02;

    // Blink every few seconds, sometimes twice
    const now = state.clock.elapsedTime;
    if (!still && now > nextBlink.current) {
      blinkAt.current = now;
      doubleBlink.current = Math.random() < 0.25;
      nextBlink.current = now + 2.5 + Math.random() * 3;
    }
    const age = now - blinkAt.current;
    blink.current!.visible = age < 0.12 || (doubleBlink.current && age > 0.24 && age < 0.36);

    uniforms.time.value = state.clock.elapsedTime;
    if (reveal) uniforms.scan.value = reveal.current * 1.02;
  });

  return (
    <group ref={root} position={position}>
      <group ref={hop}>
        <mesh position={centre} material={mats.legs} renderOrder={1}>
          <planeGeometry args={[width, height]} />
        </mesh>
        <group ref={torso} position={hem}>
          <mesh position={[centre.x - hem.x, centre.y - hem.y, 0.002]} material={mats.torso} renderOrder={2}>
            <planeGeometry args={[width, height]} />
          </mesh>
          <group ref={head} position={[neck.x - hem.x, neck.y - hem.y, 0]}>
            <mesh position={[centre.x - neck.x, centre.y - neck.y, 0.004]} material={mats.head} renderOrder={3}>
              <planeGeometry args={[width, height]} />
            </mesh>
            <mesh ref={blink} position={[centre.x - neck.x, centre.y - neck.y, 0.005]} material={mats.blink} renderOrder={4} visible={false}>
              <planeGeometry args={[width, height]} />
            </mesh>
          </group>
          <group ref={arms}>
            <mesh position={[centre.x - hem.x, centre.y - hem.y, 0.006]} material={mats.arms} renderOrder={5}>
              <planeGeometry args={[width, height]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

export default ChristoSprite;
