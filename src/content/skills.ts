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
      "Vue.js",
      "React.js",
      "Angular",
      "Backbone.js",
      "Nuxt.js",
      "Next.js",
      "Tailwind CSS",
      "Sass",
      "Pug.js",
      "Pinia",
      "Redux",
      "CSS Modules",
      "Styled Components",
    ],
  },
  {
    title: "BACKEND",
    items: ["Java", "Node.js", "Nest.js", "Strapi", "Express.js"],
  },
  {
    title: "INFRA / DEVOPS",
    items: ["Azure DevOps", "Google Cloud Platform", "Amazon Web Services"],
  },
  {
    title: "TEST / QUALITY",
    items: ["jUnit", "Jest", "SonarQube"],
  },
  {
    title: "VERSION CONTROL",
    items: ["GitLab", "GitHub"],
  },
  {
    title: "DATABASES",
    items: ["SQL Server", "Oracle DB", "MongoDB", "PostgreSQL"],
  },
  {
    title: "OTHER",
    items: [
      "Apollo GraphQL",
      "Electron.js",
      "Websockets",
      "PWA",
      "GenAI",
      "ESLint",
      "Prettier",
      "Lefthook",
      "Biome",
    ],
  },
  {
    title: "DESIGN / METRICS",
    items: ["Figma", "Hotjar", "Google Analytics", "Statsig"],
  },
];

/**
 * Broad domain capabilities highlighted in the About page.
 */
export const industryKnowledge = [
  "System Architecture",
  "Technical and Team Leadership",
  "Software Documentation",
  "Code Review",
  "Pair Programming",
  "Mentorship and Team Development",
  "Agile Methodologies (Scrum, Kanban)",
  "Agile Project Management",
  "A/B Testing and Metrics Analysis",
  "Software, App and Website Development",
];
