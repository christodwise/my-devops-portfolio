import { useEffect, useRef } from 'react';

/**
 * Scroll progress of a section, written into a ref so 3D scenes can read it per frame without re-rendering.
 * mode 'exit': 0 when the section top hits the viewport top, 1 when it has scrolled fully out.
 * mode 'pinned': 0..1 across the scroll distance of a tall section with a sticky child.
 * mode 'enter': 0 when the section top reaches the viewport bottom, 1 when its top reaches the viewport top.
 */
export function useScrollProgress<T extends HTMLElement>(mode: 'exit' | 'pinned' | 'enter', onChange?: (p: number) => void) {
  const ref = useRef<T>(null);
  const progress = useRef({ current: 0 });
  const cb = useRef(onChange);
  cb.current = onChange;

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'exit') p = -r.top / r.height;
      else if (mode === 'pinned') p = -r.top / Math.max(1, r.height - vh);
      else p = 1 - r.top / vh;
      p = Math.min(1, Math.max(0, p));
      if (p !== progress.current.current) {
        progress.current.current = p;
        cb.current?.(p);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mode]);

  return [ref, progress.current] as const;
}
