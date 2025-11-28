import React from 'react';
import { Download, ChevronDown, Terminal, Cloud, Server, Box, Code2, Lock, Activity } from 'lucide-react';
import { RESUME_DATA, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950 pt-20 lg:pt-0">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask z-0 pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm text-cyan-400 text-sm font-medium shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              DevOps Engineer & Cloud Architect
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 tracking-tight leading-tight">
              I am <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-glow">
                {RESUME_DATA.name}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-400 font-light mb-8 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-cyan-500 font-mono text-lg">&lt;</span>
              Building Scalable Cloud Infrastructure
              <span className="text-cyan-500 font-mono text-lg">/&gt;</span>
            </h2>

            <p className="max-w-xl mx-auto lg:mx-0 text-slate-400 text-lg leading-relaxed mb-10">
              {RESUME_DATA.summary}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <a 
                    href="#contact"
                    className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                    <Download className="w-5 h-5" /> 
                    Download Resume
                </a>
                
                <div className="flex gap-4">
                    {SOCIAL_LINKS.map((link, i) => (
                        <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
                        aria-label={link.platform}
                        >
                        {link.icon}
                        </a>
                    ))}
                </div>
            </div>
          </div>

          {/* Profile Picture & Creative Animations */}
          <div className="flex-1 relative flex justify-center items-center animate-fade-in-right min-h-[450px] lg:min-h-[600px]">
             
             {/* Tech HUD Ring 1 (Large Outer) */}
            <div className="absolute border border-slate-800/60 rounded-full w-[320px] h-[320px] md:w-[500px] md:h-[500px] animate-spin-slow z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/50 rounded-full box-shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-blue-500/50 rounded-full"></div>
            </div>
            
            {/* Tech HUD Ring 2 (Dashed Reverse) */}
            <div className="absolute border-2 border-slate-800/30 border-dashed rounded-full w-[260px] h-[260px] md:w-[400px] md:h-[400px] animate-spin-reverse-slow z-0">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 border border-cyan-500/50 rounded-full"></div>
            </div>

            {/* Tech HUD Ring 3 (Inner Thin) */}
            <div className="absolute border border-cyan-500/10 rounded-full w-[200px] h-[200px] md:w-[280px] md:h-[280px] animate-[spin_10s_linear_infinite] z-0"></div>

            {/* Floating Card 1: Code Snippet (Top Right) */}
            <div className="absolute top-0 -right-4 md:top-10 md:-right-6 p-4 bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl backdrop-blur-md animate-float-delayed z-20 hidden lg:block transform hover:scale-105 transition-transform duration-300 group hover:border-cyan-500/30">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] text-slate-400 font-mono">main.tf</span>
                    <div className="flex gap-1 ml-auto">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                </div>
                <div className="space-y-1.5 font-mono text-[10px] leading-tight text-slate-400">
                    <p><span className="text-purple-400">resource</span> <span className="text-green-400">"aws_s3"</span> <span className="text-yellow-400">"app"</span> {`{`}</p>
                    <p className="pl-3">bucket = <span className="text-cyan-400">"prod-assets"</span></p>
                    <p className="pl-3">acl    = <span className="text-cyan-400">"private"</span></p>
                    <p className="pl-3">tags   = {`{`}</p>
                    <p className="pl-6">Env = <span className="text-cyan-400">"Prod"</span></p>
                    <p className="pl-3">{`}`}</p>
                    <p>{`}`}</p>
                </div>
                {/* Decorative glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>
            </div>

            {/* Floating Card 2: Status (Bottom Left) */}
            <div className="absolute -bottom-8 md:bottom-10 -left-4 md:-left-8 p-3.5 bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl backdrop-blur-md animate-float z-20 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300 group hover:border-emerald-500/30">
                <div className="relative">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-none mb-1">Status</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold leading-none">System Operational</span>
                </div>
                 {/* Decorative glow on hover */}
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>
            </div>

            {/* Floating Card 3: Security (Top Left) */}
            <div className="absolute top-4 -left-2 md:top-20 md:-left-12 p-2.5 bg-slate-900/90 border border-slate-700/50 rounded-lg shadow-xl backdrop-blur-md animate-float z-10 hidden md:flex items-center gap-2" style={{ animationDelay: '2s' }}>
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-slate-300 font-mono">SSL Secured</span>
            </div>
            
            {/* Floating Card 4: Uptime (Bottom Right) */}
            <div className="absolute bottom-20 -right-8 md:bottom-32 md:-right-16 p-2.5 bg-slate-900/90 border border-slate-700/50 rounded-lg shadow-xl backdrop-blur-md animate-float z-10 hidden md:flex items-center gap-2" style={{ animationDelay: '1.5s' }}>
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] text-slate-300 font-mono">99.9% Uptime</span>
            </div>

            {/* Profile Image Container */}
             <div className="relative w-40 h-40 md:w-52 md:h-52 z-10">
                {/* Rotating glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 blur-[2px] opacity-70 animate-spin-slow p-1">
                   <div className="w-full h-full rounded-full bg-slate-950"></div>
                </div>
                
                {/* Back glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>

                {/* Main Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-900/50 shadow-2xl profile-glow z-10 group bg-slate-900">
                    <img 
                        src={RESUME_DATA.profileImage} 
                        alt={RESUME_DATA.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Simplified Overlay - Removed Scan Animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Orbiting Tech Icons */}
                <div className="absolute -top-4 -left-4 p-2.5 bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-md animate-float z-20 group cursor-pointer hover:border-cyan-500/50">
                    <Cloud className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:animate-pulse" />
                </div>
                
                <div className="absolute -bottom-2 -right-2 p-2.5 bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-md animate-float-delayed z-20 group cursor-pointer hover:border-blue-500/50">
                    <Server className="w-4 h-4 md:w-5 md:h-5 text-blue-400 group-hover:animate-pulse" />
                </div>
                
                <div className="absolute top-2 -right-8 md:-right-10 p-2 bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-md animate-pulse-slow z-20 group cursor-pointer hover:border-purple-500/50">
                    <Terminal className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                </div>

                 <div className="absolute bottom-4 -left-8 md:-left-10 p-2 bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-md animate-float z-20 group cursor-pointer hover:border-emerald-500/50" style={{ animationDelay: '1.5s' }}>
                    <Box className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer hidden md:block">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;