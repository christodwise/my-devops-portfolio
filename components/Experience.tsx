import React, { useState } from 'react';
import { EXPERIENCE } from '../constants';

const PREVIEW = 3;

// Career told as release notes: newest version on top
const Experience: React.FC = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section id="experience" className="section">
      <div className="section-head">
        <p className="tag-stamp">changelog</p>
        <h2 className="section-title">Experience</h2>
        <p className="section-sub">Every role shipped a new version of me. Latest release first.</p>
      </div>

      <ol className="changelog">
        {EXPERIENCE.map((job, i) => {
          const version = `v${job.version}`;
          const expanded = open[job.id];
          const items = expanded ? job.description : job.description.slice(0, PREVIEW);
          return (
            <li key={job.id} className={`release ${i === 0 ? 'is-latest' : ''}`}>
              <div className="release-tag">
                <span className="version">{version}</span>
                {i === 0 && <span className="latest-badge">latest</span>}
              </div>
              <article className="release-card">
                <header>
                  <h3>{job.role}</h3>
                  <p className="release-meta">
                    <span>{job.company}</span>
                    <span className="release-period">{job.period}</span>
                  </p>
                </header>
                <ul className="release-notes">
                  {items.map((d) => <li key={d}>{d}</li>)}
                </ul>
                {job.description.length > PREVIEW && (
                  <button
                    type="button"
                    className="link-btn"
                    aria-expanded={!!expanded}
                    onClick={() => setOpen({ ...open, [job.id]: !expanded })}
                  >
                    {expanded ? 'Show fewer changes' : `Show all ${job.description.length} changes`}
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Experience;
