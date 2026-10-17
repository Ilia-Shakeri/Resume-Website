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
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Download résumé",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary",
    mobile: "Mobile",
    backToTop: "back to top",
  },
  language: {
    label: "Language",
    en: "English",
    fa: "فارسی",
  },
  hero: {
    available: "Open to remote roles",
    explore: "Explore my projects",
    resume: "Download résumé",
    loopCaption: "Continuous delivery / ∞",
    loopTitle: "The DevOps loop: plan, code, build, test, release, deploy, operate, monitor, and back to plan.",
    capabilitiesLabel: "My operating layer",
    portraitAlt: "Portrait of Ilia Shakeri, smiling, outdoors",
    links: "Profiles",
  },
  about: {
    eyebrow: "01 / The human layer",
    titleLines: ["A systems thinker.", "A builder at heart."],
    labels: { name: "Name", role: "Role", basedIn: "Based in", focus: "Focus", localTime: "Local time" },
  },
  ventures: {
    eyebrow: "02 / Projects I’m proud of",
    titleLines: ["Things I started.", "And still build."],
    aside: "I founded Nerkhbaan and co-founded Dolphin CRM. I build both myself, from the first commit to how they are deployed.",
    highlightsLabel: "My part",
    stackLabel: "Stack",
    statsLabel: "Key facts",
  },
  builds: {
    eyebrow: "03 / More projects",
    titleLines: ["Tools I built", "along the way."],
    aside: "Smaller automation, security, and monitoring tools from my GitHub, each linked to its source.",
    filterLabel: "Filter projects",
    filters: { all: "All", ops: "Automation & ops", security: "Security", monitoring: "Monitoring", apps: "Apps" },
    footnote: "// No illustrative metrics. Figures come from each repository’s own records.",
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
    eyebrow: "04 / Technical toolkit",
    titleLines: ["The right tools.", "For the right problem."],
    toolsLabel: "tools",
    footnote: (count: number) => `// ${count} tools · brand icons from Simple Icons (CC0)`,
  },
  experience: {
    eyebrow: "05 / Experience",
    title: "A career in building better.",
    note: ["// Dates and roles from my résumé;", "// project details from GitHub."],
    focusLabel: "Focus areas",
  },
  approach: {
    eyebrow: "06 / How I work",
    title: "Built in loops, not silos.",
    output: "Output",
    banner: "Reliability is never “done.” Every deploy, alert, and restore test feeds the next improvement.",
    bannerTag: "Feedback → forward",
  },
  education: {
    eyebrow: "07 / Education & training",
    title: "Always in learning mode.",
    educationLabel: "Education",
    certId: "Cert ID",
    viewCertificate: "View certificate",
  },
  resume: {
    eyebrow: "08 / The takeaway",
    titleLines: ["The full picture.", "In one document."],
    body: "Experience, technical skills, education, and selected work in a two-page PDF, built from the same verified content as this site.",
    download: "Download résumé",
    printable: "Printable version",
    updated: "Updated",
    previewSections: ["Profile", "Experience", "Selected projects", "Technical skills"],
  },
  contact: {
    eyebrow: "09 / Next connection",
    titleLines: ["Let’s build", "what’s next."],
  },
  footer: {
    tagline: "Designed to keep evolving.",
    backToTop: "Back to top",
  },
  external: "(opens in a new tab)",
};

export type UiStrings = typeof ui;
