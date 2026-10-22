import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';
import ChristoSprite from './ChristoSprite';
import { Duck, Plant, ServerRack } from './Props';
import { BlobShadow, COLORS, Progress, pointer, seg } from './common';
import { createDashboard, createNotes, createTerminal } from './screens';

type V3 = [number, number, number];

const DESK_TOP = 1.1;

const Monitor: React.FC<{ position: V3; rotationY: number; texture: THREE.Texture }> = ({ position, rotationY, texture }) => (
  <group position={position} rotation-y={rotationY}>
    <RoundedBox args={[1.32, 0.86, 0.08]} radius={0.05} smoothness={2} position={[0, 0.7, 0]}>
      <meshStandardMaterial color={COLORS.accent} roughness={0.5} />
    </RoundedBox>
    <mesh position={[0, 0.7, 0.042]}>
      <planeGeometry args={[1.2, 0.74]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
    <mesh position={[0, 0.17, -0.02]}>
      <cylinderGeometry args={[0.04, 0.04, 0.34, 12]} />
      <meshStandardMaterial color={COLORS.white} roughness={0.4} />
    </mesh>
    <RoundedBox args={[0.42, 0.04, 0.26]} radius={0.02} smoothness={2} position={[0, 0.02, 0]}>
      <meshStandardMaterial color={COLORS.white} roughness={0.4} />
    </RoundedBox>
  </group>
);

const DeskLamp: React.FC<{ position: V3 }> = ({ position }) => (
  <group position={position} rotation-y={0.6}>
    <mesh position={[0, 0.03, 0]}>
      <cylinderGeometry args={[0.14, 0.16, 0.06, seg(24)]} />
      <meshStandardMaterial color={COLORS.white} roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.38, 0]}>
      <cylinderGeometry args={[0.025, 0.025, 0.7, 10]} />
      <meshStandardMaterial color={COLORS.white} roughness={0.4} />
    </mesh>
    <group position={[0, 0.74, 0.08]} rotation-x={0.7}>
      <mesh position={[0, 0, 0.12]} rotation-x={Math.PI / 2}>
        <capsuleGeometry args={[0.022, 0.24, 4, 8]} />
        <meshStandardMaterial color={COLORS.white} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0.28]} rotation-x={0.6}>
        <coneGeometry args={[0.16, 0.2, seg(24), 1, true]} />
        <meshStandardMaterial color={COLORS.accent} roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.09, 0.31]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#FFF3C4" toneMapped={false} />
      </mesh>
    </group>
  </group>
);

const Cactus: React.FC<{ position: V3 }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.1, 0]}>
      <cylinderGeometry args={[0.13, 0.11, 0.2, seg(20)]} />
      <meshStandardMaterial color={COLORS.white} roughness={0.5} />
    </mesh>
    <mesh position={[0, 0.38, 0]}>
      <capsuleGeometry args={[0.09, 0.28, 4, seg(16)]} />
      <meshStandardMaterial color="#FF9A4A" roughness={0.6} />
    </mesh>
    <mesh position={[0.12, 0.42, 0]} rotation-z={-0.9}>
      <capsuleGeometry args={[0.05, 0.1, 4, 12]} />
      <meshStandardMaterial color="#FF9A4A" roughness={0.6} />
    </mesh>
    <mesh position={[-0.11, 0.36, 0]} rotation-z={0.9}>
      <capsuleGeometry args={[0.045, 0.08, 4, 12]} />
      <meshStandardMaterial color="#FF9A4A" roughness={0.6} />
    </mesh>
  </group>
);

const HelmWheel: React.FC<{ position: V3 }> = ({ position }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { ref.current!.rotation.z -= dt * 0.4; });
  return (
    <group position={position}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[0.38, 0.06, 12, seg(32)]} />
          <meshStandardMaterial color="#326CE5" roughness={0.4} />
        </mesh>
        {Array.from({ length: 7 }, (_, i) => (
          <group key={i} rotation-z={(i / 7) * Math.PI * 2}>
            <mesh position={[0, 0.3, 0]}>
              <capsuleGeometry args={[0.03, 0.42, 4, 8]} />
              <meshStandardMaterial color="#326CE5" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.52, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#326CE5" roughness={0.4} />
            </mesh>
          </group>
        ))}
        <mesh rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
};

