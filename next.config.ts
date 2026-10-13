import type { NextConfig } from "next";

// Fully static export: the site is plain HTML/CSS/JS in `out/` and can be
// served by Vercel, any static host, or Nginx without a Node.js runtime.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
