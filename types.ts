export interface Experience {
  id: string;
  version: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  emoji: string;
  techStack: string[];
  description: string;
  subtitle: string;
  terminal: string[];
}

export interface SkillCategory {
  category: string;
  color: 'pink' | 'blue' | 'sun' | 'mint' | 'lilac';
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export interface OpenSourceProject {
  name: string;
  repo: string;
  tagline: string;
  description: string;
  tags: string[];
  image?: string;
  /** Shown instead of an image */
  terminal?: string[];
}

export interface Service {
  icon: 'pipeline' | 'k8s' | 'iac' | 'observe' | 'db' | 'security';
  title: string;
  text: string;
  tools: string[];
}
