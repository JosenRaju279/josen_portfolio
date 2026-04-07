export type SectionId = "projects" | "skills" | "about" | "contact";

export type ThemeMode = "dark" | "light";

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  href: string;
  type: string;
  image: string;
};

export type Skill = {
  label: string;
  value: number;
};

export const sectionOrder: SectionId[] = [
  "projects",
  "skills",
  "about",
  "contact",
];

export const sectionCopy: Record<
  SectionId,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  projects: {
    eyebrow: "Selected Work",
    title: "Projects",
    description:
      "Featured builds shaped around storytelling, motion, and frontend craft.",
  },
  skills: {
    eyebrow: "Core Stack",
    title: "Skills",
    description:
      "A blend of creative interface thinking and practical engineering depth.",
  },
  about: {
    eyebrow: "Profile",
    title: "About Me",
    description:
      "The thinking, design taste, and working style behind the visuals.",
  },
  contact: {
    eyebrow: "Start a Project",
    title: "Contact",
    description:
      "A direct line for new products, redesigns, and collaboration briefs.",
  },
};

export const portfolioData = {
  hero: {
    name: "Josen Raju",
    role: "Full-Stack Developer",
    blurb:
      "I design and build polished web experiences with strong visual direction, thoughtful motion, and production-ready frontend systems.",
    status: "Available for freelance and product collaborations",
    location: "Based in India, building for global teams",
    ctaLabel: "Open contact panel",
  },
  projects: [
    {
      type: "Portfolio Experience",
      title: "Immersive Portfolio Room",
      summary:
        "A cinematic 3D portfolio built around room-scale storytelling, guided camera movement, and tactile interface details.",
      stack: ["Next.js", "React Three Fiber", "Drei", "Framer Motion"],
      href: "#",
      image: "/sample-project-preview.svg",
    },
    {
      type: "Showcase Platform",
      title: "Interior Showcase Experience",
      summary:
        "A stylized product showcase where editorial layout, spatial composition, and interaction design work as one system.",
      stack: ["Three.js", "TypeScript", "Tailwind CSS"],
      href: "#",
      image: "/sample-project-preview.svg",
    },
    {
      type: "Design Engineering",
      title: "Creative Frontend Systems",
      summary:
        "Interface work that blends visual craft, animation direction, and maintainable frontend architecture.",
      stack: ["React", "Motion", "UI Systems"],
      href: "#",
      image: "/sample-project-preview.svg",
    },
  ] satisfies Project[],
  skills: [
    { label: "Creative Frontend Development", value: 95 },
    { label: "Interface Systems and UI Architecture", value: 91 },
    { label: "Motion Design for the Web", value: 92 },
    { label: "Three.js / React Three Fiber", value: 88 },
    { label: "Performance and Product Polish", value: 89 },
  ] satisfies Skill[],
  about: [
    "I care about interfaces that feel intentional from the first second: clean hierarchy, strong motion language, and details that reward attention.",
    "My work sits between product engineering and visual storytelling, which means I think about performance, maintainability, and emotional impact at the same time.",
    "Whether the brief is a portfolio, marketing site, or product surface, I aim for experiences that feel sharp, modern, and genuinely memorable.",
  ],
  stats: [
    { label: "Specialty", value: "Interactive portfolio and marketing UI" },
    { label: "Focus", value: "Design-led frontend systems" },
    { label: "Workflow", value: "Concept, motion, build, polish" },
  ],
  contact: {
    email: "hello@bilalkhan.dev",
    availability:
      "Open to freelance work, product teams, and creative collaborations.",
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "Instagram", href: "https://instagram.com/" },
    ],
  },
};
