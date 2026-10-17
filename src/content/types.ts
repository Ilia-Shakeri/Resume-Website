export type LinkRef = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  /** Professional title shown under the name in the hero. */
  headline: string;
  /** Core technologies, shown as one line under the headline. */
  stack: string[];
  intro: string;
  /** Current studies, shown in the hero facts. */
  study: string;
  location: string;
  timeZone: string;
  availability: string;
  email: string;
  github: LinkRef;
  linkedin: LinkRef;
  telegram: LinkRef;
  focus: string;
  languages: string[];
  bio: string[];
  principles: { title: string; detail: string }[];
  contactMessage: string;
  /** Remote-work terms shown on the contact page. */
  remote: { label: string; value: string }[];
};

export type Locale = "en" | "fa";

export type ProjectCategory = "ops" | "security" | "monitoring" | "apps";

/** A repository card in "More projects". */
export type Project = {
  name: string;
  year: string;
  /** What it is, e.g. "Bash CLI" or "n8n workflows". */
  kind: string;
  category: ProjectCategory;
  /** One sentence. */
  summary: string;
  /** Two or three short, verified points. */
  highlights: string[];
  tools: Tool[];
  links: LinkRef[];
};

/** One box in an architecture flow; steps are drawn in order with arrows between them. */
export type FlowStep = { name: string; detail: string };

/** A titled block of the engineering case study. */
export type CaseSection = { title: string; items: string[] };

/** A featured project on /projects/ with its full engineering case study. */
export type FeaturedProject = {
  slug: string;
  name: string;
  /** Name in the other script, shown next to the name. */
  localName?: string;
  logo?: { src: string; width: number; height: number };
  /** Brand colour for the logo ring and role badge. */
  accent: string;
  role: string;
  category: string;
  period: string;
  /** "production" is used only when the live deployment is documented. */
  stage: "production" | "development";
  status: string;
  summary: string;
  /** "My part": three short points. */
  highlights: string[];
  facts: { value: string; label: string }[];
  /** Where the figures come from, with a date. */
  factsSource: string;
  tools: Tool[];
  links: (LinkRef & { primary?: boolean })[];
  architecture: { caption: string; steps: FlowStep[] };
  caseStudy: CaseSection[];
  limitations: string[];
  /** Repository under github.com/Ilia-Shakeri; its latest release and last commit are read at build time. */
  repo?: string;
  /** Product screenshots: an 800 px thumbnail and a 1600 px full image. */
  screenshots?: Screenshot[];
};

export type Screenshot = { thumb: string; full: string; width: number; height: number; alt: string; caption: string };

export type ToolkitIcon = "server" | "boxes" | "branch" | "pulse" | "terminal" | "shield" | "database" | "code" | "chat";

export type Tool = {
  name: string;
  /**
   * Simple Icons export name (e.g. "siDocker"). Omit for tools without a
   * brand icon; they get `fallback` from the site's own icon set instead.
   */
  brand?: string;
  fallback?: ToolkitIcon;
};

/** A core area of expertise with the work that demonstrates it. */
export type Expertise = { title: string; detail: string; evidence: string };

export type ToolkitGroup = {
  title: string;
  icon: ToolkitIcon;
  tools: Tool[];
  practices: string[];
};

export type ExperienceItem = {
  title: string;
  /** Kind of engagement, e.g. "Employment" or "Own product". */
  type: string;
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
  /** Issue date of the certificate, or completion date when there is none. */
  date: string;
  note: string;
  certId?: string;
  /** Published copy of the certificate, under public/certificates/. */
  href?: string;
};

export type Education = {
  degree: string;
  /** Omitted when the institution is not to be published. */
  institution?: string;
  status: string;
  note: string;
  /** For programmes in progress: modules finished and still ahead. */
  completed?: string[];
  upcoming?: string[];
};
