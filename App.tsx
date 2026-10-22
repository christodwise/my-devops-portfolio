import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MiniChristo from './components/MiniChristo';
import { RESUME_DATA } from './constants';

const NAV = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'services' },
  { name: 'Work', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

const App: React.FC = () => {
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current = 'home';
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className={`topbar ${active === 'about' ? 'is-dark' : ''}`}>
        <a href="#home" className="nav-logo" aria-label="Back to top">cj</a>
        <nav className="nav" aria-label="Main">
          {NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? 'is-active' : ''}`}>
              {l.name}
            </a>
          ))}
        </nav>
        <a href={`mailto:${RESUME_DATA.email}`} className="cta-btn">Get in touch</a>
      </header>

      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {RESUME_DATA.name}</p>
        <p>Built with React and three.js. Deployed with GitHub Pages, obviously.</p>
      </footer>

      <MiniChristo />
    </>
  );
};

export default App;
