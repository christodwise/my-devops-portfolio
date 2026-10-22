import React, { Suspense, useEffect, useRef, useState } from 'react';
import { hasWebGL } from '../hooks/webgl';

interface Props {
  children: React.ReactNode;
  /** Shown when WebGL isn't available */
  fallback: React.ReactNode;
  className?: string;
  /** Mount right away instead of waiting until it's near the viewport */
  eager?: boolean;
}

const webgl = typeof window !== 'undefined' && hasWebGL();

/** Mounts a 3D scene only while its section is near the viewport, so at most one or two GL contexts are alive. */
const Lazy3D: React.FC<Props> = ({ children, fallback, className, eager }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(!!eager);

  useEffect(() => {
    if (!webgl) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '60% 0px' });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {!webgl ? fallback : near ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

export default Lazy3D;
