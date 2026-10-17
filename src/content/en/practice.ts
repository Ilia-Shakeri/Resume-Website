import type { ApproachStep, ToolkitGroup } from "../types";

// Every tool listed appears in the résumé, the GitHub profile README, or a
// repository (see docs/content-evidence.md, "Toolkit"). Brand icons come from
// Simple Icons (CC0) and are inlined at build time; tools without a brand icon
// use a neutral glyph.

export const toolkitIntro: string =
  "Organized by purpose, not proficiency bars. Every tool here appears in my work history or in one of my repositories.";

export const toolkit: ToolkitGroup[] = [
  {
    title: "Linux & infrastructure",
    icon: "server",
    tools: [
      { name: "Linux", brand: "siLinux" },
      { name: "Ubuntu", brand: "siUbuntu" },
      { name: "CentOS", brand: "siCentos" },
      { name: "Alpine Linux", brand: "siAlpinelinux" },
      { name: "systemd", fallback: "terminal" },
      { name: "LVM", fallback: "database" },
      { name: "NFS", fallback: "server" },
      { name: "Terraform", brand: "siTerraform" },
      { name: "Ansible", brand: "siAnsible" },
    ],
    practices: ["Provisioning", "Hardening", "Configuration management"],
  },
  {
    title: "Containers & orchestration",
    icon: "boxes",
    tools: [
      { name: "Docker", brand: "siDocker" },
      { name: "Docker Compose", brand: "siDocker" },
      { name: "Docker Swarm", brand: "siDocker" },
      { name: "Kubernetes", brand: "siKubernetes" },
      { name: "Helm", brand: "siHelm" },
    ],
    practices: ["Images", "Compose stacks", "Charts"],
  },
  {
    title: "Delivery & automation",
    icon: "branch",
    tools: [
      { name: "GitHub Actions", brand: "siGithubactions" },
      { name: "GitLab CI/CD", brand: "siGitlab" },
      { name: "Git", brand: "siGit" },
      { name: "GitHub", brand: "siGithub" },
      { name: "n8n", brand: "siN8n" },
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Make", fallback: "terminal" },
    ],
    practices: ["Build", "Scan", "Release", "Rollback"],
  },
  {
    title: "Monitoring & observability",
    icon: "pulse",
    tools: [
      { name: "Prometheus", brand: "siPrometheus" },
      { name: "Alertmanager", brand: "siPrometheus" },
      { name: "Grafana", brand: "siGrafana" },
      { name: "Loki", fallback: "pulse" },
      { name: "Elasticsearch", brand: "siElasticsearch" },
      { name: "Logstash", brand: "siLogstash" },
      { name: "Kibana", brand: "siKibana" },
    ],
    practices: ["Metrics", "Alerts", "Logs"],
  },
  {
    title: "Web, network & security",
    icon: "shield",
    tools: [
      { name: "Nginx", brand: "siNginx" },
      { name: "Apache", brand: "siApache" },
      { name: "Traefik", brand: "siTraefikproxy" },
      { name: "Caddy", brand: "siCaddy" },
      { name: "OpenSSL", brand: "siOpenssl" },
      { name: "Let's Encrypt", brand: "siLetsencrypt" },
      { name: "Keycloak", brand: "siKeycloak" },
      { name: "Trivy", brand: "siTrivy" },
      { name: "UFW / iptables", fallback: "shield" },
      { name: "Active Directory", fallback: "server" },
    ],
    practices: ["Reverse proxying", "TLS", "IAM", "Hardening"],
  },
  {
    title: "Data & messaging",
    icon: "database",
    tools: [
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "TimescaleDB", brand: "siTimescale" },
      { name: "MySQL", brand: "siMysql" },
      { name: "MariaDB", brand: "siMariadb" },
      { name: "Galera Cluster", brand: "siMariadb" },
      { name: "Redis", brand: "siRedis" },
      { name: "SQLite", brand: "siSqlite" },
      { name: "RabbitMQ", brand: "siRabbitmq" },
      { name: "MinIO", brand: "siMinio" },
    ],
    practices: ["Least-privilege roles", "Backups", "Restore tests"],
  },
  {
    title: "Languages & frameworks",
    icon: "code",
    tools: [
      { name: "Python", brand: "siPython" },
      { name: "Go", brand: "siGo" },
      { name: "TypeScript", brand: "siTypescript" },
      { name: "JavaScript", brand: "siJavascript" },
      { name: "SQL", fallback: "database" },
      { name: "FastAPI", brand: "siFastapi" },
      { name: "Django", brand: "siDjango" },
      { name: "Flask", brand: "siFlask" },
      { name: "SQLAlchemy", brand: "siSqlalchemy" },
      { name: "Pydantic", brand: "siPydantic" },
      { name: "Gunicorn", brand: "siGunicorn" },
      { name: "React", brand: "siReact" },
      { name: "Next.js", brand: "siNextdotjs" },
      { name: "Node.js", brand: "siNodedotjs" },
      { name: "Vite", brand: "siVite" },
      { name: "Tailwind CSS", brand: "siTailwindcss" },
      { name: "Electron", brand: "siElectron" },
      { name: "OpenAPI", brand: "siOpenapiinitiative" },
      { name: "pytest", brand: "siPytest" },
      { name: "Playwright", fallback: "code" },
      { name: "Selenium", brand: "siSelenium" },
    ],
    practices: ["Scripting", "APIs", "Testing"],
  },
  {
    title: "Collaboration & ChatOps",
    icon: "chat",
    tools: [
      { name: "Matrix", brand: "siMatrix" },
      { name: "Element", brand: "siElement" },
      { name: "Jira", brand: "siJira" },
      { name: "Telegram Bot API", brand: "siTelegram" },
      { name: "Asterisk / FreePBX", brand: "siAsterisk" },
    ],
    practices: ["Alert routing", "Ticket notifications", "Runbooks"],
  },
];

export const approachIntro: string =
  "Small, reviewable changes, written-down operations, and feedback that reaches the next build.";

export const approach: ApproachStep[] = [
  {
    title: "Understand",
    icon: "search",
    description: "Map the system, its constraints, and what failure would cost.",
    practice: "Write the contract first: Dolphin’s business rules live in a backend spec, not in memory.",
    output: "A clear baseline",
  },
  {
    title: "Codify",
    icon: "code",
    description: "Turn infrastructure, access, and policy into versioned, reviewable code.",
    practice: "Compose files, Ansible playbooks, hash-pinned dependencies, and explicit database grants.",
    output: "Repeatable systems",
  },
  {
    title: "Ship safely",
    icon: "rocket",
    description: "Test, scan, and release in small steps, with a rollback plan.",
    practice: "Images built from tagged commits, scanned in CI, deployed after a backup, rolled back by script.",
    output: "Confident delivery",
  },
  {
    title: "Observe & refine",
    icon: "pulse",
    description: "Measure service health, learn from incidents, and reduce toil.",
    practice: "Readiness checks, Prometheus alerts routed to chat, and restore tests on real backups.",
    output: "Continuous improvement",
  },
];
