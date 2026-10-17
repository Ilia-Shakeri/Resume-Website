import { DevOpsLoop } from "@/components/DevOpsLoop";
import { Icon } from "@/components/Icon";
import { LiveTerminal, type TerminalLine } from "@/components/LiveTerminal";
import { buildSha } from "@/lib/build-info";
import { capabilities, profile } from "@/content/profile";
import { site } from "@/lib/site";

export function Hero() {
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
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid gap-10 pt-14 pb-12 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] min-[87.5rem]:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-6 lg:pt-[84px] lg:pb-14">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            {profile.role} / {profile.location}
          </p>
          <h1
            id="hero-title"
            className="mt-8 text-[2.375rem] leading-[1.05] tracking-[-0.03em] min-[360px]:text-[2.625rem] min-[400px]:text-5xl sm:text-7xl lg:mt-10 lg:text-[4rem] lg:leading-[1.08] xl:text-[5.5rem] min-[87.5rem]:text-[6.25rem]"
          >
            <span className="block">{profile.headline[0]}</span>
            <span className="block">{profile.headline[1]}</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-text lg:text-xl lg:leading-[1.65]">
            {profile.intro}
          </p>
          <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects" className="btn btn-primary">
              Explore my projects
              <Icon name="arrow-down" />
            </a>
            <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-outline">
              Download résumé
              <Icon name="download" className="text-mint" />
            </a>
          </div>
          <a href="#about" className="meta mt-16 hidden items-center gap-4 hover:text-ink lg:inline-flex">
            <Icon name="arrow-down" className="text-mint" />
            Scroll to explore
          </a>
        </div>

        <div className="relative flex flex-col justify-center gap-6">
          <DevOpsLoop />
          <p className="meta flex items-center gap-3">
            <span className="h-px w-9 bg-mint" aria-hidden="true" />
            Continuous delivery / ∞
          </p>
          <LiveTerminal title="iliashakeri.ir ~ prod" lines={terminal} rows={4} className="lg:ml-16" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site">
          <ul className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Operating layer">
            <li className="meta">My operating layer</li>
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-ink uppercase lg:justify-end">
                <span className="text-mint" aria-hidden="true">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
