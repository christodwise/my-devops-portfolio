import React, { lazy } from 'react';
import Lazy3D from './Lazy3D';
import { RESUME_DATA } from '../constants';
import { useScrollProgress } from '../hooks/useScrollProgress';

const HeroScene = lazy(() => import('../three/HeroScene'));

const Hero: React.FC = () => {
  const [ref, progress] = useScrollProgress<HTMLElement>('exit');
  const [first, last] = RESUME_DATA.name.split(' ');

  return (
    <section id="home" ref={ref} className="hero3d">
      <Lazy3D
        eager
        className="hero3d-scene"
        fallback={<div className="scene-fallback"><img src={`${import.meta.env.BASE_URL}christo.png`} alt="" /></div>}
      >
        <HeroScene progress={progress} />
      </Lazy3D>

      <div className="hero3d-copy">
        <p className="status-pill"><span className="status-dot" aria-hidden="true" /> open to new roles</p>
        <h1 className="hero3d-name">
          <span>{first}</span>
          <span>{last}</span>
        </h1>
        <p className="role-stamp">devops engineer</p>
        <p className="hero3d-sub">I build the pipelines, clusters and dashboards that keep apps shipping.</p>
        <p className="hero3d-now">Currently: DevOps at dWise Healthcare IT, Bangalore</p>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span className="mouse" aria-hidden="true"><span /></span>
      </a>
    </section>
  );
};

export default Hero;
