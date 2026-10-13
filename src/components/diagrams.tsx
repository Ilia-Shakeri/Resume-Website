import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon, type IconName } from "@/components/Icon";
import type { DiagramKind } from "@/content/types";

// Architecture visuals for the featured projects. They are HTML/CSS rather than
// fixed-size SVG so that labels stay readable and reflow on small screens.
// Every node corresponds to a real component in the linked repository.

function Node({ title, detail, active = false }: { title: string; detail: string; active?: boolean }) {
  return (
    <div
      className={`rounded-md border px-3.5 py-3 font-mono ${
        active ? "border-mint/80 bg-mint-tint shadow-[0_0_0_4px_rgba(132,188,156,0.06)]" : "border-line-strong bg-card-2/80"
      }`}
    >
      <p className={`text-[0.8125rem] ${active ? "text-mint-bright" : "text-ink"}`}>{title}</p>
      <p className="mt-1 text-[0.6875rem] leading-snug text-muted">{detail}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-mint/25 bg-mint-tint px-2.5 py-1.5 font-mono text-[0.625rem] tracking-[0.06em] text-mint uppercase">
      {children}
    </span>
  );
}

function DolphinStack() {
  return (
    <figure className="relative h-full p-6 sm:p-10" aria-label="Dolphin CRM deployment architecture">
      <figcaption className="meta">Deployment blueprint / one stack per customer</figcaption>
      <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1.15fr_1fr] sm:gap-5">
        <div className="flex flex-col gap-3 sm:gap-16">
          <Node title="Nginx edge" detail="TLS · rate limits · write-stop" />
          <Node title="Signed manifest" detail="Ed25519 · feature switches" />
        </div>

        <div className="order-last col-span-2 rounded-md border border-dashed border-mint/30 p-3 sm:order-none sm:col-span-1 sm:p-4">
          <p className="meta text-[0.625rem]">Private backend network</p>
          <div className="mt-3 space-y-3">
            <Node title="Django web" detail="Read-only container · health probes" active />
            <Node title="Realtime" detail="Server-sent events" />
            <Node title="PostgreSQL" detail="4 scoped roles · no public port" />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-16">
          <Node title="One-shot jobs" detail="bootstrap → migrate → finalize" />
          <Node title="Backups" detail="sha256 · restore-verified offline" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Deployment sequence">
        <Pill>Backup</Pill>
        <Icon name="arrow-right" size={12} className="text-muted" />
        <Pill>Migrate</Pill>
        <Icon name="arrow-right" size={12} className="text-muted" />
        <Pill>Grant</Pill>
        <Icon name="arrow-right" size={12} className="text-muted" />
        <Pill>Serve</Pill>
        <span className="ml-1 font-mono text-[0.625rem] text-muted uppercase">/ rollback ready</span>
      </div>
    </figure>
  );
}

const ciStages: { label: string; detail: string; icon: IconName }[] = [
  { label: "Build", detail: "Locked npm", icon: "package" },
  { label: "Test", detail: "Python · Go", icon: "check-double" },
  { label: "Integrate", detail: "Timescale · Redis", icon: "commit" },
  { label: "E2E", detail: "Browser auth", icon: "code" },
  { label: "Scan", detail: "Trivy · pip-audit", icon: "shield" },
];

function NerkhbaanCi() {
  return (
    <figure className="p-6 sm:p-7" aria-label="Nerkhbaan CI pipeline">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem]">
        <span className="text-muted">main / .github/workflows/ci.yml</span>
        <span className="text-mint">✓ 2.8.1 · all jobs passed</span>
      </figcaption>
      <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {ciStages.map((stage) => (
          <li key={stage.label} className="flex flex-col items-center rounded-md border border-line-strong bg-bg px-1 py-5 text-center">
            <Icon name={stage.icon} className="text-mint" />
            <span className="mt-3 font-mono text-[0.6875rem] text-ink">{stage.label}</span>
            <span className="mt-1 font-mono text-[0.5625rem] leading-tight text-muted">{stage.detail}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem]">
        <ExternalLink
          href="https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38222923015"
          className="text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
        >
          Run 38222923015 · 15/15 jobs
        </ExternalLink>
        <span className="text-mint">image gate → production</span>
      </div>
    </figure>
  );
}

function FlowRow({ label, steps }: { label: string; steps: { title: string; detail: string; active?: boolean }[] }) {
  return (
    <div>
      <p className="meta text-[0.625rem]">{label}</p>
      <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((step) => (
          <li key={step.title}>
            <Node title={step.title} detail={step.detail} active={step.active} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChatopsFlow() {
  return (
    <figure className="space-y-6 p-6 sm:p-7" aria-label="ChatOps alert and notification flow">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem]">
        <span className="text-muted">n8n / chatops-bridges</span>
        <span className="text-mint">retry · backoff + jitter</span>
      </figcaption>
      <FlowRow
        label="Alerts"
        steps={[
          { title: "Prometheus", detail: "Rules fire" },
          { title: "Alertmanager", detail: "Webhook JSON" },
          { title: "n8n", detail: "Auth · HTML format", active: true },
          { title: "Matrix room", detail: "Firing / resolved" },
        ]}
      />
      <FlowRow
        label="Tickets"
        steps={[
          { title: "Jira", detail: "Issue webhook" },
          { title: "Mention parser", detail: "Assignee · @user" },
          { title: "n8n", detail: "User → DM room", active: true },
          { title: "Matrix DM", detail: "Direct notice" },
        ]}
      />
    </figure>
  );
}

export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "dolphin-stack":
      return <DolphinStack />;
    case "nerkhbaan-ci":
      return <NerkhbaanCi />;
    case "chatops-flow":
      return <ChatopsFlow />;
  }
}
