export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  href?: string;
  metric: string;
  category: string;
};

export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "qa" | "tools";
};

export type TimelineEntry = {
  id: string;
  date: string;
  role: string;
  company?: string;
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
  title: "Software Engineer ",
  subtitle: " Building reliable Web And Mobile",
  description:
    "I build production-ready applications and I bring a testing-first mindset that helps teams ship faster with confidence.",
  highlights: [
    "Open to software Engineering roles",
    "Pune, Maharashtra, India",
    "React, React Native, Java, JavaScript, Python", 
  ],
  cta: {
    primary: { label: "View Projects", href: "#projects" },
    secondary: { label: "Contact Me", href: "#contact" },
  },
};

export const aboutData = {
  headline: "Developer mindset. QA discipline. Product focus.",
  paragraphs: [
    "I am a software engineer with hands-on experience shipping features across web, mobile, and TV applications in Agile environments.",
    "My work blends development and quality engineering: building responsive interfaces, integrating APIs, handling application state, and validating releases through structured manual and regression testing.",
    "What sets me apart is the mix of ownership, communication, and detail orientation I bring to a team. I care about user experience, code quality, and delivering software that works reliably in production.",
  ],
  stats: [
    { label: "Feature Modules Shipped", value: "8+" },
    { label: "Manual Test Cases", value: "100+" },
    { label: "Critical Bugs Caught", value: "20+" },
    { label: "Users Supported", value: "500+" },
  ],
};

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skillsData: Skill[] = [
  // Frontend
  { name: "React.js", icon: `${DEVICON}/react/react-original.svg`, category: "frontend" },
  { name: "React Native", icon: `${DEVICON}/react/react-original.svg`, category: "frontend" },
  { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg`, category: "frontend" },
  { name: "HTML5", icon: `${DEVICON}/html5/html5-original.svg`, category: "frontend" },
  { name: "CSS3", icon: `${DEVICON}/css3/css3-original.svg`, category: "frontend" },
  { name: "Bootstrap", icon: `${DEVICON}/bootstrap/bootstrap-original.svg`, category: "frontend" },
  { name: "Material UI", icon: `${DEVICON}/materialui/materialui-original.svg`, category: "frontend" },
  { name: "Android XML", icon: `${DEVICON}/android/android-original.svg`, category: "frontend" },
  // Backend
  { name: "Java", icon: `${DEVICON}/java/java-original.svg`, category: "backend" },
  { name: "Python", icon: `${DEVICON}/python/python-original.svg`, category: "backend" },
  { name: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg`, category: "backend" },
  { name: "Flask", icon: `${DEVICON}/flask/flask-original.svg`, category: "backend" },
  { name: "Spring Boot", icon: `${DEVICON}/spring/spring-original.svg`, category: "backend" },
  { name: "REST APIs", icon: "custom:api", category: "backend" },
  { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg`, category: "backend" },
  { name: "PostgreSQL", icon: `${DEVICON}/postgresql/postgresql-original.svg`, category: "backend" },
  { name: "Firebase Firestore", icon: `${DEVICON}/firebase/firebase-original.svg`, category: "backend" },
  { name: "Prisma ORM", icon: `${DEVICON}/prisma/prisma-original.svg`, category: "backend" },
  // QA
  { name: "Manual Testing", icon: "custom:manual-testing", category: "qa" },
  { name: "Regression Testing", icon: "custom:regression", category: "qa" },
  { name: "Test Case Design", icon: "custom:test-case", category: "qa" },
  { name: "Bug Reporting", icon: "custom:bug", category: "qa" },
  { name: "Agile / Scrum", icon: "custom:agile", category: "qa" },
  // Tools
  { name: "Git / GitHub", icon: `${DEVICON}/git/git-original.svg`, category: "tools" },
  { name: "Postman", icon: `${DEVICON}/postman/postman-original.svg`, category: "tools" },
  { name: "Android Studio", icon: `${DEVICON}/androidstudio/androidstudio-original.svg`, category: "tools" },
  { name: "VS Code", icon: `${DEVICON}/vscode/vscode-original.svg`, category: "tools" },
  { name: "Firebase Console", icon: `${DEVICON}/firebase/firebase-original.svg`, category: "tools" },
  { name: "Chrome DevTools", icon: `${DEVICON}/chrome/chrome-original.svg`, category: "tools" },
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Real-Time Chat Application",
    summary: "Android chat app with fast message delivery and secure authentication.",
    description:
      "Engineered a real-time messaging Android app for 100+ concurrent users using Java and Firebase Firestore. Added Firebase Authentication with email/password and Google Sign-In, and built reusable Material Design UI components to improve maintainability.",
    stack: ["Java", "Firebase Auth", "Firestore", "Android Studio", "XML"],
    metric: "100+ concurrent users",
    category: "Android",
  },
  {
    id: "proj-2",
    title: "Intelligent Voice Assistant",
    summary: "Python assistant that automates daily tasks through voice commands.",
    description:
      "Built a voice assistant using speech recognition and natural language processing, supporting 50+ commands with 85% accuracy. Integrated weather, news, and stock APIs and automated everyday tasks such as searches, email actions, and productivity workflows.",
    stack: ["Python", "SpeechRecognition", "pyttsx3", "REST APIs", "JSON"],
    metric: "85% command accuracy",
    category: "AI Automation",
  },
  {
    id: "proj-3",
    title: "Stock Market Application",
    summary: "Interactive market views with faster rendering and clearer insights.",
    description:
      "Contributed real-time data visualization components for a stock market application and improved page load time by 30% through optimized rendering logic. Focused on frontend clarity, responsiveness, and data-driven UI behavior.",
    stack: ["React", "JavaScript", "Charts", "REST APIs", "Performance Optimization"],
    metric: "30% faster page loads",
    category: "Web App",
  },
];

export const experienceData: TimelineEntry[] = [
  {
    id: "exp-1",
    date: "Recent Internship Experience",
    role: "Software Development Intern",
    company: "Web, Mobile, and TV Applications",
    description:
      "Worked across product development and quality assurance, building user-facing features, integrating APIs, and helping teams release stable software in Agile sprints.",
    highlights: [
      "Developed and deployed 8+ feature modules using Java, React, React Native, and JavaScript",
      "Supported products used by 500+ active users across multiple platforms",
      "Improved an AI-powered English learning platform with responsive UI work that increased user retention by 25%",
      "Implemented Prisma ORM CRUD operations for user data and application state management",
      "Integrated third-party REST APIs to improve data flow between frontend and backend services",
      "Executed 100+ manual test cases and documented 20+ critical bugs before production deployment",
      "Performed regression testing on 3 major releases and helped maintain zero critical production bugs",
    ],
  },
];

export const contactData = {
  headline: "Let's Build Something Great",
  description:
    "I am actively looking for opportunities where I can contribute as a software engineer, frontend engineer, or mobile engineer. If you are hiring, I would love to connect.",
  email: "Josenraju279@gmail.com",
  location: "Pune, Maharashtra, India",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/josenraju", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/josenraju279", icon: "github" },
  ] as Social[],
};
