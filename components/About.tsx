import React, { lazy, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import Lazy3D from './Lazy3D';
import { RESUME_DATA, SKILLS, STATS } from '../constants';
import { useScrollProgress } from '../hooks/useScrollProgress';

const LabScene = lazy(() => import('../three/LabScene'));

// Scroll thresholds at which each HUD panel appears
const STAGES = [0.06, 0.24, 0.42, 0.6, 0.78];

const About: React.FC = () => {
  const counter = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState(0);

  const [ref, progress] = useScrollProgress<HTMLElement>('pinned', (p) => {
    const pct = Math.round(p * 100);
    if (counter.current) counter.current.textContent = String(pct).padStart(3, '0');
    if (status.current) status.current.textContent = pct >= 100 ? 'christo.exe ready' : 'compiling christo.exe';
    const next = STAGES.filter((s) => p >= s).length;
    setStage((cur) => (cur === next ? cur : next));
  });

  const panel = (i: number) => `hud hud-${i} ${stage > i ? 'is-on' : ''} ${stage === i + 1 ? 'is-current' : ''}`;

  return (
    <section id="about" ref={ref} className="lab">
      <div className="lab-sticky">
        <Lazy3D className="lab-scene" fallback={null}>
          <LabScene progress={progress} />
        </Lazy3D>

        <p className="lab-status" aria-hidden="true"><span ref={status}>compiling christo.exe</span></p>

        <div className={panel(0)}>
          <h2 className="hud-name">{RESUME_DATA.name}</h2>
          <p className="hud-meta"><MapPin size={14} aria-hidden="true" /> Bangalore, India</p>
        </div>

        <div className={panel(1)}>
          <p>
            DevOps engineer at dWise Healthcare IT since 2023. I automate infrastructure, run Kubernetes in
            production and build open-source tools like KubePulse on the side. Before that, 3+ years of tech
            support for banking and gaming apps.
          </p>
        </div>

        <div className={panel(2)}>
          <h3>Skills</h3>
          <ul>
            {SKILLS.map((s) => (
              <li key={s.category}><strong>{s.category}</strong> {s.skills.slice(0, 4).join(', ')}</li>
            ))}
          </ul>
        </div>

        <div className={panel(3)}>
          <h3>Impact</h3>
          <ul className="hud-stats">
            {STATS.map((s) => (
              <li key={s.label}><strong>{s.value}</strong> {s.label}</li>
            ))}
          </ul>
        </div>

        <div className={panel(4)}>
          <h3>Certified</h3>
          <ul>
            {RESUME_DATA.certifications.map((c) => <li key={c}>{c}</li>)}
            <li>{RESUME_DATA.education}</li>
          </ul>
        </div>

        <p className="lab-counter" aria-hidden="true"><span ref={counter}>000</span></p>
      </div>
    </section>
  );
};

export default About;
