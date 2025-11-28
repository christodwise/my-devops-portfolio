import React from 'react';
import { SKILLS } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const chartData = [
  { subject: 'Cloud (AWS)', A: 95, fullMark: 100 },
  { subject: 'CI/CD', A: 95, fullMark: 100 },
  { subject: 'K8s', A: 90, fullMark: 100 },
  { subject: 'IaC', A: 85, fullMark: 100 },
  { subject: 'Monitoring', A: 85, fullMark: 100 },
  { subject: 'Scripting', A: 80, fullMark: 100 },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Gradients */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-900/5 blur-3xl pointer-events-none"></div>
       
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Technical Arsenal</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Interactive Chart */}
          <div className="h-[450px] w-full glass-card rounded-3xl p-6 relative order-2 xl:order-1 group">
             <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <h3 className="text-center text-slate-400 font-medium mb-4">Competency Radar</h3>
             <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                  <PolarGrid gridType="polygon" stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Proficiency"
                    dataKey="A"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    fill="#06b6d4"
                    fillOpacity={0.2}
                    className="filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: '#334155', color: '#f1f5f9', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                </RadarChart>
             </ResponsiveContainer>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 xl:order-2">
            {SKILLS.map((skillGroup, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 pb-2 border-b border-slate-800 flex justify-between items-center">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-300 text-xs font-medium border border-slate-700/50 hover:bg-cyan-950/50 hover:text-cyan-200 hover:border-cyan-500/30 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;