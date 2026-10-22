import { Experience, OpenSourceProject, Project, Service, SkillCategory } from './types';

export const RESUME_DATA = {
  name: "Christo Jimmy",
  title: "DevOps Engineer",
  email: "christojimmmy@gmail.com",
  phone: "9061180837",
  location: "Bangalore, Karnataka",
  summary: "I build the pipelines, clusters and dashboards that keep apps shipping, and I stay up at 3am so you don't have to.",
  linkedin: "linkedin.com/in/christojimmy",
  github: "github.com/christodwise",
  education: "BCA, Bangalore University (2019)",
  courses: ["AWS Cloud Architect", "CCNA 200-301", "DevOps"],
  resume: `${import.meta.env.BASE_URL}Christo-Jimmy-DevOps-Resume.pdf`,
};

// Real numbers from the resume, shown as stickers around the avatar
export const STATS = [
  { value: "99.9%", label: "uptime kept", color: "mint" },
  { value: "-40%", label: "infra setup time", color: "sun" },
  { value: "-50%", label: "deploy time", color: "pink" },
] as const;

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    version: '3.0',
    company: "dWise Healthcare IT Solutions Pvt. Ltd",
    role: "DevOps Engineer",
    period: "06/2023 – Present",
    location: "Bangalore, India",
    description: [
      "Designed and implemented robust CI/CD pipelines using GitLab and Jenkins, enabling automated builds, testing, and deployments.",
      "Orchestrated microservices using Docker containers and managed them with Kubernetes clusters across AWS and VMs.",
      "Configured and deployed Spring Boot applications, Angular frontends, and PHP services for production environments.",
      "Optimized database performance and managed schema migrations with PostgreSQL, MongoDB, and Sqitch.",
      "Automated infrastructure provisioning and configuration using Terraform and Ansible, reducing setup time by 40%.",
      "Monitored system health using Grafana, SigNoz, and ELK Stack, ensuring 99.9% uptime."
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
      "Delivered advanced technical support for mobile gaming applications.",
      "Investigated and resolved complex issues related to game functionality, networking, and system crashes.",
      "Mentored junior team members, fostering knowledge sharing and improving team efficiency."
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
      "Provided technical assistance for digital banking services.",
      "Diagnosed and resolved complex technical issues in real time.",
      "Collaborated with cross-functional teams to streamline digital banking processes."
    ]
  },
  {
    id: '4',
    version: '0.1',
    company: "Bangalore University",
    role: "BCA graduate",
    period: "2019",
    location: "Bangalore, India",
    description: [
      "Completed a Bachelor of Computer Applications, then went straight into tech support for banking and gaming apps."
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Cloud & infra",
    color: "blue",
    skills: ["AWS", "EC2", "S3", "VPC", "RDS", "Lambda", "Terraform", "Ansible", "Linux"]
  },
  {
    category: "Containers",
    color: "pink",
    skills: ["Docker", "Kubernetes", "Microservices"]
  },
  {
    category: "CI/CD",
    color: "sun",
    skills: ["Jenkins", "GitLab CI", "Git", "Nexus"]
  },
  {
    category: "Observability",
    color: "mint",
    skills: ["Grafana", "Prometheus", "ELK Stack", "SigNoz", "Loki", "CloudWatch"]
  },
  {
    category: "Data & backend",
    color: "lilac",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Python", "SQL", "Spring Boot"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "AWS infrastructure automation",
    emoji: "☁️",
    techStack: ["Terraform", "AWS EC2", "AWS VPC", "CloudWatch"],
    description: "Designed and deployed a scalable AWS infrastructure with Terraform. Provisioned EC2 instances, security groups and load balancers, and automated monitoring and backups.",
    subtitle: "Terraform + AWS",
    terminal: ["$ terraform apply", "aws_vpc.main: Created", "aws_instance.web[2]: Created", "Apply complete!"]
  },
  {
    id: 'p2',
    title: "Microservices on Kubernetes",
    emoji: "🐳",
    techStack: ["Docker", "Kubernetes", "Prometheus"],
    description: "Containerized microservices with Docker and deployed them to Kubernetes clusters, with monitoring and alerting wired in to catch issues early.",
    subtitle: "Docker + Kubernetes",
    terminal: ["$ kubectl apply -f k8s/", "deployment.apps/api created", "$ kubectl get pods", "api-7f9c  1/1  Running"]
  },
  {
    id: 'p3',
    title: "CI/CD pipeline overhaul",
    emoji: "🚀",
    techStack: ["Jenkins", "GitLab", "Bash"],
    description: "Built end-to-end pipelines in Jenkins and GitLab that automate build, test and deploy, cutting deployment time by 50%.",
    subtitle: "Jenkins + GitLab CI",
    terminal: ["$ git push origin main", "✓ build   ✓ test", "✓ deploy to prod", "pipeline passed ✓"]
  },
  {
    id: 'p4',
    title: "On-prem to cloud migration",
    emoji: "🐘",
    techStack: ["PostgreSQL", "Sqitch", "Disaster recovery"],
    description: "Led the migration of on-premise applications and databases to the cloud, improving scalability and disaster recovery.",
    subtitle: "Apps + databases to the cloud",
    terminal: ["$ pg_dump onprem | psql cloud", "migration complete", "$ sqitch verify", "✓ all checks passed"]
  }
];


// Counted from the resume: in tech since 08/2019, DevOps since 06/2023
export const NUMBERS = [
  { value: 7, suffix: '+', label: 'years in tech' },
  { value: 3, suffix: '+', label: 'years in DevOps' },
  { value: 20, suffix: '+', label: 'public GitHub repos' },
  { value: 3, suffix: '', label: 'clouds in production' },
];

export const SERVICES: Service[] = [
  {
    icon: 'pipeline',
    title: 'CI/CD pipelines',
    text: 'GitLab CI and Jenkins pipelines that build, test and ship on every push. My last overhaul cut deploy time in half.',
    tools: ['GitLab CI', 'Jenkins', 'Nexus', 'Bash'],
  },
  {
    icon: 'k8s',
    title: 'Kubernetes & containers',
    text: 'Dockerized microservices running on Kubernetes across AWS and VMs, packaged with Helm and rolled out GitOps-style.',
    tools: ['Kubernetes', 'Docker', 'Helm', 'GitOps'],
  },
  {
    icon: 'iac',
    title: 'Infrastructure as code',
    text: 'AWS infrastructure in Terraform and server config in Ansible, so environments are repeatable. Setup time dropped 40%.',
    tools: ['Terraform', 'Ansible', 'AWS', 'Linux'],
  },
  {
    icon: 'observe',
    title: 'Observability',
    text: 'Dashboards, logs and alerts that catch problems before users do. That is how we kept uptime at 99.9%.',
    tools: ['Grafana', 'Prometheus', 'SigNoz', 'Loki', 'ELK'],
  },
  {
    icon: 'db',
    title: 'Databases',
    text: 'PostgreSQL replication and WAL-G point-in-time recovery, Sqitch and Flyway schema migrations, and on-prem to cloud moves.',
    tools: ['PostgreSQL', 'WAL-G', 'MongoDB', 'Sqitch', 'Flyway'],
  },
  {
    icon: 'tools',
    title: 'Internal tools',
    text: 'When the right tool does not exist, I build it: cluster dashboards, migration wizards and query analyzers.',
    tools: ['Python', 'TypeScript', 'Docker'],
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
