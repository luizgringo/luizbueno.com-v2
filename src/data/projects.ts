export type ProjectCategory = "frontend" | "fullstack" | "tech-lead" | "legacy";

export interface Project {
  id: string;
  name: string;
  company: string;
  period: string;
  category: ProjectCategory;
  url?: string;
  stack: string[];
  highlights: string[];
  summary: string;
}

export const projects: Project[] = [
  {
    id: "cactus-igaming",
    name: "iGaming Platforms",
    company: "Cactus Gaming",
    period: "Mar 2025 — Present",
    category: "frontend",
    stack: ["Nuxt 4", "Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "Vite"],
    summary:
      "Active Front-end Chapter member maintaining and improving 33 iGaming platforms with strong focus on performance, code standardization and visual consistency.",
    highlights: [
      "Built iGaming applications with Nuxt 3, Vue 3, TypeScript and Tailwind CSS",
      "Designed UIs from Figma prototypes following usability best practices",
      "Authored documentation in Confluence and TSDoc",
      "Led recruitment processes and technical interviews",
    ],
  },
  {
    id: "brius-acquisition",
    name: "Brius For Acquisition",
    company: "ETUS Media Holding",
    period: "May 2024 — Dec 2024",
    category: "tech-lead",
    url: "https://www.brius.com.br",
    stack: ["Vue 3", "Vite", "Pinia", "Sass", "Node.js", "Strapi", "Claude AI", "Cursor"],
    summary:
      "Led architectural direction and development of the Brius For Acquisition application as Tech Lead, including a generative-AI bootstrap integrated with Claude Sonnet and Cursor.",
    highlights: [
      "Liaison between dev team and C-level executives",
      "Created roadmaps and technical specifications for BRIUS systems",
      "Mentored junior developers and facilitated IDP processes",
      "Servant Leader removing impediments and refining tasks",
    ],
  },
  {
    id: "brius-customer",
    name: "Brius For Customer",
    company: "ETUS Media Holding",
    period: "Jan 2024 — May 2024",
    category: "fullstack",
    url: "https://www.brius.com.br",
    stack: ["Vue 3", "Vite", "Sass", "Nest.js", "Google Cloud Platform", "Jest"],
    summary:
      "Built Brius For Customer end-to-end with Vue 3 + Vite on the frontend and Nest.js on the backend, deployed on GCP.",
    highlights: [
      "Comprehensive testing with Jest",
      "UX prototyping in Figma",
      "Version control with GitLab, task management with Monday",
    ],
  },
  {
    id: "globoplay-tv",
    name: "Globoplay for Smart TVs",
    company: "Globo Comunicação",
    period: "Feb 2022 — Oct 2023",
    category: "frontend",
    url: "https://globoplay.globo.com",
    stack: ["React", "TypeScript", "CSS Modules", "Apollo GraphQL", "Jest"],
    summary:
      "Developed the Globoplay application for Smart TVs and set-top boxes — a video-on-demand platform with nearly 40 million users.",
    highlights: [
      "Optimized interface usability for Smart TV environments",
      "Comprehensive Jest test coverage across devices",
      "Created technical specifications for scalable TV deployments",
      "Led recruitment and onboarding of new developers",
    ],
  },
  {
    id: "kyte-web",
    name: "Kyte Web",
    company: "Kyte Tecnologia",
    period: "Aug 2021 — Dec 2021",
    category: "frontend",
    url: "https://www.kyte.com.br",
    stack: ["React", "Redux", "Flux", "TypeScript", "Sass", "Azure DevOps"],
    summary:
      "Built the e-commerce management application used by approximately 42,330 small retailers, with focus on Kyte's Design System.",
    highlights: [
      "Designed and maintained components for Kyte's Design System",
      "Built robust web app using Flux architecture with React + Redux",
      "Streamlined releases via Azure DevOps",
    ],
  },
  {
    id: "zarp-localiza",
    name: "Zarp",
    company: "Localiza Rent A Car",
    period: "Mar 2021 — Aug 2021",
    category: "frontend",
    stack: ["React", "CSS Modules", "Azure DevOps", "Yandex Metrika", "Hotjar"],
    summary:
      "Built responsive interfaces for Zarp using React and CSS Modules, with deep UX analysis driven by Yandex Metrika and Hotjar.",
    highlights: [
      "SCRUM with Azure Boards for sprint delivery",
      "UX analysis and usability metrics evaluation",
      "Streamlined Azure DevOps deployment pipeline",
    ],
  },
  {
    id: "arbeit-desktop",
    name: "Arbeit Desktop & Web",
    company: "Arbeit Software",
    period: "Feb 2020 — Feb 2021",
    category: "frontend",
    stack: ["Electron", "Vue", "Qt + C++", "Angular 9", "RxJS", "React", "Storybook", "Rollup"],
    summary:
      "Multi-stack desktop and web work for a US/BR collaboration: refactored C++, built Electron desktop UIs and a scalable React Design System.",
    highlights: [
      "Refactored C++ with Clang Power Tools",
      "Electron + Vue desktop UIs integrated with Qt/C++",
      "Angular 9 + RxJS + Websockets app interfaces",
      "Design System in React + TypeScript + Storybook",
    ],
  },
  {
    id: "hotmart-platform",
    name: "Hotmart Platform",
    company: "Hotmart",
    period: "Mar 2018 — Jan 2020",
    category: "frontend",
    stack: ["Vue", "Nuxt", "Webpack", "PWA", "Service Workers", "Node.js", "Pug", "Hotjar"],
    summary:
      "Frontend engineering at Hotmart with PWA, A/B testing for conversion optimization and UX research using NPS, Hotjar and the HEART Framework.",
    highlights: [
      "Built PWAs with Service Workers, Vue, Nuxt and Webpack",
      "Email layouts with Pug.js template engine",
      "Automated platform testing with Selenium IDE and Katalon Studio",
      "Defined UX KPIs using the HEART Framework",
    ],
  },
  {
    id: "frozen-admin",
    name: "Frozen Admin",
    company: "Lett Insights",
    period: "Jul 2016 — Jan 2018",
    category: "fullstack",
    url: "https://frozen.lett.com.br",
    stack: ["Backbone.js", "Node.js", "Express", "StrongLoop", "MongoDB", "PostgreSQL", "AWS"],
    summary:
      "Architected and developed the Frozen system — Lett Insights' platform for operations, support and analytical reporting in e-commerce intelligence.",
    highlights: [
      "Scalable Backbone + Node + StrongLoop stack on AWS",
      "MongoDB and PostgreSQL administration",
      "Code quality leveraging SonarQube insights",
      "Defined and rolled out Scrum process for the team",
    ],
  },
  {
    id: "backoffice-empresa1",
    name: "Backoffice — Bilhetagem",
    company: "Squadra Tecnologia",
    period: "May 2015 — Mar 2016",
    category: "fullstack",
    stack: ["Java JEE7", "Spring", "Hibernate", "JPA", "AngularJS", "Bootstrap", "Oracle 11g"],
    summary:
      "Built the Backoffice for electronic ticket card recharge and issuance, supporting customer service and credit sales for the Belo Horizonte metro region.",
    highlights: [
      "Java JEE7 + Spring + Hibernate backend",
      "AngularJS + Bootstrap responsive frontend",
      "Oracle 11g performance tuning and integrity",
    ],
  },
  {
    id: "anp-mce",
    name: "ANP MCE — Foreign Trade Movement",
    company: "Capgemini",
    period: "Feb 2015 — May 2015",
    category: "legacy",
    stack: ["Java", "JSF", "PrimeFaces", "Hibernate", "JBoss", "WebLogic", "Oracle"],
    summary:
      "Analysis, development and maintenance of the MCE system for Brazil's National Agency of Petroleum, Natural Gas and Biofuels.",
    highlights: [
      "Java + JSF + PrimeFaces enterprise stack",
      "Middleware on JBoss 5.1 and Oracle WebLogic 12c",
      "JAXWS RI WebServices for system communication",
    ],
  },
  {
    id: "sliic-erp",
    name: "SLIIC ERP & Portal SEQTRA",
    company: "SLIIC",
    period: "Oct 2010 — May 2013",
    category: "legacy",
    url: "https://www.sliic.com.br",
    stack: ["Java", "Next Framework", "WordPress", "PHP", "MySQL", "SQL Server", "Cloudflare"],
    summary:
      "Built the SLIIC ERP for tracking, monitoring and managing logistics operations, plus the SEQTRA portal — supporting clients like Seqtra, Usiminas and Raízen.",
    highlights: [
      "Java + Next Framework with JUnit testing",
      "WordPress + PHP portals with MySQL backend",
      "Cloudflare CDN configuration and SEO optimization",
      "Pingdom uptime monitoring and tuning",
    ],
  },
];

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "ALL",
  frontend: "FRONTEND",
  fullstack: "FULLSTACK",
  "tech-lead": "TECH-LEAD",
  legacy: "LEGACY",
};
