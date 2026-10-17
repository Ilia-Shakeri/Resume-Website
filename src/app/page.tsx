import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ResumeCta } from "@/components/ResumeCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SelectedWork } from "@/components/SelectedWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Toolkit } from "@/components/Toolkit";
import { personJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <SelectedWork />
        <Toolkit />
        <Experience />
        <Approach />
        <Education />
        <ResumeCta />
        <Contact />
      </main>
      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
