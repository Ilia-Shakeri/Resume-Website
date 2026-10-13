import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: profile.github.href }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    siteName: profile.name,
    locale: "en_US",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${profile.name} — DevOps Engineer. Built to ship. Built to stay up.` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0e10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-mint focus:px-4 focus:py-3 focus:text-on-mint"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
