import { Icon } from "@/components/Icon";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="container-site">
      <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name} / Designed to keep evolving.
        </p>
        <a href="#top" className="meta inline-flex items-center gap-3 hover:text-ink">
          Back to top
          <Icon name="arrow-up" className="text-mint" />
        </a>
      </div>
    </footer>
  );
}
