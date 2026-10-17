import { LiveTerminal, type TerminalLine } from "@/components/LiveTerminal";
import { WhoamiPanel } from "@/components/WhoamiPanel";
import type { Content } from "@/content";
import { buildSha } from "@/lib/build-info";

export function About({ content }: { content: Content }) {
  const { profile, ui } = content;
  const labels = ui.about.labels;
  const rows = [
    { label: labels.name, value: profile.name },
    { label: labels.role, value: profile.headline },
    { label: labels.basedIn, value: profile.location },
    { label: labels.focus, value: profile.focus },
    { label: labels.languages, value: profile.languages.join(" · ") },
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
    <section id="about" className="scroll-mt-20 py-8 lg:py-10">
      <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div data-reveal data-stagger>
          <p className="text-base leading-[1.8] text-text sm:text-[1.0625rem]">{profile.bio[0]}</p>
          <p className="mt-5 text-base leading-[1.8] text-text sm:text-[1.0625rem]">{profile.bio[1]}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.principles.map((item) => (
              <div key={item.title} className="spotlight rounded-xl border border-line bg-card-2 p-5">
                <h2 className="text-lg text-ink">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
          <LiveTerminal title="iliashakeri.ir ~ prod" lines={terminal} rows={4} className="mt-8" />
        </div>
        <div data-reveal className="lg:col-start-2 lg:row-start-1">
          <WhoamiPanel rows={rows} localTimeLabel={labels.localTime} />
        </div>
      </div>
    </section>
  );
}
