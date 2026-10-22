import { Experience, OpenSourceProject, Project, Service, SkillCategory } from './types';

// Everything below comes from public/Christo-Jimmy-DevOps-Resume.pdf
export const RESUME_DATA = {
  name: "Christo Jimmy",
  title: "DevOps Engineer",
  email: "christojimmmy@gmail.com",
  phone: "9061180837",
  location: "Bangalore, India",
  headline: "I run production Kubernetes, CI/CD and infrastructure as code for a healthcare SaaS platform across Azure, AWS and Alibaba Cloud.",
  summary: "DevOps engineer running production infrastructure for a healthcare SaaS platform across Azure, AWS and Alibaba Cloud, for hospital and clinic clients in the UAE and India. I own Kubernetes, CI/CD and infrastructure as code end to end, and build tools that automate routine operations.",
  linkedin: "linkedin.com/in/christojimmy",
  github: "github.com/christodwise",
  education: "BCA, Bangalore University (2019, 83%)",
  courses: ["AWS Cloud Architect", "CCNA 200-301", "DevOps"],
  languages: ["English", "Hindi", "Malayalam"],
  resume: `${import.meta.env.BASE_URL}Christo-Jimmy-DevOps-Resume.pdf`,
};

// Highlights shown in the hologram's "Impact" panel
export const STATS = [
  { value: "3 clouds", label: "Azure, AWS, Alibaba" },
  { value: "96 GB", label: "WAL backlog cleared" },
  { value: "18 / 27", label: "servers found without backups in an audit" },
] as const;

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    version: '3.0',
    company: "dWise Healthcare IT Solutions (Lifetrenz)",
    role: "DevOps Engineer",
    period: "06/2023 – Present",
    location: "Bangalore, India",
    description: [
      "Run production and UAT Kubernetes for multiple hospital and clinic clients on Azure AKS and AWS EKS, including EKS version upgrades and add-on compatibility fixes.",
      "Built end-to-end pipelines with GitLab CI, Jenkins, Helm and ArgoCD, and introduced tag-based releases so every QA-to-UAT promotion is immutable and traceable.",
      "Designed a hub-and-spoke Azure network with Application Gateway host-based routing and internal load balancing for a multi-clinic production go-live in Abu Dhabi.",
      "Recovered broken PostgreSQL streaming replication and cleared a 96 GB write-ahead-log build-up caused by an orphaned replication slot.",
      "Implemented WAL-G point-in-time recovery with documented runbooks on S3 and Azure Blob, extending to Alibaba OSS for production.",
      "Restored service in complex stateful-workload incidents: Kafka cluster ID conflicts, storage zone mismatches across Kafka, Redis, MongoDB and Loki, deprecated images, and AKS identity and quota limits.",
      "Led the migration of on-premise applications and databases to the cloud, improving scalability and disaster recovery.",
      "Automated provisioning with Terraform/Terragrunt and Ansible, and defined a region-based naming standard for new cloud regions.",
      "Shipped and supported Spring Boot, Angular, PHP and Python FastAPI services, resolving database migration and build-dependency conflicts that blocked releases.",
      "Operate monitoring on Prometheus, Grafana, Loki and SigNoz across client environments, with log-based alerting to reduce mean time to detect.",
      "Led ISMS/TPRM audit evidence for a client production estate, finding 18 of 27 servers without backup policies plus encryption gaps, and wrote the restoration runbooks; scoped VAPT for the SOC audit.",
      "Migrated the office firewall to OPNsense with dual WAN and segmented networks, and built an IKEv2 site-to-site VPN to a client's Azure FortiGate.",
      "Connected healthcare integration services to the Malaffi HIE over secure VPN, and set up AWS SES email delivery and SMS-gateway routing for client apps.",
      "Wrote a database risk assessment for management, using real incidents to make the case for moving PostgreSQL off Kubernetes.",
    ]
  },
  {
    id: '2',
    version: '2.0',
    company: "24-7 Intouch",
    role: "Senior Technical Support",
    period: "02/2021 – 12/2022",
    location: "Bangalore, India",
    description: [
      "Resolved complex networking, performance and crash issues for mobile gaming apps, and turned support trends into fixes with development teams.",
      "Mentored junior team members to improve resolution quality and team efficiency.",
    ]
  },
  {
    id: '3',
    version: '1.0',
    company: "24/7.ai",
    role: "Digital Interaction Advisor",
    period: "08/2019 – 02/2021",
    location: "Bangalore, India",
    description: [
      "Resolved real-time technical issues for digital banking customers and contributed to troubleshooting knowledge-base articles.",
    ]
  },
  {
    id: '4',
    version: '0.1',
    company: "SSR College of Science and Management Studies, Bangalore University",
    role: "Bachelor of Computer Applications",
    period: "2019",
    location: "Bangalore, India",
    description: [
      "Graduated with 83%, plus courses in AWS Cloud Architect, CCNA 200-301 and DevOps.",
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  { category: "Cloud", color: "blue", skills: ["Azure AKS", "AWS EKS", "Alibaba Cloud", "GCP"] },
  { category: "Containers & GitOps", color: "pink", skills: ["Kubernetes", "Docker", "Helm", "ArgoCD"] },
  { category: "CI/CD", color: "sun", skills: ["GitLab CI", "Jenkins", "Nexus", "tag-based releases"] },
  { category: "IaC", color: "mint", skills: ["Terraform", "Terragrunt", "Ansible"] },
  { category: "Observability", color: "lilac", skills: ["Prometheus", "Grafana", "Loki", "SigNoz"] },
  { category: "Data", color: "blue", skills: ["PostgreSQL", "WAL-G", "MongoDB", "Kafka"] },
  { category: "Network & security", color: "pink", skills: ["IPsec VPN", "OPNsense", "FortiGate", "VAPT"] },
  { category: "Code", color: "sun", skills: ["Bash", "Python", "FastAPI", "SQL"] },
];

// Projects & internal tools from the resume
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "AI-assisted observability",
    emoji: "🤖",
    techStack: ["Python", "FastMCP", "SigNoz"],
    description: "An MCP server that lets AI assistants query logs, traces and metrics, plus an error-analysis bot and a natural-language chatbot for service-health questions.",
    subtitle: "MCP server on SigNoz",
    terminal: ["$ mcp call signoz.query_logs", "service: api  level: error", "→ related traces found", "summary ready"]
  },
  {
    id: 'p2',
    title: "Launchpad",
    emoji: "🚀",
    techStack: ["Web UI", "Bash"],
    description: "A self-service web app for running grouped server scripts, such as deployments, straight from the browser.",
    subtitle: "Server scripts in one click",
    terminal: ["$ launchpad run deploy-uat", "▶ group: uat-servers", "✓ deploy.sh finished", "logs streamed to browser"]
  },
  {
    id: 'p3',
    title: "Canary build dashboard",
    emoji: "📱",
    techStack: ["MERN", "Flutter", "Linux"],
    description: "One-click canary APK builds for 7 Flutter mobile apps on a headless build server, with artifact download.",
    subtitle: "7 Flutter apps, one button",
    terminal: ["$ build canary --all", "✓ 7 Flutter APKs built", "artifacts ready", "download ↓"]
  },
  {
    id: 'p4',
    title: "AI service hosting",
    emoji: "☁️",
    techStack: ["Docker", "nginx", "Azure", "AWS", "Terraform"],
    description: "Containerized a FastAPI service with HTTP and WebSocket traffic behind a single ingress, evaluated Azure Container Apps, and sized and costed an AWS EC2 deployment.",
    subtitle: "FastAPI behind one ingress",
    terminal: ["$ docker compose up -d", "nginx ingress ready", "HTTP ✓  WebSocket ✓", "FastAPI service live"]
  }
];

