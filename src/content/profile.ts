/**
 * External profiles and social links displayed in the portfolio.
 */
export type ProfileLinks = {
  website: string;
  linkedin: string;
  github: string;
  scrum: string;
};

/**
 * Spoken language and proficiency indicator.
 */
export type ProfileLanguage = {
  name: string;
  level: string;
  bars: number;
};

/**
 * Education record shown in the About section.
 */
export type ProfileEducation = {
  degree: string;
  school: string;
  year: string;
};

/**
 * Certification record shown in the About section.
 */
export type ProfileCertification = {
  name: string;
  issuer: string;
  year: string;
  url: string;
};

/**
 * Canonical profile content consumed by all pages and SEO helpers.
 */
export type Profile = {
  name: string;
  shortName: string;
  title: string;
  location: string;
  yearsExperience: string;
  emailUser: string;
  emailDomain: string;
  phoneDisplay: string;
  links: ProfileLinks;
  bio: string[];
  languages: ProfileLanguage[];
  education: ProfileEducation[];
  certifications: ProfileCertification[];
};

/**
 * Primary profile payload used by the portfolio.
 *
 * @remarks
 * The email is intentionally split into `emailUser` and `emailDomain` to make
 * naive scraping a little harder in the rendered UI.
 */
/**
 * Public profile payload rendered across the application.
 */
export const profile: Profile = {
  name: "Luiz Henrique Bueno",
  shortName: "Luiz Bueno",
  title: "Senior Frontend Developer · Tech Lead",
  location: "Belo Horizonte, MG — Brazil",
  yearsExperience: "17+",
  emailUser: "contact",
  emailDomain: "luizbueno.com",
  phoneDisplay: "+55 31 99555-7911",
  links: {
    website: "https://www.luizbueno.com",
    linkedin: "https://www.linkedin.com/in/luizhenriquebueno/",
    github: "https://github.com/luizgringo",
    scrum: "https://www.scrum.org/user/293231",
  },
  bio: [
    "I began my professional journey in I.T. in 2007, and since 2009 I have specialized in developing both frontend and backend systems for web-based applications. Over the years I've built a strong foundation in designing and delivering robust, user-focused solutions.",
    "I hold a Bachelor's Degree in Information Systems and a Postgraduate Certificate in Web Development Systems from PUC-Minas. My passion for improving user experience inspired me to pursue an additional Postgraduate Certificate in UX Design and Agile Frameworks from PUC-Minas, which equipped me with advanced knowledge in UX principles and agile methodologies.",
    "My professional experience includes leading development teams and fostering growth in others. As a Scrum Master I earned the PSM I certification from Scrum.org, and as a Tech Lead I mentored developers, defined technical strategies and drove collaboration — work that culminated in the IFTL Tech Lead training program.",
    "I take pride in building applications that are not only functional but also friendly, effective and meaningful — whether solving complex technical challenges or leading a team to success.",
  ],
  languages: [
    { name: "Portuguese", level: "Native", bars: 5 },
    { name: "English", level: "C1 Advanced", bars: 5 },
    { name: "Spanish", level: "A1 Basic", bars: 1 },
  ],
  education: [
    {
      degree: "Postgraduate — Specialization in UX Design and Agility",
      school: "PUC Minas",
      year: "2022",
    },
    {
      degree: "Postgraduate — Specialization in Web Application Development",
      school: "PUC Minas",
      year: "2014",
    },
    {
      degree: "Bachelor's Degree in Information Systems",
      school: "PUC Minas",
      year: "2012",
    },
  ],
  certifications: [
    {
      name: "Tech Lead Program",
      issuer: "IFTL",
      year: "2024",
      url: "https://bit.ly/luizbueno-iftl-techlead",
    },
    {
      name: "EF SET Certificate — C2 Proficient",
      issuer: "EF SET",
      year: "2022",
      url: "https://cert.efset.org/SLdq8B",
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      year: "2019",
      url: "https://www.credly.com/badges/6e801485-b19d-47e9-adaa-89caa7b25571",
    },
  ],
};