const Room: React.FC = () => {
  const terminal = useMemo(createTerminal, []);
  const dashboard = useMemo(createDashboard, []);
  const notes = useMemo(createNotes, []);
  const acc = useRef(0);

  // Redraw screens ~4 times a second
  useFrame((_, dt) => {
    acc.current += dt;
    if (acc.current > 0.25) {
      acc.current = 0;
      terminal.tick();
      dashboard.tick();
    }
  });

  return (
    <group>
      {/* Layered rug */}
      {[[6.6, '#FF8A3D'], [5.4, '#FFAE63'], [4.2, '#FFD29C'], [3, '#FFE8CA']].map(([size, color], i) => (
        <RoundedBox key={i} args={[size as number, 0.04, (size as number) * 0.85]} radius={0.02} smoothness={2} position={[0, 0.02 + i * 0.012, -0.2]}>
          <meshStandardMaterial color={color as string} roughness={0.95} />
        </RoundedBox>
      ))}

      {/* Chunky orange desk */}
      <BlobShadow position={[0, 0.08, 0]} scale={4} opacity={0.22} />
      <RoundedBox args={[3.4, 0.2, 1.2]} radius={0.08} smoothness={3} position={[0, DESK_TOP, 0]}>
        <meshStandardMaterial color={COLORS.desk} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.9, 0.06, 0.02]} radius={0.02} smoothness={2} position={[0, DESK_TOP - 0.02, 0.605]}>
        <meshStandardMaterial color="#E86A1E" roughness={0.5} />
      </RoundedBox>
      {[[-1.55, -0.45], [1.55, -0.45], [-1.55, 0.45], [1.55, 0.45]].map(([x, z], i) => (
        <mesh key={i} position={[x, DESK_TOP / 2, z]}>
          <cylinderGeometry args={[0.06, 0.05, DESK_TOP, 12]} />
          <meshStandardMaterial color={COLORS.white} roughness={0.5} />
        </mesh>
      ))}

      <Monitor position={[-1.2, DESK_TOP + 0.1, -0.15]} rotationY={0.45} texture={terminal.texture} />
      <DeskLamp position={[-0.62, DESK_TOP + 0.1, 0.3]} />
      <Cactus position={[1.35, DESK_TOP + 0.1, 0.25]} />
      <Duck position={[0.85, DESK_TOP + 0.1, 0.3]} rotation={[0, -0.4, 0]} />
      <group position={[1.05, DESK_TOP + 0.1, -0.25]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.24, seg(20)]} />
          <meshStandardMaterial color={COLORS.white} roughness={0.5} />
        </mesh>
        <mesh position={[-0.11, 0.12, 0]} rotation-z={Math.PI / 2}>
          <torusGeometry args={[0.055, 0.018, 8, 16]} />
          <meshStandardMaterial color={COLORS.white} roughness={0.5} />
        </mesh>
      </group>
      <RoundedBox args={[0.12, 0.05, 0.18]} radius={0.025} smoothness={2} position={[0.55, DESK_TOP + 0.12, -0.35]}>
        <meshStandardMaterial color={COLORS.white} roughness={0.4} />
      </RoundedBox>

      {/* Empty chair, pushed back */}
      <group position={[0, 0, -1.15]}>
        <BlobShadow scale={1.5} opacity={0.3} />
        <RoundedBox args={[0.85, 0.12, 0.8]} radius={0.05} smoothness={2} position={[0, 0.72, 0]}>
          <meshStandardMaterial color={COLORS.white} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[0.85, 0.9, 0.12]} radius={0.05} smoothness={2} position={[0, 1.22, -0.42]} rotation-x={0.1}>
          <meshStandardMaterial color={COLORS.accent} roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.66, 12]} />
          <meshStandardMaterial color="#A8ADBD" metalness={0.5} roughness={0.3} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i * 1.2566) * 0.22, 0.05, Math.sin(i * 1.2566) * 0.22]} rotation={[0, -i * 1.2566, Math.PI / 2]}>
            <capsuleGeometry args={[0.03, 0.4, 4, 8]} />
            <meshStandardMaterial color="#A8ADBD" metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Christo, front and centre with his laptop */}
      <BlobShadow position={[0.35, 0.075, 1.5]} scale={1.7} opacity={0.4} />
      <ChristoSprite position={[0.35, 0.07, 1.5]} height={3.1} />

      <BlobShadow position={[2.6, 0.06, -1.2]} scale={1.8} opacity={0.3} />
      <ServerRack position={[2.6, 0.05, -1.2]} rotation={[0, -0.5, 0]} />

      <Plant position={[-2.6, 0.05, 0.9]} scale={1.1} />
      <BlobShadow position={[-2.6, 0.06, 0.9]} scale={1.2} opacity={0.3} />

      {/* Floating wall pieces, like a cut-away room */}
      <group position={[-2.55, 2.55, -2.2]}>
        <RoundedBox args={[1.3, 0.08, 0.4]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color={COLORS.wood} roughness={0.6} />
        </RoundedBox>
        {[['#326CE5', 0.5], [COLORS.accent, 0.42], ['#FFD23F', 0.55], ['#3DDC97', 0.46]].map(([c, h], i) => (
          <RoundedBox key={i} args={[0.12, h as number, 0.3]} radius={0.02} smoothness={2} position={[-0.45 + i * 0.14, (h as number) / 2 + 0.04, 0]} rotation-z={i === 3 ? -0.25 : 0}>
            <meshStandardMaterial color={c as string} roughness={0.7} />
          </RoundedBox>
        ))}
        <Plant position={[0.35, 0.04, 0]} scale={0.4} />
      </group>

      <group position={[-0.85, 3.35, -2.3]}>
        <RoundedBox args={[1.6, 1.1, 0.08]} radius={0.06} smoothness={2}>
          <meshStandardMaterial color={COLORS.wood} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.46, 0.96]} />
          <meshStandardMaterial map={notes} roughness={0.9} />
        </mesh>
      </group>

      {/* Wall-mounted dashboard */}
      <group position={[1.25, 3.15, -2.3]}>
        <RoundedBox args={[1.9, 1.22, 0.08]} radius={0.06} smoothness={2}>
          <meshStandardMaterial color="#2B2F3E" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.78, 1.1]} />
          <meshBasicMaterial map={dashboard.texture} toneMapped={false} />
        </mesh>
      </group>

      <HelmWheel position={[2.95, 3.75, -2.0]} />
    </group>
  );
};

