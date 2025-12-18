import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_DATA, EXPERIENCE, SKILLS, PROJECTS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Christo Jimmy, a DevOps Engineer.
Your goal is to answer questions about Christo's professional background, skills, and experience in a professional, confident, and concise manner.

Here is the context about Christo:
Name: ${RESUME_DATA.name}
Role: ${RESUME_DATA.title}
Summary: ${RESUME_DATA.summary}
Location: ${RESUME_DATA.location}
Contact: ${RESUME_DATA.email}

Experience:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description.join('. ')}`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.category}: ${s.skills.join(', ')}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Education: BCA from Bangalore University (2019).
Certifications: DevOps, AWS Cloud Architect, CCNA 200-301.

If a user asks about something not in this context, politely say you don't have that information but suggest contacting Christo directly at ${RESUME_DATA.email}.
Keep answers brief and relevant to a recruiter or hiring manager.
`;

let ai: GoogleGenAI | null = null;

// Initialize client with safety check for Environment Variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("Gemini API Key is missing (checked import.meta.env.VITE_GEMINI_API_KEY).");
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    // Graceful fallback if API key is missing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("I'm currently in demo mode as the API key is not configured. However, Christo is an expert in AWS, Kubernetes, and Terraform. Please reach out to him via email!");
      }, 1000);
    });
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I apologize, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};
