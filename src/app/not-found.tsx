import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="container-site flex min-h-screen flex-col justify-center py-24">
      <p className="eyebrow" dir="ltr">404 / Not found</p>
      <h1 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
        <span lang="en" dir="ltr" className="block">Page not found.</span>
        <span lang="fa" dir="rtl" className="locale-fa mt-4 block text-start">این صفحه پیدا نشد.</span>
      </h1>
      <p lang="en" dir="ltr" className="mt-6 text-text">The link may have changed. Choose your language to return home.</p>
      <p lang="fa" dir="rtl" className="locale-fa mt-2 text-text">ممکن است نشانی تغییر کرده باشد. با انتخاب زبان به خانه برگردید.</p>
      <nav aria-label="Return to portfolio / بازگشت به سایت" className="mt-10 flex flex-wrap gap-3">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- reload the static document with its exported language */}
        <a href="/" lang="en" dir="ltr" className="btn btn-outline">Back to portfolio</a>
        <a href="/fa/" lang="fa" dir="rtl" className="btn btn-outline locale-fa">بازگشت به سایت فارسی</a>
      </nav>
    </main>
  );
}
