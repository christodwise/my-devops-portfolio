import React from 'react';
import { Mail, Phone, Linkedin, Send, MessageSquare } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-10 animate-fade-in-up">
                <div>
                    <h3 className="text-3xl font-bold text-slate-100 mb-4">Let's work together</h3>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                        I'm currently looking for new opportunities in DevOps and Cloud Engineering. 
                        Whether you have a question or just want to say hi, my inbox is always open!
                    </p>
                </div>

                <div className="space-y-6">
                    <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group">
                        <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:text-cyan-400 text-slate-400 transition-colors shadow-lg">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">Email Me</p>
                            <span className="text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">{RESUME_DATA.email}</span>
                        </div>
                    </a>
                    
                    <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group">
                        <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:text-cyan-400 text-slate-400 transition-colors shadow-lg">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">Call Me</p>
                            <span className="text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">{RESUME_DATA.phone}</span>
                        </div>
                    </a>

                    <a href={`https://${RESUME_DATA.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group">
                        <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:text-cyan-400 text-slate-400 transition-colors shadow-lg">
                            <Linkedin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium mb-1">LinkedIn</p>
                            <span className="text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">Connect with me</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Form */}
            <form className="glass-card p-8 rounded-3xl border border-slate-800/60 shadow-2xl relative animate-fade-in-up" style={{ animationDelay: '0.2s' }} onSubmit={(e) => e.preventDefault()}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <MessageSquare className="w-24 h-24 text-cyan-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-8">Send a Message</h3>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Name</label>
                            <input type="text" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Email</label>
                            <input type="email" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Message</label>
                        <textarea rows={4} className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none" placeholder="How can I help you?"></textarea>
                    </div>
                    <button type="button" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5">
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;