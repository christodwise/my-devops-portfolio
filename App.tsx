import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple spy to update active section in nav
      const sections = ['home', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white tracking-wider">
            CJ<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1) 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:border-slate-600 transition-all">
            Hire Me
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Christo Jimmy. All rights reserved.</p>
        <p className="mt-2 text-xs">Built with React, Tailwind & Gemini AI</p>
      </footer>

      <GeminiChat />
    </div>
  );
};

export default App;
