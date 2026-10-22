# DevOps Portfolio

A scroll-driven 3D portfolio showcasing DevOps skills, projects, and experience. Built with React, TypeScript, Vite and three.js.

## Features

- 🧑‍💻 3D DevOps room: my character, animated as a cut-out puppet (breathing, head tilt toward your cursor, typing, blinking) (orange jacket, jeans, laptop in hand) in front of a desk with a live terminal, a wall dashboard and a blinking server rack
- 🔷 Hologram "about" scene that scans my character from hologram to full colour as you scroll (000 → 100), with HUD panels for bio, skills, impact and certs
- 🛠️ What I do: six service cards plus count-up numbers
- 📜 Career told as a release changelog
- ⭐ Open-source section featuring KubePulse, PG Analyzer, PG Shift and Mongo-Migrate, with real screenshots
- 🗂️ Work projects with terminal thumbnails
- 📦 Contact scene: I stand on a Docker-style container and hop when you reach for a contact button
- 🤖 "Mini Christo" chat bot that answers from resume data (no API key needed)
- ⚡ Phone-friendly: 3D is lazy-loaded, each scene only mounts near the viewport, pixel ratio is capped and drops on slow devices, reduced-motion respected, image fallback without WebGL

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **3D**: three.js, React Three Fiber, drei
- **Styling**: Plain CSS (`index.css`)
- **Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
├── components/          # React components
│   ├── Hero.tsx        # 3D room + name
│   ├── About.tsx       # Hologram scene + HUD panels
│   ├── Services.tsx    # What I do + numbers
│   ├── Experience.tsx  # Career changelog
│   ├── Projects.tsx    # Open source + work projects
│   ├── Contact.tsx     # Contact scene
│   ├── Lazy3D.tsx      # Mounts scenes near the viewport, WebGL fallback
│   └── MiniChristo.tsx # Resume chat bot
├── three/              # 3D scenes, props and the character cut-out (ChristoSprite)
├── hooks/              # useInView + confetti
├── public/christo.png  # Character cut-out (+ christo-face.png for the chat icon)
├── public/puppet/     # The cut-out split into head / torso / arms / legs / blink layers
├── public/projects/   # Screenshots from my GitHub repos
├── App.tsx             # Main application
├── constants.tsx       # All resume content lives here
├── index.css           # Styles and animations
└── vite.config.ts      # Vite configuration
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - feel free to use this project for your own portfolio.

## Contact

For any inquiries, please reach out through the contact form on the portfolio website.
