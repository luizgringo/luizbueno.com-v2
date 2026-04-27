/**
 * A single timeline entry used on the About page career section.
 */
export interface CareerEntry {
  /** Company or organization name. */
  company: string;
  /** Role title held in the period. */
  role: string;
  /** Human-readable time range. */
  period: string;
  /** Work location associated with the role. */
  location: string;
  /** Indicates if this role is currently active. */
  current?: boolean;
}

/**
 * Full career timeline ordered from newest to oldest.
 */
export const career: CareerEntry[] = [
  {
    company: "Cactus Gaming",
    role: "Senior Frontend Developer",
    period: "Mar 2025 — Present",
    location: "Nova Lima, MG",
    current: true,
  },
  {
    company: "ETUS Media Holding",
    role: "Tech Lead",
    period: "May 2024 — Dec 2024",
    location: "Belo Horizonte, MG",
  },
  {
    company: "ETUS Media Holding",
    role: "Senior Fullstack Developer",
    period: "Jan 2024 — May 2024",
    location: "Belo Horizonte, MG",
  },
  {
    company: "Globoplay @ Globo",
    role: "Senior Software Developer",
    period: "Feb 2022 — Oct 2023",
    location: "Rio de Janeiro, RJ",
  },
  {
    company: "Kyte Tecnologia",
    role: "Senior Frontend Developer",
    period: "Aug 2021 — Dec 2021",
    location: "Florianópolis, SC",
  },
  {
    company: "Localiza Rent A Car",
    role: "Senior Software Developer",
    period: "Mar 2021 — Aug 2021",
    location: "Belo Horizonte, MG",
  },
  {
    company: "Arbeit Software",
    role: "Senior Frontend Developer",
    period: "Feb 2020 — Feb 2021",
    location: "Belo Horizonte, MG / Buffalo, NY",
  },
  {
    company: "Hotmart",
    role: "Frontend Developer",
    period: "Mar 2018 — Jan 2020",
    location: "Belo Horizonte, MG",
  },
  {
    company: "Lett Insights",
    role: "Scrum Master / Full Stack Developer",
    period: "Jul 2016 — Jan 2018",
    location: "Belo Horizonte, MG",
  },
  {
    company: "Squadra Tecnologia",
    role: "Systems Analyst",
    period: "May 2015 — Mar 2016",
    location: "Belo Horizonte, MG",
  },
  {
    company: "Capgemini Brasil",
    role: "Systems Analyst",
    period: "Jul 2013 — May 2015",
    location: "Belo Horizonte, MG",
  },
  {
    company: "SLIIC",
    role: "Systems Analyst",
    period: "Oct 2010 — May 2013",
    location: "Contagem, MG",
  },
  {
    company: "GCI",
    role: "Java Web/JSP Developer Intern",
    period: "Jul 2009 — Jul 2010",
    location: "Contagem, MG",
  },
];
