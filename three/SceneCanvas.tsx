import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { isCoarse } from './common';

interface Props {
  children: React.ReactNode;
  fov?: number;
  className?: string;
  /** Hologram scene needs per-material clipping planes */
  clipping?: boolean;
}

/** One Canvas per section. It only renders while on screen, and phones get a lower pixel ratio. */
const SceneCanvas: React.FC<Props> = ({ children, fov = 32, className, clipping }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const maxDpr = isCoarse() ? 1.5 : 2;
  const [dpr, setDpr] = useState(maxDpr);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={`scene-canvas ${ready ? 'is-ready' : ''} ${className ?? ''}`} aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ fov, position: [8, 6, 9], near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = !!clipping;
          setReady(true);
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} />
        <hemisphereLight args={['#ffffff', '#d9c6a8', 1.3]} />
        <directionalLight position={[5, 9, 6]} intensity={1.7} />
        <directionalLight position={[-6, 4, -2]} intensity={0.45} color="#b8c6ff" />
        <Environment resolution={64} frames={1}>
          <Lightformer intensity={2} position={[0, 5, 5]} scale={[10, 5, 1]} />
          <Lightformer intensity={1} position={[-5, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} color="#c9d4ff" />
        </Environment>
        {children}
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
