import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import "@fontsource-variable/vazirmatn/index.css";
import { getContent } from "@/content";
import { site } from "@/lib/site";

const { profile } = getContent("en");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: profile.github.href }],
  creator: profile.name,
  icons: { icon: "/favicon.svg" },
};

// Runs before first paint: enables the animated versions of live elements
// (html.js) and gives the Persian page the right document language/direction.
const bootScript = `(function(d){d.classList.add('js');if(location.pathname.indexOf('/fa')===0){d.lang='fa';d.dir='rtl'}})(document.documentElement)`;

export const viewport: Viewport = {
  themeColor: "#0b0e10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
