"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { profile } from "@/content/profile";
import { nav, site } from "@/lib/site";

export function Monogram() {
  return (
    <span aria-hidden="true" className="font-mono text-lg tracking-[0.35em] text-mint">
      [/]
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-site flex h-[72px] items-center justify-between gap-6 lg:h-[100px]">
        <Link href="/#top" className="flex items-center gap-3 rounded-sm" aria-label={`${profile.name}, back to top`}>
          <Monogram />
          <span className="font-display text-lg font-medium text-ink">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-[0.9375rem] text-text transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-outline min-h-[3.375rem] px-5">
            Download résumé
            <Icon name="download" className="text-mint" />
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-bg lg:hidden"
      >
        <ul className="container-site flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line text-base text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a
              href={site.resume.pdfPath}
              download={site.resume.downloadName}
              onClick={() => setOpen(false)}
              className="btn btn-outline w-full"
            >
              Download résumé
              <Icon name="download" className="text-mint" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
