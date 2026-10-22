import React, { useEffect, useState } from 'react';
import { Activity, Boxes, Database, FileCode2, Workflow, Wrench } from 'lucide-react';
import { NUMBERS, SERVICES } from '../constants';
import { Service } from '../types';
import { prefersReducedMotion, useInView } from '../hooks/useInView';

const ICONS: Record<Service['icon'], React.ReactNode> = {
  pipeline: <Workflow size={22} />,
  k8s: <Boxes size={22} />,
  iac: <FileCode2 size={22} />,
  observe: <Activity size={22} />,
  db: <Database size={22} />,
  tools: <Wrench size={22} />,
};

/** Counts up once when it scrolls into view */
const CountUp: React.FC<{ to: number; run: boolean }> = ({ to, run }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) return setN(to);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
};

const Services: React.FC = () => {
  const [ref, inView] = useInView<HTMLUListElement>(0.4);
  return (
    <section id="services" className="section">
      <ul ref={ref} className="numbers" aria-label="At a glance">
        {NUMBERS.map((n) => (
          <li key={n.label}>
            <strong><CountUp to={n.value} run={inView} />{n.suffix}</strong>
            <span>{n.label}</span>
          </li>
        ))}
      </ul>

      <div className="section-head">
        <p className="tag-stamp">what i do</p>
        <h2 className="section-title">I keep software shipping</h2>
        <p className="section-sub">From the first commit to the 3am alert, this is the work I take on.</p>
      </div>

      <div className="service-grid">
        {SERVICES.map((s) => (
          <article key={s.title} className="service">
            <span className="service-icon" aria-hidden="true">{ICONS[s.icon]}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="tech-tags">
              {s.tools.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
