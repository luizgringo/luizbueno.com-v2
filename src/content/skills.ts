/**
 * Skill group rendered as a titled panel in the About page.
 */
export type SkillGroup = {
  /** Group title. */
  title: string;
  /** Group items displayed as bullet-like entries. */
  items: string[];
};

/**
 * Grouped list of tools and technologies shown in the About page.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "FRONTEND",
    items: [
      "TypeScript",
      "Vue.js",
      "React.js",
      "Angular",
      "AngularJS",
      "Backbone.js",
      "Nuxt.js",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Vanilla Extract",
      "Radix UI",
      "Element Plus",
      "Sass",
      "Pug.js",
      "Pinia",
      "Redux",
      "Flux",
      "RxJS",
      "CSS Modules",
      "Styled Components",
      "Bootstrap",
      "jQuery Mobile",
      "Webpack",
      "Rollup",
      "Babel",
      "Storybook",
      "Chart.js",
      "VeeValidate",
    ],
  },
  {
    title: "BACKEND",
    items: [
      "Java",
      "Spring",
      "Hibernate",
      "JPA",
      "EJB",
      "JAX-WS",
      "JSF",
      "PrimeFaces",
      "Node.js",
      "Nest.js",
      "Express.js",
      "StrongLoop",
      "Strapi",
      "PHP",
      "WordPress",
    ],
  },
  {
    title: "INFRA / DEVOPS",
    items: [
      "Azure DevOps",
      "Google Cloud Platform",
      "Amazon Web Services",
      "GitHub Actions",
      "Cloudflare",
      "JBoss",
      "WebLogic",
    ],
  },
  {
    title: "TEST / QUALITY",
    items: ["jUnit", "Jest", "Vitest", "SonarQube", "Selenium", "Katalon Studio"],
  },
  {
    title: "VERSION CONTROL",
    items: ["GitLab", "GitHub"],
  },
  {
    title: "DATABASES",
    items: ["SQL Server", "Oracle DB", "MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "OTHER",
    items: [
      "Apollo GraphQL",
      "Electron.js",
      "Websockets",
      "PWA",
      "GenAI",
      "Style Dictionary",
      "ESLint",
      "Prettier",
      "Lefthook",
      "Biome",
      "TSDoc",
      "Jira",
      "Confluence",
    ],
  },
  {
    title: "DESIGN / METRICS",
    items: ["Figma", "Hotjar", "Yandex Metrika", "Google Analytics", "Statsig"],
  },
];

/**
 * Broad domain capabilities highlighted in the About page.
 */
export const industryKnowledge = [
  "System Architecture",
  "Design Systems",
  "Accessibility (WCAG / ARIA)",
  "Technical and Team Leadership",
  "Software Documentation",
  "Code Review",
  "Pair Programming",
  "Mentorship and Team Development",
  "Agile Methodologies (Scrum, Kanban)",
  "Agile Project Management",
  "CI/CD & Release Automation",
  "A/B Testing and Metrics Analysis",
  "UX Research & Usability Testing",
  "iGaming & Betting Platforms",
  "Smart TV Development",
  "Software, App and Website Development",
];
