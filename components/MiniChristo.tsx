import React, { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { EXPERIENCE, OPEN_SOURCE, PROJECTS, RESUME_DATA, SKILLS } from '../constants';
import { ChatMessage } from '../types';

// Answers come straight from the resume data, so this works on a static host with no API key
const TOPICS: { keys: string[]; answer: () => string }[] = [
  {
    keys: ['hire', 'open', 'available', 'job', 'role', 'looking', 'opportunit'],
    answer: () => `Yes, I'm open to DevOps and cloud roles. Email ${RESUME_DATA.email} and I'll get back to you within a day.`,
  },
  {
    keys: ['contact', 'email', 'reach', 'phone', 'call', 'linkedin', 'mail'],
    answer: () => `Email ${RESUME_DATA.email}, call ${RESUME_DATA.phone}, or find me at ${RESUME_DATA.linkedin}.`,
  },
  {
    keys: ['stack', 'skill', 'tech', 'know', 'aws', 'kubernetes', 'k8s', 'terraform', 'docker'],
    answer: () => SKILLS.map((s) => `${s.category}: ${s.skills.join(', ')}`).join('\n'),
  },
  {
    keys: ['github', 'open source', 'side', 'kubepulse', 'repo', 'tool'],
    answer: () => 'On GitHub I build tools I wish existed:\n' + OPEN_SOURCE.map((p) => `• ${p.name}: ${p.tagline}`).join('\n') + '\nAll at github.com/christodwise',
  },
  {
    keys: ['project', 'built', 'ship', 'portfolio', 'work on'],
    answer: () => PROJECTS.map((p) => `${p.emoji} ${p.title}`).join('\n') + '\nPlus open-source tools like KubePulse. Scroll to Projects for details.',
  },
  {
    keys: ['experience', 'work', 'company', 'current', 'dwise', 'career', 'years'],
    answer: () =>
      `Right now I'm a ${EXPERIENCE[0].role} at ${EXPERIENCE[0].company} (since ${EXPERIENCE[0].period.split(' ')[0]}). Before that: ` +
      EXPERIENCE.slice(1).map((e) => `${e.role} at ${e.company}`).join(', ') + '.',
  },
  {
    keys: ['cert', 'course', 'education', 'degree', 'study', 'college', 'ccna', 'resume', 'cv'],
    answer: () => `${RESUME_DATA.education}. Courses: ${RESUME_DATA.courses.join(', ')}. Full resume: christodwise.github.io/my-devops-portfolio/Christo-Jimmy-DevOps-Resume.pdf`,
  },
  {
    keys: ['where', 'location', 'based', 'live', 'bangalore', 'remote'],
    answer: () => `I'm based in ${RESUME_DATA.location}.`,
  },
  {
    keys: ['hi', 'hello', 'hey', 'yo', 'sup'],
    answer: () => "hey! 👋 ask me about my stack, projects, experience, or whether I'm open to work.",
  },
];

const HEAD = `${import.meta.env.BASE_URL}christo-face.png`;

const SUGGESTIONS = ['Are you open to work?', "What's your stack?", 'What is KubePulse?', 'What have you shipped?', 'How do I reach you?'];

const reply = (q: string) => {
  const text = q.toLowerCase();
  const hit = TOPICS.find((t) => t.keys.some((k) => new RegExp(`\\b${k}`).test(text)));
  return hit ? hit.answer() : `I don't know that one yet. Ask the real me at ${RESUME_DATA.email}.`;
};

const MiniChristo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "yo, i'm mini christo 🤖 ask me anything about the real one." },
  ]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: reply(q) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with mini Christo">
          <header className="chat-head">
            <div className="chat-head-avatar"><img src={HEAD} alt="" /></div>
            <div>
              <strong>mini christo</strong>
              <span>answers from my resume</span>
            </div>
            <button type="button" className="icon-btn icon-btn-sm" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={`bubble bubble-${m.role}`}>{m.text}</p>
            ))}
            {typing && <p className="bubble bubble-bot typing" aria-label="typing"><span /><span /><span /></p>}
          </div>

          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me something" aria-label="Your question" />
            <button type="submit" className="icon-btn icon-btn-sm bg-pink" aria-label="Send" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Chat with mini Christo'}
      >
        <img src={HEAD} alt="" />
        {!open && <span className="fab-bubble">ask me!</span>}
      </button>
    </>
  );
};

export default MiniChristo;
