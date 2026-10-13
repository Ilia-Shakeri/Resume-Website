import { Icon } from "@/components/Icon";
import { capabilities, profile } from "@/content/profile";
import { site } from "@/lib/site";

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-[520px]" aria-hidden="true">
      {/* Orbit rings, drawn in SVG so they stay crisp at every size. */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" fill="none">
        <g className="orbit-spin" style={{ animationDuration: "90s" }}>
          <ellipse cx="290" cy="215" rx="230" ry="96" transform="rotate(-20 290 215)" stroke="#84bc9c" strokeOpacity="0.28" />
        </g>
        <ellipse cx="250" cy="330" rx="240" ry="118" transform="rotate(26 250 330)" stroke="#84bc9c" strokeOpacity="0.32" />
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element -- static export; asset is pre-sized WebP */}
      <img
        src="/images/hero-server.webp"
        alt=""
        width={560}
        height={622}
        fetchPriority="high"
        className="orbit-float absolute top-[-2%] left-[26%] w-[48%] drop-shadow-[0_30px_60px_rgba(132,188,156,0.10)]"
      />

      <span className="pulse-dot absolute top-[14%] left-[5%] h-6 w-6 rounded-full bg-mint-bright shadow-[0_0_24px_rgba(168,240,200,0.45)]" />

      <span className="absolute right-[6%] bottom-[18%] flex h-16 w-16 rotate-[-14deg] items-center justify-center rounded-xl border border-mint/70 bg-bg text-mint-bright">
        <Icon name="layers" size={26} />
      </span>
    </div>
  );
}

export function Hero() {
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

        <div className="relative flex flex-col">
          <HeroIllustration />
          <p className="meta -mt-6 flex items-center gap-3 lg:-mt-10">
            <span className="h-px w-9 bg-mint" aria-hidden="true" />
            Systems in orbit / v.01
          </p>
          <div className="mt-6 rounded-lg border border-line-strong bg-card-2 px-5 py-4 font-mono text-[0.8125rem] lg:ml-16">
            <div className="flex items-center justify-between text-[0.6875rem] text-muted">
              <span>portfolio ~ main</span>
              <span className="flex items-center gap-2 text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
                READY
              </span>
            </div>
            <p className="mt-3 text-text">
              <span className="text-muted">$</span> ./deploy.sh --status
            </p>
            <p className="mt-1.5 text-mint">✓ Built to ship. Built to stay up.</p>
          </div>
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
