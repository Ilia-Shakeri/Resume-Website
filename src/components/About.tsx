import { profile } from "@/content/profile";

export function About() {
  const rows = [
    { label: "Name", value: profile.name },
    { label: "Role", value: profile.role },
    { label: "Based in", value: profile.location },
    { label: "Focus", value: profile.focus },
  ];

  return (
    <section aria-labelledby="about-title" className="scroll-mt-24 py-20 lg:py-[120px]" id="about">
      <div className="container-site grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-[92px]">
        <div>
          <p className="eyebrow">01 / The human layer</p>
          <div className="mt-10 rounded-lg border border-line-strong bg-card px-6 py-6 font-mono">
            <p className="text-sm text-mint">
              <span aria-hidden="true">$ </span>whoami
            </p>
            <dl className="mt-6 space-y-[18px]">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[0.625rem] tracking-[0.06em] text-muted uppercase">{row.label}</dt>
                  <dd className="mt-1.5 font-sans text-[0.9375rem] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-10 font-mono text-[0.6875rem] leading-[1.7] text-muted">
            {"// "}
            {profile.availability}.
            <br />
            {"// "}
            {profile.languages.join(" · ")}.
          </p>
        </div>

        <div className="lg:pt-2">
          <h2 id="about-title" className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
            A systems thinker.
            <br />
            A builder at heart.
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
        </div>
      </div>
    </section>
  );
}
