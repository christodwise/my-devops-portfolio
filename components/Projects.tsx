import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { FolderGit2, ArrowUpRight, Github, Database, Zap, Terminal, Server, Cloud, Globe } from 'lucide-react';

// Helper to map tech names to Devicon classes or Lucide icons
const getTechIcon = (tech: string) => {
  const lowerTech = tech.toLowerCase();
  
  // Map specific terms to Devicon classes
  if (lowerTech.includes('aws')) return <i className="devicon-amazonwebservices-plain-wordmark text-lg"></i>;
  if (lowerTech.includes('terraform')) return <i className="devicon-terraform-plain text-lg"></i>;
  if (lowerTech.includes('docker')) return <i className="devicon-docker-plain text-lg"></i>;
  if (lowerTech.includes('kubernetes') || lowerTech.includes('k8s')) return <i className="devicon-kubernetes-plain text-lg"></i>;
  if (lowerTech.includes('jenkins')) return <i className="devicon-jenkins-line text-lg"></i>;
  if (lowerTech.includes('gitlab')) return <i className="devicon-gitlab-plain text-lg"></i>;
  if (lowerTech.includes('postgres')) return <i className="devicon-postgresql-plain text-lg"></i>;
  if (lowerTech.includes('mongo')) return <i className="devicon-mongodb-plain text-lg"></i>;
  if (lowerTech.includes('prometheus')) return <i className="devicon-prometheus-original text-lg"></i>;
  if (lowerTech.includes('grafana')) return <i className="devicon-grafana-original text-lg"></i>;
  if (lowerTech.includes('bash') || lowerTech.includes('scripting')) return <i className="devicon-bash-plain text-lg"></i>;
  if (lowerTech.includes('linux')) return <i className="devicon-linux-plain text-lg"></i>;
  if (lowerTech.includes('ansible')) return <i className="devicon-ansible-plain text-lg"></i>;
  if (lowerTech.includes('python')) return <i className="devicon-python-plain text-lg"></i>;
  if (lowerTech.includes('react')) return <i className="devicon-react-original text-lg"></i>;
  
  // Fallback for generic terms using Lucide
  if (lowerTech.includes('database') || lowerTech.includes('db')) return <Database className="w-4 h-4" />;
  if (lowerTech.includes('optimization') || lowerTech.includes('performance')) return <Zap className="w-4 h-4" />;
  if (lowerTech.includes('cloud')) return <Cloud className="w-4 h-4" />;
  if (lowerTech.includes('web')) return <Globe className="w-4 h-4" />;
  if (lowerTech.includes('server')) return <Server className="w-4 h-4" />;
  
  return <Terminal className="w-4 h-4" />;
};

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Featured Projects</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {PROJECTS.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`group relative glass-card p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] flex flex-col h-full ${isVisible ? 'animate-zoom-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                    {/* Top Gradient Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Background Icon Watermark */}
                    <div className="absolute -bottom-4 -right-4 text-slate-800/50 group-hover:text-cyan-900/20 transition-colors duration-500 rotate-12 pointer-events-none">
                        <FolderGit2 className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-slate-900/80 border border-slate-700/50 rounded-xl text-cyan-400 shadow-md group-hover:scale-110 transition-transform duration-300">
                                <FolderGit2 className="w-6 h-6" />
                            </div>
                            <div className="flex gap-2">
                                <a href="#" className="p-2 rounded-lg bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700" title="View Source">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700" title="View Project">
                                    <ArrowUpRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-4">{project.title}</h3>
                        
                        <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow">
                            {project.description}
                        </p>

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-md bg-slate-900/80 text-slate-300 text-xs font-medium border border-slate-800 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors flex items-center gap-2 hover:bg-slate-800">
                                        {getTechIcon(tech)}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;