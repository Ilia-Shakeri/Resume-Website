export type LinkRef = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  headline: [string, string];
  intro: string;
  location: string;
  timeZone: string;
  availability: string;
  email: string;
  github: LinkRef;
  linkedin: LinkRef;
  focus: string;
  languages: string[];
  bio: string[];
  principles: { title: string; detail: string }[];
  contactMessage: string;
};

export type CaseStudy = {
  problem: string;
  role: string;
  approach: string[];
  reliability: string[];
  outcome: string[];
};

/** Which illustration a featured project card renders. */
export type DiagramKind = "dolphin-stack" | "nerkhbaan-ci" | "chatops-flow";

export type FeaturedProject = {
  slug: string;
  category: string;
  name: string;
  period: string;
  role: string;
  title: string;
  summary: string;
  tags: string[];
  outcomeLabel: string;
  outcome: string;
  diagram: DiagramKind;
  links: LinkRef[];
  caseStudy: CaseStudy;
};

export type SecondaryProject = {
  name: string;
  year: string;
  summary: string;
  tags: string[];
  href: string;
};

export type ToolkitIcon = "server" | "boxes" | "branch" | "pulse" | "terminal" | "shield";

export type ToolkitGroup = {
  title: string;
  icon: ToolkitIcon;
  tools: string[][];
  practices: string[];
};

export type ExperienceItem = {
  title: string;
  organization: string;
  location: string;
  period: string;
  scope: string;
  highlights: string[];
  tags: string[];
};

export type ApproachStep = {
  title: string;
  icon: "search" | "code" | "rocket" | "pulse";
  description: string;
  practice: string;
  output: string;
};

export type Qualification = {
  title: string;
  issuer: string;
  date: string;
  note: string;
};

export type Education = {
  degree: string;
  institution: string;
  note: string;
};
