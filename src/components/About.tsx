import { LiveTerminal, type TerminalLine } from "@/components/LiveTerminal";
import { WhoamiPanel } from "@/components/WhoamiPanel";
import { Lines } from "@/components/SectionHeader";
import type { Content } from "@/content";
import { buildSha } from "@/lib/build-info";

export function About({ content }: { content: Content }) {
  const { profile, ui } = content;
  const labels = ui.about.labels;
  const rows = [
    { label: labels.name, value: profile.name },
    { label: labels.role, value: profile.role },
    { label: labels.basedIn, value: profile.location },
    { label: labels.focus, value: profile.focus },
  ];
  // Commands from the real deployment of this site (see docs/deployment.md).
  const terminal: TerminalLine[] = [
    { kind: "cmd", text: "curl -s https://iliashakeri.ir/build.txt" },
    { kind: "out", text: buildSha() },
    { kind: "cmd", text: "docker compose ps --format '{{.Name}} {{.Status}}'" },
    { kind: "out", text: "iliashakeri-web-1 Up (healthy)" },
    { kind: "cmd", text: "systemctl is-active iliashakeri-update.timer" },
    { kind: "ok", text: "active · pulls new builds every 2 min" },
    { kind: "cmd", text: 'echo "$MOTTO"' },
    { kind: "ok", text: "Built to ship. Built to stay up." },
  ];

  return (
    <section aria-labelledby="about-title" className="scroll-mt-24 py-20 lg:py-[120px]" id="about">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-[92px]">
        <div>
          <p className="eyebrow">{ui.about.eyebrow}</p>
          <div className="mt-10" data-reveal>
            <WhoamiPanel rows={rows} localTimeLabel={labels.localTime} />
          </div>
          <p className="mt-10 font-mono text-[0.6875rem] leading-[1.7] text-muted">
            {"// "}
            {profile.availability}.
            <br />
            {"// "}
            {profile.languages.join(" · ")}.
          </p>
        </div>

        <div className="lg:pt-2" data-reveal>
          <h2 id="about-title" className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
            <Lines lines={ui.about.titleLines} />
          </h2>
          <p className="mt-10 text-lg leading-[1.75] text-text lg:text-[1.1875rem]">{profile.bio[0]}</p>
          <p className="mt-6 text-base leading-[1.75] text-text lg:text-[1.0625rem]">{profile.bio[1]}</p>
          <div className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {profile.principles.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
          <LiveTerminal title="iliashakeri.ir ~ prod" lines={terminal} rows={4} className="mt-12" />
        </div>
      </div>
    </section>
  );
}
