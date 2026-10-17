import { Icon } from "@/components/Icon";

type Props = { name: string; email: string; nav: { key: string; label: string; href: string }[]; backToTop: string };

export function SiteFooter({ name, email, nav, backToTop }: Props) {
  return (
    <footer className="container-site">
      <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-x-4 text-sm text-muted">
          <span>
            © {new Date().getFullYear()} {name}
          </span>
          <a href={`mailto:${email}`} dir="ltr" className="inline-flex min-h-11 items-center text-text hover:text-ink">
            {email}
          </a>
        </p>
        <div>
          <ul className="flex flex-wrap items-center gap-x-6 text-sm">
            {nav.map((item) => (
              <li key={item.key}>
                <a href={item.href} className="inline-flex min-h-11 items-center text-text hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#main" className="inline-flex min-h-11 items-center gap-2 text-text hover:text-ink">
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
