import React, { lazy, useRef, useState } from 'react';
import { Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import Lazy3D from './Lazy3D';
import { RESUME_DATA } from '../constants';
import { burstConfetti } from '../hooks/confetti';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ContactScene = lazy(() => import('../three/ContactScene'));

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [scrolledIn, setScrolledIn] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Christo gets excited once the section is mostly on screen, or when you reach for a contact button
  const [ref] = useScrollProgress<HTMLElement>('enter', (p) => setScrolledIn(p > 0.85));
  const awake = scrolledIn || hovering;
  const bubble = useRef<HTMLDivElement>(null);

  const copyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    try {
      await navigator.clipboard.writeText(RESUME_DATA.email);
      setCopied(true);
      burstConfetti(box.left + box.width / 2, box.top + box.height / 2);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${RESUME_DATA.email}`;
    }
  };

  const wake = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false), onFocus: () => setHovering(true), onBlur: () => setHovering(false) };

  return (
    <section id="contact" ref={ref} className="contact3d">
      <Lazy3D className="contact3d-scene" fallback={<div className="scene-fallback"><img src={`${import.meta.env.BASE_URL}christo.png`} alt="" /></div>}>
        <ContactScene awake={awake} bubble={bubble} />
        <div ref={bubble} className="say" aria-hidden="true">
          {awake ? "Let's build something! 🚀" : 'hey, you made it 👋'}
        </div>
      </Lazy3D>

      <div className="contact3d-copy">
        <h2 className="contact3d-title">Let's work together!</h2>
        <p className="contact3d-sub">Hiring for DevOps or cloud, or got a pipeline that keeps breaking? I usually reply within a day.</p>

        <div className="contact3d-actions" {...wake}>
          <a className="round-btn" href={`mailto:${RESUME_DATA.email}`} aria-label="Email"><Mail size={20} /></a>
          <a className="round-btn" href={`https://${RESUME_DATA.github}`} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
          <a className="round-btn" href={`https://${RESUME_DATA.linkedin}`} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a className="round-btn" href={`tel:${RESUME_DATA.phone}`} aria-label="Phone"><Phone size={20} /></a>
        </div>

        <div className="email-chip" {...wake}>
          <span>{RESUME_DATA.email}</span>
          <button type="button" onClick={copyEmail}>
            <Copy size={15} aria-hidden="true" /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