// In tech since 08/2019, DevOps since 06/2023
export const NUMBERS = [
  { value: 7, suffix: '+', label: 'years in tech' },
  { value: 3, suffix: '+', label: 'years in DevOps' },
  { value: 3, suffix: '', label: 'clouds in production' },
  { value: 15, suffix: '+', label: 'open-source repos' },
];

export const SERVICES: Service[] = [
  {
    icon: 'k8s',
    title: 'Kubernetes on multi-cloud',
    text: 'Production and UAT clusters on Azure AKS and AWS EKS for hospital and clinic clients, including version upgrades and add-on fixes.',
    tools: ['AKS', 'EKS', 'Helm', 'ingress-nginx'],
  },
  {
    icon: 'pipeline',
    title: 'CI/CD & GitOps',
    text: 'GitLab CI, Jenkins and ArgoCD pipelines with tag-based releases, so every QA-to-UAT promotion is immutable and traceable.',
    tools: ['GitLab CI', 'Jenkins', 'ArgoCD', 'Nexus'],
  },
  {
    icon: 'iac',
    title: 'Infrastructure as code',
    text: 'Terraform, Terragrunt and Ansible for repeatable environments, plus a region-based naming standard for new cloud regions.',
    tools: ['Terraform', 'Terragrunt', 'Ansible'],
  },
  {
    icon: 'observe',
    title: 'Observability',
    text: 'Prometheus, Grafana, Loki and SigNoz across client environments, with log-based alerting and AI-assisted troubleshooting over MCP.',
    tools: ['Prometheus', 'Grafana', 'Loki', 'SigNoz'],
  },
  {
    icon: 'db',
    title: 'Data reliability',
    text: 'PostgreSQL replication repairs, WAL-G point-in-time recovery on S3, Azure Blob and Alibaba OSS, and a runbook for every restore.',
    tools: ['PostgreSQL', 'WAL-G', 'HAProxy', 'Kafka', 'Redis'],
  },
  {
    icon: 'security',
    title: 'Networking & compliance',
    text: 'Hub-and-spoke Azure networks, IPsec site-to-site VPNs, OPNsense firewalls, ISMS/TPRM audit evidence and VAPT scoping.',
    tools: ['Azure VNet', 'IPsec', 'OPNsense', 'FortiGate'],
  },
];