const CLOSE_POS = new THREE.Vector3(2.4, 2.9, 6.2);
const CLOSE_LOOK = new THREE.Vector3(0.35, 2.1, 1.45);

/** Camera rig: frames the room, drifts with the pointer and dollies in as you scroll away */
const Rig: React.FC<{ progress: Progress }> = ({ progress }) => {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3());
  const look = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const aspect = size.width / size.height;
    const portrait = aspect < 0.9;
    const p = THREE.MathUtils.smoothstep(progress.current, 0, 1);

    // Wide screens: room sits on the right, text on the left. Portrait: room sits low.
    const dist = portrait ? Math.max(1.65, 0.95 / aspect) : aspect < 1.3 ? 1.3 : 1.1;
    pos.set(6.2 * dist, 5.6 * dist, 9.8 * dist);
    look.set(portrait ? 0 : aspect < 1.3 ? -1.3 : -2.1, portrait ? 3.4 : 1.8, -0.5);

    pos.lerp(CLOSE_POS, p * 0.85);
    look.lerp(CLOSE_LOOK, p * 0.85);

    pos.x += pointer.x * 0.5;
    pos.y += -pointer.y * 0.3;

    const k = Math.min(dt, 0.05);
    camera.position.lerp(pos, 1 - Math.exp(-5 * k));
    target.current.lerp(look, 1 - Math.exp(-5 * k));
    camera.lookAt(target.current);
  });
  return null;
};

const HeroScene: React.FC<{ progress: Progress }> = ({ progress }) => (
  <SceneCanvas fov={30}>
    <Room />
    <Rig progress={progress} />
  </SceneCanvas>
);

export default HeroScene;
