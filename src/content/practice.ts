import type { ApproachStep, ToolkitGroup } from "./types";

// Tools listed here appear in the résumé and/or in the linked repositories.
// See docs/content-evidence.md ("Toolkit") for where each one is evidenced.

export const toolkitIntro =
  "Organized by purpose, not proficiency bars. Each of these appears in my work history or in a public repository.";

export const toolkit: ToolkitGroup[] = [
  {
    title: "Infrastructure & data",
    icon: "server",
    tools: [
      ["Linux VPS", "LVM", "NFS"],
      ["Terraform", "Ansible"],
      ["PostgreSQL", "Redis", "TimescaleDB"],
    ],
    practices: ["Provisioning", "Configuration", "Backup & restore"],
  },
  {
    title: "Containers & orchestration",
    icon: "boxes",
    tools: [
      ["Docker", "Compose", "Swarm"],
      ["Kubernetes", "Helm"],
    ],
    practices: ["Images", "Compose stacks", "Charts"],
  },
  {
    title: "Delivery & automation",
    icon: "branch",
    tools: [
      ["GitHub Actions", "GitLab CI"],
      ["n8n", "Bash", "Make"],
    ],
    practices: ["Build", "Scan", "Release", "Rollback"],
  },
  {
    title: "Monitoring & observability",
    icon: "pulse",
    tools: [
      ["Prometheus", "Alertmanager"],
      ["Grafana", "Loki", "ELK"],
    ],
    practices: ["Metrics", "Alerts", "Logs"],
  },
  {
    title: "Operating systems & scripting",
    icon: "terminal",
    tools: [
      ["Ubuntu", "CentOS", "Git"],
      ["Bash", "Python", "Go", "SQL"],
    ],
    practices: ["Scripting", "Tooling", "Troubleshooting"],
  },
  {
    title: "Security & collaboration",
    icon: "shield",
    tools: [
      ["Nginx", "Traefik", "OpenSSL"],
      ["Keycloak", "Trivy", "UFW / iptables"],
      ["Matrix", "Jira"],
    ],
    practices: ["Hardening", "TLS", "IAM", "ChatOps"],
  },
];

export const approachIntro =
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
