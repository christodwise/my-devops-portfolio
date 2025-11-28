import { ReactNode } from 'react';

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: ReactNode;
}