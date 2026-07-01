/**
 * High-level classification used to filter portfolio projects.
 */
export type ProjectCategory = "frontend" | "fullstack" | "tech-lead" | "legacy";

/**
 * Normalized project entity rendered in the Portfolio page.
 */
export interface Project {
  /** Stable project identifier used in query params and keys. */
  id: string;
  /** Display name shown in list and details pane. */
  name: string;
  /** Company associated with the project. */
  company: string;
  /** Human-readable time range. */
  period: string;
  /** Category used by the portfolio filters. */
  category: ProjectCategory;
  /** Optional external URL for the project. */
  url?: string;
  /** Main technologies used during delivery. */
  stack: string[];
  /** Key accomplishments for quick scanning. */
  highlights: string[];
  /** One-paragraph project summary. */
  summary: string;
}

/**
 * Full list of portfolio projects.
 *
 * @remarks
 * The array is intentionally static and content-driven so pages can be fully
 * prerendered and metadata can be generated without runtime fetches.
 */
/**
 * Canonical list of projects shown in the portfolio explorer.
 */
export const projects: Project[] = [
  {
    id: "cactus-design-system-v2",
    name: "Cactus Design System v2.0.0",
    company: "Cactus Gaming",
    period: "Jun 2026 — Present",
    category: "frontend",
    stack: [
      "React",
      "TypeScript",
      "Vanilla Extract",
      "Radix UI",
      "Style Dictionary",
      "Vitest",
      "Storybook",
      "GitHub Actions",
    ],
    summary:
      "Led a full re-architecture of a production React component library (340 files, +26.9k lines) into a zero-runtime, accessibility-first Design System.",
    highlights: [
      "Migrated inline/JS-driven styles to zero-runtime CSS (Vanilla Extract), moving hover/focus logic from React state into native browser CSS across 31 components",
      "Built a single source of truth for design tokens (DTCG + Style Dictionary), auto-generating CSS variables and TS types — no more hardcoded hex codes",
      "Adopted Radix UI primitives for accessible, keyboard-navigable overlays (Modal, Dropdown, Tabs) with full ARIA support",
      "Standardized forwardRef + asChild for ref forwarding and polymorphic composition",
      "Reached ~97% test coverage (300+ tests, Vitest + RTL) with enforced CI thresholds",
      "Automated SemVer releases and changelog generation via CI + Gemini",
    ],
  },
  {
    id: "cactus-partners-dashboard",
    name: "Cactus Partners Dashboard",
    company: "Cactus Gaming",
    period: "Jul 2025 — Present",
    category: "frontend",
    url: "https://app.7k.partners/",
    stack: ["Nuxt 4", "Vue 3", "TypeScript", "Tailwind CSS", "Element Plus", "Pinia", "Chart.js"],
    summary:
      "Multi-tenant affiliate management dashboard for betting operations with multilingual support and customizable themes.",
    highlights: [
      "Built reporting modules, affiliate link management and digital wallet flows",
      "Implemented PT/EN/ES support with responsive layout",
      "Delivered analytics views using Chart.js and VeeValidate",
    ],
  },
  {
    id: "bet7k-platform",
    name: "Bet7K Platform",
    company: "Cactus Gaming",
    period: "Mar 2025 — Jul 2025",
    category: "frontend",
    url: "https://7k.bet.br",
    stack: ["Vue 3", "TypeScript", "Tailwind CSS"],
    summary:
      "Front-end development for Bet7K iGaming platform focused on scalable interfaces and consistent visual quality.",
    highlights: [
      "Built high-performance views with Vue 3 + TypeScript",
      "Used Tailwind CSS for rapid responsive UI implementation",
    ],
  },
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
    id: "luther-bootstrap",
    name: "Luther AI Bootstrap",
    company: "ETUS Media Holding",
    period: "Nov 2024 — Dec 2024",
    category: "tech-lead",
    url: "https://www.etus.digital/",
    stack: ["Nuxt 3", "Vue 3", "Tailwind CSS", "Strapi", "Biome", "Lefthook", "Claude", "Cursor"],
    summary:
      "Generative AI-powered bootstrap to accelerate CRUD-based administrative projects in the Brius/Etus ecosystem.",
    highlights: [
      "Integrated Claude Sonnet and Cursor-driven development workflow",
      "Reduced setup time for new projects with standardized architecture",
      "Applied Brius design system foundations across generated modules",
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
    id: "cosmik-component-library",
    name: "Cosmik Component Library",
    company: "Arbeit Software",
    period: "Dec 2020 — Feb 2021",
    category: "frontend",
    stack: ["React", "TypeScript", "CSS Modules", "Rollup", "Babel", "Storybook"],
    summary:
      "Built a reusable React component library (design system) with typed APIs and documented usage for team-wide adoption.",
    highlights: [
      "Created modular UI components with TypeScript and CSS Modules",
      "Configured Rollup + Babel pipeline for library distribution",
      "Documented components in Storybook for collaboration",
    ],
  },
  {
    id: "agent-application",
    name: "Agent Application",
    company: "Arbeit Software",
    period: "Apr 2020 — Nov 2020",
    category: "fullstack",
    url: "https://www.arbeitsoftware.com",
    stack: ["React", "TypeScript", "CSS Modules", "WebSockets"],
    summary:
      "Messaging and calling application for telemarketing support teams with real-time communication flows.",
    highlights: [
      "Implemented real-time communication using WebSockets",
      "Designed robust front-end with React + TypeScript",
      "Improved call handling efficiency for support operators",
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
    id: "hotmart-institutional-website",
    name: "Hotmart Institutional Website",
    company: "Hotmart",
    period: "Aug 2019 — Sep 2019",
    category: "frontend",
    url: "https://www.hotmart.com",
    stack: ["Nuxt.js", "Vue.js", "HTML", "CSS", "JavaScript"],
    summary:
      "Institutional website development focused on modern UI, SEO performance and brand positioning.",
    highlights: [
      "Delivered modern interface and optimized navigation experience",
      "Improved SEO and rendering performance with Nuxt.js",
    ],
  },
  {
    id: "scrum-implementation-lett",
    name: "Scrum Implementation",
    company: "Lett Insights",
    period: "Nov 2017 — Jan 2018",
    category: "tech-lead",
    url: "https://www.lett.digital",
    stack: ["Scrum", "Kanban", "Backlog Refinement", "Team Facilitation"],
    summary:
      "Led Scrum implementation and team enablement process, improving delivery rhythm and cross-role alignment.",
    highlights: [
      "Defined ceremonies and trained team on Scrum workflows",
      "Acted as facilitator and impediment remover for sprints",
      "Partnered with Product Owner to refine stories and tasks",
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
    id: "anp-sqd",
    name: "ANP SQD — Digital Qualification System",
    company: "Capgemini",
    period: "Jan 2015 — May 2015",
    category: "legacy",
    stack: ["Java", "JSF", "PrimeFaces", "Oracle", "JPA", "Hibernate"],
    summary:
      "Developed and analyzed use cases for ANP's digital qualification system to support regulatory compliance.",
    highlights: [
      "Improved operational efficiency and process data accuracy",
      "Supported regulatory workflows for national energy agency",
    ],
  },
  {
    id: "anp-siata",
    name: "ANP SIATA — Integrated Technical & Service System",
    company: "Capgemini",
    period: "Nov 2014 — Dec 2014",
    category: "legacy",
    stack: ["Java", "JSF", "PrimeFaces", "Oracle", "JPA", "Hibernate"],
    summary:
      "Contributed to SIATA maintenance and enhancements for ANP technical and support process integration.",
    highlights: [
      "Improved reliability and support workflow efficiency",
      "Maintained enterprise modules for regulated operations",
    ],
  },
  {
    id: "itcd-siare",
    name: "ITCD — SIARE Tax Module",
    company: "Capgemini",
    period: "Jul 2013 — Oct 2014",
    category: "legacy",
    url: "https://www.fazenda.mg.gov.br/empresas/impostos/itcd",
    stack: ["Java", "JSF", "PrimeFaces", "Oracle", "JPA", "Hibernate"],
    summary:
      "Developed and maintained the ITCD module in SIARE, supporting tax transparency and reliability for Minas Gerais.",
    highlights: [
      "Maintained mission-critical tax administration module",
      "Enhanced reliability and compliance-facing workflows",
    ],
  },
  {
    id: "ipva-mobile",
    name: "IPVA Mobile",
    company: "Capgemini",
    period: "Jun 2013 — Jul 2013",
    category: "legacy",
    url: "http://ipva1.fazenda.mg.gov.br/ipvaonline/Home.action",
    stack: ["jQuery Mobile", "Java", "EJB", "JAX-WS", "JBoss", "WebLogic"],
    summary:
      "Built mobile frontend and communication middleware for IPVA services at statewide scale in Minas Gerais.",
    highlights: [
      "Delivered responsive mobile UI with jQuery Mobile",
      "Implemented middleware for high-volume state service integration",
    ],
  },
  {
    id: "sliic-web",
    name: "SLIIC WEB",
    company: "SLIIC",
    period: "Oct 2010 — May 2013",
    category: "legacy",
    url: "https://www.sliic.com.br",
    stack: ["Java", "Next Framework", "WordPress", "PHP", "MySQL"],
    summary:
      "Web ecosystem for SLIIC operations, including ERP support and logistics monitoring workflows.",
    highlights: [
      "Supported logistics operations with tracking and management features",
      "Helped maintain enterprise workflows for multiple client contexts",
    ],
  },
  {
    id: "portal-seqtra",
    name: "Portal SEQTRA",
    company: "SLIIC",
    period: "Oct 2010 — May 2013",
    category: "legacy",
    url: "https://www.seqtra.com.br",
    stack: ["WordPress", "PHP", "MySQL", "Cloudflare", "SEO"],
    summary:
      "Designed and maintained SEQTRA portal with performance tuning, uptime monitoring and SEO improvements.",
    highlights: [
      "Configured Cloudflare CDN and performance optimizations",
      "Applied SEO improvements and monitored uptime with Pingdom",
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

/**
 * DOS-style labels displayed in the portfolio filter tabs.
 */
export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "ALL",
  frontend: "FRONTEND",
  fullstack: "FULLSTACK",
  "tech-lead": "TECH-LEAD",
  legacy: "LEGACY",
};
