export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
  category: string;
};

export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops" | "tools";
};

export type TimelineEntry = {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
};

export type NavItem = {
  label: string;
  href: string;
};

export type Social = {
  label: string;
  href: string;
  icon: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroData = {
  greeting: "Hello, I'm",
  name: "Josen Raju",
  title: "Software Engineer",
  subtitle: "Building Scalable Systems & Crafting Digital Experiences",
  description:
    "I design and build high-performance applications that solve real-world problems. Passionate about clean architecture, intuitive interfaces, and pushing the boundaries of what's possible on the web.",
  cta: {
    primary: { label: "View My Work", href: "#projects" },
    secondary: { label: "Contact Me", href: "#contact" },
  },
};

export const aboutData = {
  headline: "About Me",
  paragraphs: [
    "I'm a software engineer with a passion for building products that make a difference. My journey in tech started with curiosity and evolved into a deep commitment to crafting software that's both powerful and elegant.",
    "I specialize in full-stack development, with expertise spanning modern frontend frameworks, robust backend architectures, and cloud-native infrastructure. I believe great software is born at the intersection of technical excellence and thoughtful design.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and continuously pushing the boundaries of my craft.",
  ],
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies", value: "20+" },
    { label: "Lines of Code", value: "100K+" },
  ],
};

export const skillsData: Skill[] = [
  // Frontend
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "🔷", category: "frontend" },
  { name: "JavaScript", icon: "🟨", category: "frontend" },
  { name: "HTML/CSS", icon: "🎨", category: "frontend" },
  { name: "Tailwind CSS", icon: "💨", category: "frontend" },
  // Backend
  { name: "Node.js", icon: "🟩", category: "backend" },
  { name: "Python", icon: "🐍", category: "backend" },
  { name: "PostgreSQL", icon: "🐘", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "backend" },
  { name: "REST APIs", icon: "🔌", category: "backend" },
  { name: "GraphQL", icon: "◈", category: "backend" },
  // DevOps
  { name: "Docker", icon: "🐳", category: "devops" },
  { name: "AWS", icon: "☁️", category: "devops" },
  { name: "CI/CD", icon: "🔄", category: "devops" },
  { name: "Linux", icon: "🐧", category: "devops" },
  // Tools
  { name: "Git", icon: "🔀", category: "tools" },
  { name: "VS Code", icon: "💻", category: "tools" },
  { name: "Figma", icon: "🎯", category: "tools" },
  { name: "Jira", icon: "📋", category: "tools" },
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Scalable Trading Platform",
    summary: "High-frequency trading system with real-time data processing",
    description:
      "Engineered a high-performance trading platform processing thousands of transactions per second with sub-millisecond latency. Built with microservices architecture and real-time WebSocket feeds.",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "WebSocket"],
    href: "#",
    image: "/project-1.png",
    category: "Full Stack",
  },
  {
    id: "proj-2",
    title: "Cloud Infrastructure Dashboard",
    summary: "Enterprise cloud resource management and monitoring",
    description:
      "Built a comprehensive cloud infrastructure management dashboard enabling teams to monitor, scale, and optimize their cloud resources in real-time across multiple providers.",
    stack: ["Next.js", "TypeScript", "AWS", "Docker", "Terraform"],
    href: "#",
    image: "/project-2.png",
    category: "DevOps",
  },
  {
    id: "proj-3",
    title: "AI-Powered Analytics Engine",
    summary: "Machine learning pipeline for predictive business intelligence",
    description:
      "Developed an intelligent analytics platform that leverages machine learning to provide predictive insights, anomaly detection, and automated reporting for enterprise clients.",
    stack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    href: "#",
    image: "/project-3.png",
    category: "AI/ML",
  },
  {
    id: "proj-4",
    title: "Social Commerce App",
    summary: "Mobile-first marketplace with social features",
    description:
      "Created a social commerce platform combining e-commerce with social networking features, enabling users to discover, share, and purchase products within a community-driven experience.",
    stack: ["React Native", "Node.js", "MongoDB", "Stripe", "Firebase"],
    href: "#",
    image: "/project-4.png",
    category: "Mobile",
  },
  {
    id: "proj-5",
    title: "Real-Time Analytics Dashboard",
    summary: "Live data visualization and business intelligence platform",
    description:
      "Designed and built a real-time analytics dashboard processing millions of events per day, featuring interactive visualizations, custom alerts, and collaborative reporting tools.",
    stack: ["React", "D3.js", "Node.js", "ClickHouse", "Kafka"],
    href: "#",
    image: "/project-5.png",
    category: "Data",
  },
];

export const experienceData: TimelineEntry[] = [
  {
    id: "exp-1",
    date: "2024 — Present",
    role: "Software Engineer",
    company: "Tech Company",
    description:
      "Leading development of scalable web applications and microservices. Driving architectural decisions and mentoring junior developers.",
    highlights: [
      "Architected microservices serving 1M+ daily requests",
      "Reduced deployment time by 60% through CI/CD optimization",
      "Led migration to cloud-native infrastructure",
    ],
  },
  {
    id: "exp-2",
    date: "2023 — 2024",
    role: "Full Stack Developer",
    company: "Startup Inc.",
    description:
      "Built and shipped multiple product features end-to-end. Collaborated closely with design and product teams to deliver exceptional user experiences.",
    highlights: [
      "Shipped 5 major product features from concept to launch",
      "Improved application performance by 40%",
      "Implemented real-time collaboration features",
    ],
  },
  {
    id: "exp-3",
    date: "2022 — 2023",
    role: "Junior Developer",
    company: "Digital Agency",
    description:
      "Developed responsive web applications and contributed to internal tooling. Gained deep expertise in modern JavaScript frameworks and agile methodologies.",
    highlights: [
      "Delivered 10+ client projects on time",
      "Built reusable component library used across projects",
      "Contributed to open-source tools",
    ],
  },
];

export const contactData = {
  headline: "Let's Work Together",
  description:
    "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.",
  email: "josenraju@email.com",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
    { label: "X", href: "https://x.com/", icon: "x" },
  ] as Social[],
};
