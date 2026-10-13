import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="container-site flex min-h-screen flex-col justify-center py-24">
      <p className="eyebrow">404 / Not found</p>
      <h1 className="mt-6 text-5xl lg:text-7xl">This route isn’t deployed.</h1>
      <Link href="/" className="btn btn-outline mt-10 self-start">
        Back to the portfolio
      </Link>
    </main>
  );
}
