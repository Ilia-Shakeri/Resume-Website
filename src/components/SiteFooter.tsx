import { Icon } from "@/components/Icon";
import type { Content } from "@/content";

export function SiteFooter({ content }: { content: Content }) {
  const { profile, ui } = content;
  return (
    <footer className="container-site">
      <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name} / {ui.footer.tagline}
        </p>
        <a href="#top" className="meta inline-flex items-center gap-3 hover:text-ink">
          {ui.footer.backToTop}
          <Icon name="arrow-up" className="text-mint" />
        </a>
      </div>
    </footer>
  );
}
