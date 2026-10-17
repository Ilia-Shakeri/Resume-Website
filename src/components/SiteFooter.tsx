import { Icon } from "@/components/Icon";

type Props = { name: string; nav: { key: string; label: string; href: string }[]; backToTop: string };

export function SiteFooter({ name, nav, backToTop }: Props) {
  return (
    <footer className="container-site">
      <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {name}
        </p>
        <div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.key}>
                <a href={item.href} className="text-text hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#main" className="inline-flex items-center gap-2 text-text hover:text-ink">
                {backToTop}
                <Icon name="arrow-up" size={16} className="text-mint" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
