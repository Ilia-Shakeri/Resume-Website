import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PrintButton } from "@/components/PrintButton";
import { toolkit } from "@/content/practice";
import { education, experience, profile, qualifications, resumeSummary } from "@/content/profile";
import { featuredProjects, secondaryProjects } from "@/content/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Printable résumé of ${profile.name}, DevOps Engineer.`,
  alternates: { canonical: site.resume.printPath },
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-[#c9d3cd] pb-1.5 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] !text-[#2f6b4d] uppercase">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="resume-screen min-h-screen bg-bg py-6 print:bg-white print:py-0 sm:py-10">
      <nav aria-label="Résumé actions" className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 print:hidden">
        <Link href="/" className="meta inline-flex min-h-11 items-center gap-2 hover:text-ink">
          <Icon name="arrow-right" className="rotate-180 text-mint" />
          Back to portfolio
        </Link>
        <div className="flex gap-3">
          <PrintButton />
          <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-primary min-h-10 px-4">
            Download PDF
            <Icon name="download" />
          </a>
        </div>
      </nav>

      <main
        id="main"
        className="resume-sheet mx-auto max-w-[210mm] bg-white px-6 py-8 text-[0.8125rem] leading-[1.5] text-[#1d2421] shadow-2xl sm:px-[16mm] sm:py-[14mm] print:max-w-none print:p-0 print:shadow-none [&_h1]:text-[#111715] [&_h3]:text-[#111715]"
      >
        <header className="flex flex-col gap-4 border-b-2 border-[#111715] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-[2rem] leading-none font-medium tracking-[-0.02em]">{profile.name}</h1>
            <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.1em] text-[#2f6b4d] uppercase">
              {profile.role} · Linux · Automation · Observability
            </p>
          </div>
          <ul className="space-y-0.5 text-[0.75rem] sm:text-right">
            <li>
              {profile.location} · {profile.availability}
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="underline-offset-2 hover:underline">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github.href} className="underline-offset-2 hover:underline">
                {profile.github.label}
              </a>
              {" · "}
              <a href={profile.linkedin.href} className="underline-offset-2 hover:underline">
                {profile.linkedin.label}
              </a>
            </li>
          </ul>
        </header>

        <section className="mt-5" aria-labelledby="r-summary">
          <Heading>
            <span id="r-summary">Profile</span>
          </Heading>
          <p className="mt-2">{resumeSummary}</p>
        </section>

        <section className="mt-5" aria-labelledby="r-experience">
          <Heading>
            <span id="r-experience">Experience</span>
          </Heading>
          {experience.map((item) => (
            <article key={item.title} className="mt-3 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[0.9375rem] font-semibold">
                  {item.title} · <span className="font-normal">{item.organization}</span>
                </h3>
                <p className="font-mono text-[0.6875rem] text-[#4b5753]">
                  {item.period} · {item.location}
                </p>
              </div>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-[#2f6b4d]">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-5" aria-labelledby="r-projects">
          <Heading>
            <span id="r-projects">Selected projects</span>
          </Heading>
          {featuredProjects.map((project) => (
            <article key={project.slug} className="mt-3 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[0.9375rem] font-semibold">{project.name}</h3>
                <a href={project.links[0].href} className="font-mono text-[0.6875rem] text-[#4b5753]">
                  {project.links[0].href.replace("https://", "")}
                </a>
              </div>
              <p className="mt-0.5">{project.summary}</p>
              <p className="mt-0.5 text-[#4b5753]">{project.caseStudy.approach[0]}</p>
              <p className="mt-0.5 font-mono text-[0.6875rem] text-[#4b5753]">{project.tags.join(" · ")}</p>
            </article>
          ))}
          <p className="mt-3 break-inside-avoid">
            <span className="font-semibold">Also: </span>
            {secondaryProjects.map((project, index) => (
              <span key={project.name}>
                {project.name} ({project.tags[0]}){index < secondaryProjects.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </section>

        <section className="mt-5 break-inside-avoid" aria-labelledby="r-skills">
          <Heading>
            <span id="r-skills">Technical skills</span>
          </Heading>
          <dl className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {toolkit.map((group) => (
              <div key={group.title}>
                <dt className="font-semibold">{group.title}</dt>
                <dd className="text-[#36403c]">{group.tools.flat().join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-5 grid break-inside-avoid gap-5 sm:grid-cols-2" aria-label="Education, training, and languages">
          <div>
            <Heading>Education</Heading>
            <p className="mt-2 font-semibold">{education.degree}</p>
            <p>{education.institution ? `${education.institution} · ` : ""}{education.status}</p>
            <div className="mt-4">
              <Heading>Languages</Heading>
              <p className="mt-2">{profile.languages.join(" · ")}</p>
            </div>
          </div>
          <div>
            <Heading>Training</Heading>
            <ul className="mt-2 space-y-1">
              {qualifications.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold">{item.title}</span> · {item.issuer}, {item.date}
                  {item.certId ? ` · ID ${item.certId}` : ""}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