export const OPEN_SOURCE: OpenSourceProject[] = [
  {
    name: 'KubePulse',
    repo: 'https://github.com/christodwise/KubePulse',
    tagline: 'Know before it breaks.',
    description: 'A calm, read-only Kubernetes dashboard with a live cluster map, a NOC wallboard, Mattermost alerts and AI root-cause diagnosis. One Python file, about 15 MiB of memory, and it runs on EKS, AKS, GKE or plain Kubernetes.',
    tags: ['Python', 'Kubernetes', 'Docker', 'AI'],
    image: 'projects/kubepulse.jpg',
  },
  {
    name: 'PG Analyzer',
    repo: 'https://github.com/christodwise/PG-Slow-Query-Analyzer',
    tagline: 'Find the slow queries.',
    description: 'A real-time dashboard for PostgreSQL slow queries built on pg_stat_statements, with saved connections, auto-refresh and AI optimization hints.',
    tags: ['TypeScript', 'PostgreSQL'],
    image: 'projects/pgslow.jpg',
  },
  {
    name: 'PG Shift',
    repo: 'https://github.com/christodwise/PG-Shift',
    tagline: 'Drop. Dump. Restore. Done.',
    description: 'A guided PostgreSQL migration tool with preflight checks, version validation, live table stats and explicit confirmations before anything destructive.',
    tags: ['Python', 'Streamlit', 'Docker'],
    image: 'projects/pgshift.jpg',
  },
  {
    name: 'Mongo-Migrate',
    repo: 'https://github.com/christodwise/Mongo-Migrate',
    tagline: 'MongoDB moves in one click.',
    description: 'Moves MongoDB data between instances with mongodump and mongorestore, live Socket.io logs and a two-step safety check before it overwrites anything.',
    tags: ['Python', 'Flask', 'MongoDB'],
    terminal: ['$ mongo-migrate --env prod', 'source → target: connected', 'mongodump ✓  mongorestore ✓', 'migration complete'],
  },
];
