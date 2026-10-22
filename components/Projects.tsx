import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { OPEN_SOURCE, PROJECTS } from '../constants';
import { OpenSourceProject } from '../types';

const base = import.meta.env.BASE_URL;

const Terminal: React.FC<{ lines: string[] }> = ({ lines }) => (
  <div className="thumb-window">
    <div className="thumb-dots"><i /><i /><i /></div>
    {lines.map((line, i) => (
      <p key={i} className={line.startsWith('$') ? 'cmd' : 'out'}>{line}</p>
    ))}
  </div>
);

const RepoCard: React.FC<{ p: OpenSourceProject; featured?: boolean }> = ({ p, featured }) => (
  <a className={`repo ${featured ? 'repo-featured' : ''}`} href={p.repo} target="_blank" rel="noreferrer">
    <div className={`repo-thumb ${p.image ? '' : 'thumb-terminal'}`} aria-hidden="true">
      {p.image ? <img src={`${base}${p.image}`} alt="" loading="lazy" /> : <Terminal lines={p.terminal ?? []} />}
    </div>
    <div className="repo-body">
      <p className="repo-tagline">{p.tagline}</p>
      <h3>{p.name} <ArrowUpRight size={18} aria-hidden="true" /></h3>
      <p className="project-desc">{p.description}</p>
      <ul className="tech-tags">
        {p.tags.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  </a>
);

const Projects: React.FC = () => {
  const [featured, ...rest] = OPEN_SOURCE;
  return (
    <section id="projects" className="projects">
      <div className="section-head section-head-row">
        <div>
          <p className="tag-stamp">selected</p>
          <h2 className="section-title">Projects</h2>
        </div>
        <a className="ghost-link" href="https://github.com/christodwise" target="_blank" rel="noreferrer">
          <Github size={18} aria-hidden="true" /> All repos on GitHub
        </a>
      </div>

      <h3 className="subhead">Open source</h3>
      <RepoCard p={featured} featured />
      <div className="repo-grid">
        {rest.map((p) => <RepoCard key={p.name} p={p} />)}
      </div>

      <h3 className="subhead">At work</h3>
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <article key={p.id} className="project">
            <div className={`project-thumb thumb-${p.id}`} aria-hidden="true">
              <Terminal lines={p.terminal} />
              <span className="thumb-emoji">{p.emoji}</span>
            </div>
            <h3>{p.title}</h3>
            <p className="project-sub">{p.subtitle}</p>
            <p className="project-desc">{p.description}</p>
            <ul className="tech-tags">
              {p.techStack.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
