export type LinkRef = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  /** Professional title shown under the name in the hero. */
  headline: string;
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
};

export type CaseStudy = {
  problem: string;
  role: string;
  approach: string[];
  reliability: string[];
  outcome: string[];
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

/** A product Ilia founded or co-founded ("Projects I'm proud of"). */
export type Venture = {
  slug: string;
  name: string;
  /** Name in the other script, shown next to the name. */
  localName: string;
  logo: { src: string; width: number; height: number };
  /** Brand colour for the logo ring and role badge. */
  accent: string;
  role: string;
  period: string;
  /** Current state, e.g. where it is live or the latest release. */
  status: string;
  description: string;
  /** "My part": three short points. */
  highlights: string[];
  stats: { value: string; label: string }[];
  tools: Tool[];
  links: (LinkRef & { primary?: boolean })[];
  caseStudy: CaseStudy;
};

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

export type ToolkitGroup = {
  title: string;
  icon: ToolkitIcon;
  tools: Tool[];
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
};
