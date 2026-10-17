// Interface text for the English site. src/content/fa/ui.ts mirrors this shape.

export const ui = {
  meta: {
    title: "Ilia Shakeri — DevOps Engineer & Full-Stack Developer",
    description:
      "DevOps engineer and full-stack developer (mostly backend) in Tehran, studying Computer Science. Linux, containers, CI/CD, monitoring, Python, and Go. Founder of Nerkhbaan, co-founder of Dolphin CRM.",
    ogLocale: "en_US",
  },
  skipLink: "Skip to content",
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Résumé",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary",
    mobile: "Mobile",
  },
  language: {
    label: "Language",
    en: "English",
    fa: "فارسی",
  },
  hero: {
    available: "Open to remote roles",
    explore: "View my projects",
    resume: "Download résumé",
    loopTitle: "The DevOps loop: plan, code, build, test, release, deploy, operate, monitor, and back to plan.",
    capabilitiesLabel: "What I do",
    portraitAlt: "Portrait of Ilia Shakeri, smiling, outdoors",
    links: "Profiles",
  },
  home: {
    featured: "Projects I’m proud of",
    allProjects: "All projects",
    ctaTitle: "Have a role or a project in mind?",
    ctaBody: "I’m open to remote DevOps, backend, and full-stack work.",
    ctaButton: "Get in touch",
  },
  pages: {
    about: { title: "About me", lead: "Who I am, the tools I use, and how I work." },
    projects: { title: "Projects", lead: "Products I founded and tools I built, each linked to its source." },
    experience: { title: "Experience" },
    contact: { title: "Contact" },
  },
  about: {
    labels: {
      name: "Name",
      role: "Role",
      basedIn: "Based in",
      focus: "Focus",
      languages: "Languages",
      localTime: "Local time",
    },
  },
  ventures: {
    title: "Projects I’m proud of",
    highlightsLabel: "My part",
    stackLabel: "Stack",
    statsLabel: "Key facts",
  },
  builds: {
    title: "More projects",
    filterLabel: "Filter projects",
    filters: { all: "All", ops: "Automation & ops", security: "Security", monitoring: "Monitoring", apps: "Apps" },
  },
  caseStudy: {
    toggle: "Engineering notes",
    problem: "Problem",
    role: "My role",
    approach: "Approach",
    reliability: "Security & reliability",
    result: "Result",
    technologies: "Technologies",
  },
  toolkit: {
    title: "Toolkit",
  },
  experience: {
    focusLabel: "Focus areas",
  },
  approach: {
    title: "How I work",
    output: "Output",
  },
  education: {
    title: "Education & training",
    educationLabel: "Education",
    certId: "Cert ID",
    viewCertificate: "View certificate",
  },
  resume: {
    title: "Résumé",
    body: "Experience, skills, education, and selected projects in a two-page PDF.",
    download: "Download résumé",
    printable: "Printable version",
    updated: "Updated",
    previewSections: ["Profile", "Experience", "Selected projects", "Technical skills"],
  },
  contact: {
    email: "Email",
    elsewhere: "Elsewhere",
  },
  footer: {
    backToTop: "Back to top",
  },
  external: "(opens in a new tab)",
};

export type UiStrings = typeof ui;
