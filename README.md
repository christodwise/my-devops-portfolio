# DevOps Portfolio

A modern, interactive portfolio showcasing DevOps skills, projects, and experience. Built with React, TypeScript, and Vite, featuring an AI-powered chat assistant using Google's Gemini API.

## Features

- 🎨 Modern, responsive design
- 💼 Portfolio sections: Hero, Experience, Projects, Skills, Contact
- 🤖 AI Chat Assistant powered by Google Gemini
- 📊 Interactive charts and visualizations
- ⚡ Fast performance with Vite

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **AI Integration**: Google Generative AI (Gemini)
- **UI Components**: Lucide React icons
- **Charts**: Recharts

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/christodwise/my-devops-portfolio.git
   cd my-devops-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
├── components/          # React components
│   ├── Hero.tsx        # Landing section
│   ├── Experience.tsx  # Work experience
│   ├── Projects.tsx    # Portfolio projects
│   ├── Skills.tsx      # Technical skills
│   ├── Contact.tsx     # Contact form
│   └── GeminiChat.tsx  # AI chat assistant
├── services/           # API services
│   └── geminiService.ts
├── App.tsx             # Main application
├── constants.tsx       # App constants
├── types.ts            # TypeScript types
└── vite.config.ts      # Vite configuration
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - feel free to use this project for your own portfolio.

## Contact

For any inquiries, please reach out through the contact form on the portfolio website.
