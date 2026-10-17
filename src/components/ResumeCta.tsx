import { Icon } from "@/components/Icon";
import { Lines } from "@/components/SectionHeader";
import { getContent, type Content, type Locale } from "@/content";
import { site } from "@/lib/site";
import { resumeFileSize } from "@/lib/resume-file";

function ResumePreview({ sections }: { sections: readonly string[] }) {
  // The PDF is in English, so the preview always shows the English name.
  const { profile } = getContent("en");
  return (
    <div dir="ltr" className="relative hidden w-[238px] shrink-0 lg:block" aria-hidden="true">
      <div className="rounded-sm bg-[#b3c4ba] px-6 pt-7 pb-6 text-[#151b18] shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
        <p className="font-display text-xl">{profile.name}</p>
        <p className="mt-2 font-mono text-[0.5rem] tracking-[0.08em] uppercase opacity-70">{profile.role}</p>
        <div className="mt-3 h-0.5 bg-[#151b18]" />
        {sections.map((label) => (
          <div key={label} className="mt-4">
            <p className="font-mono text-[0.5rem] tracking-[0.08em] uppercase">{label}</p>
            <div className="mt-2 h-0.5 bg-[#151b18]/25" />
            <div className="mt-1.5 h-0.5 w-3/4 bg-[#151b18]/25" />
          </div>
        ))}
      </div>
      <span className="absolute -right-4 -bottom-4 flex items-center gap-2.5 rounded-md bg-bg px-5 py-3.5 font-mono text-xs text-mint">
        <Icon name="file" />
        PDF
      </span>
    </div>
  );
}

export function ResumeCta({ content, locale }: { content: Content; locale: Locale }) {
  const { ui } = content;
  const size = resumeFileSize();

  return (
    <section aria-labelledby="resume-title" id="resume" className="scroll-mt-24 py-20 lg:py-[92px]">
      <div className="container-site">
        <div data-reveal className="flex flex-col justify-between gap-12 rounded-2xl bg-mint px-6 py-12 text-on-mint sm:px-12 sm:py-14 lg:flex-row lg:items-center lg:pe-[90px]">
          <div>
            <p className="font-mono text-xs tracking-[0.06em] uppercase">{ui.resume.eyebrow}</p>
            <h2 id="resume-title" className="mt-6 text-[2.5rem] leading-[1.08] !text-on-mint sm:text-5xl lg:text-[4rem]">
              <Lines lines={ui.resume.titleLines} />
            </h2>
            <p className="mt-6 max-w-[460px] text-[1.0625rem] leading-relaxed text-on-mint/80">
              {ui.resume.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
              <a
                href={site.resume.pdfPath}
                download={site.resume.downloadName}
                className="btn bg-on-mint text-ink hover:bg-[#1a2124]"
              >
                {ui.resume.download}
                <Icon name="download" />
              </a>
              <a href={site.resume.printPath} className="btn border border-on-mint/40 hover:border-on-mint">
                {ui.resume.printable}
                <Icon name="printer" />
              </a>
              <p className="font-mono text-[0.6875rem] leading-[1.7] tracking-[0.04em] uppercase">
                PDF{size ? ` · ${size}` : ""}
                <br />
                {ui.resume.updated} {site.resume.updated[locale]}
              </p>
            </div>
          </div>
          <ResumePreview sections={ui.resume.previewSections} />
        </div>
      </div>
    </section>
  );
}
