import React from 'react';
import { EXPERIENCE } from '../constants';
import { Calendar, MapPin, Cloud, Headset, Gamepad2, ChevronRight, Hash, Database, Globe } from 'lucide-react';

const getRoleIcon = (role: string, company: string) => {
    const r = role.toLowerCase();
    const c = company.toLowerCase();
    
    if (r.includes('devops')) return <Cloud className="w-5 h-5" />;
    if (c.includes('intouch')) return <Gamepad2 className="w-5 h-5" />;
    if (c.includes('24/7')) return <Headset className="w-5 h-5" />;
    return <Database className="w-5 h-5" />;
}

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden">
       {/* Background Grid Pattern Overlay */}
       <div className="absolute inset-0 bg-grid bg-grid-mask opacity-30 pointer-events-none"></div>

       {/* Floating Background Symbols */}
       <div className="absolute top-20 right-10 opacity-10 animate-float hidden lg:block">
           <Hash className="w-24 h-24 text-cyan-500" />
       </div>
       <div className="absolute bottom-40 left-10 opacity-10 animate-float-delayed hidden lg:block">
           <Globe className="w-32 h-32 text-blue-500" />
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Professional Journey</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-2 md:px-0">
            {/* Vertical Line with Data Flow Effect */}
            <div className="absolute left-[28px] md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[2px] bg-slate-800/80 overflow-hidden rounded-full">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-scan" style={{ backgroundSize: '100% 50%' }}></div>
            </div>

            <div className="space-y-16">
                {EXPERIENCE.map((job, index) => (
                    <div key={job.id} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start w-full group perspective-1000`}>
                        
                        {/* Decorative Circuit Connectors */}
                        <div className={`hidden md:block absolute top-10 h-[2px] w-[calc(50%-2rem)] bg-slate-800/50 ${index % 2 === 0 ? 'left-1/2 -translate-x-full pr-12' : 'left-1/2 pl-12'} z-0`}>
                            {/* Circuit Line */}
                             <svg className="absolute top-0 w-full h-10 overflow-visible" style={{ [index % 2 === 0 ? 'right' : 'left']: '0' }}>
                                <path 
                                    d={index % 2 === 0 
                                        ? "M 100% 0 L 50% 0 L 0 40" 
                                        : "M 0 0 L 50% 0 L 100% 40"} 
                                    fill="none" 
                                    stroke="#1e293b" 
                                    strokeWidth="2"
                                    className="group-hover:stroke-cyan-500/50 transition-colors duration-500"
                                />
                                <circle cx={index % 2 === 0 ? "0" : "100%"} cy="40" r="3" fill="#06b6d4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />
                            </svg>
                        </div>

                        {/* Central Tech Node */}
                        <div className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 w-12 h-12 z-20 mt-4 flex items-center justify-center">
                            {/* Node Core */}
                            <div className="w-full h-full bg-slate-900 rounded-full border-2 border-slate-700 group-hover:border-cyan-500 transition-all duration-300 relative flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                                    {getRoleIcon(job.role, job.company)}
                                </div>
                                {/* Ping Effect */}
                                <div className="absolute inset-0 border-2 border-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="w-full md:w-5/12 pl-16 md:pl-0 md:px-0">
                             {/* Floating 'Level' Badge */}
                            <div className={`hidden md:flex absolute top-0 -mt-8 ${index % 2 === 0 ? 'right-0' : 'left-0'} items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                                <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-mono">
                                    {index === 0 ? 'Current Level' : `Level 0${EXPERIENCE.length - index}`}
                                </span>
                                <div className="h-[1px] w-8 bg-cyan-500/50"></div>
                            </div>

                            <div className={`glass-card p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] transform group-hover:-translate-y-1 relative overflow-hidden ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                                
                                {/* Status Indicator */}
                                <div className={`absolute top-4 ${index % 2 === 0 ? 'right-4' : 'right-4 md:right-auto md:left-4'} flex items-center gap-2`}>
                                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                                    <span className="text-[10px] font-mono text-slate-500 uppercase">{index === 0 ? 'Active' : 'Completed'}</span>
                                </div>

                                {/* Decorative Background Watermark */}
                                <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} text-slate-800/50 opacity-10 pointer-events-none rotate-12 transform scale-150`}>
                                    {getRoleIcon(job.role, job.company)}
                                </div>
                                
                                {/* Side Accent Line */}
                                <div className={`absolute top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${index % 2 === 0 ? 'left-0' : 'right-0 md:left-auto md:right-0 left-0'}`}></div>

                                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-1 pr-16">{job.role}</h3>
                                <h4 className="text-lg text-blue-400/90 font-medium mb-5">{job.company}</h4>
                                
                                <div className={`flex flex-wrap gap-3 text-xs text-slate-400 mb-6 font-mono ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                                    <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800 group-hover:border-slate-700/80 transition-colors">
                                        <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                                        <span>{job.period}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800 group-hover:border-slate-700/80 transition-colors">
                                        <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                                        <span>{job.location}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 relative z-10">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className={`text-slate-400 text-sm leading-relaxed flex items-start gap-3 ${index % 2 === 0 ? '' : 'md:flex-row-reverse md:text-right'}`}>
                                            <span className="mt-1.5 text-cyan-500 shrink-0">
                                                <ChevronRight className={`w-4 h-4 ${index % 2 !== 0 ? 'md:rotate-180' : ''}`} />
                                            </span>
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* End Point */}
            <div className="absolute left-[28px] md:left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;