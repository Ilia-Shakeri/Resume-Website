import type { UiStrings } from "../en/ui";

// متن‌های رابط کاربری نسخهٔ فارسی. ساختار آن با src/content/en/ui.ts یکی است.

export const ui: UiStrings = {
  meta: {
    title: "ایلیا شاکری — مهندس DevOps و توسعه‌دهندهٔ فول‌استک",
    description:
      "مهندس DevOps و توسعه‌دهندهٔ فول‌استک (بیشتر بک‌اند) در تهران و دانشجوی علوم کامپیوتر. لینوکس، کانتینر، CI/CD، مانیتورینگ، Python و Go. بنیان‌گذار نرخبان و هم‌بنیان‌گذار دلفین.",
    ogLocale: "fa_IR",
  },
  skipLink: "رفتن به محتوا",
  nav: {
    about: "درباره",
    projects: "پروژه‌ها",
    experience: "سوابق",
    contact: "تماس",
    resume: "دانلود رزومه",
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
    primary: "منوی اصلی",
    mobile: "منوی موبایل",
    backToTop: "بازگشت به بالا",
  },
  language: {
    label: "زبان",
    en: "English",
    fa: "فارسی",
  },
  hero: {
    available: "آمادهٔ همکاری دورکاری",
    explore: "مشاهدهٔ پروژه‌ها",
    resume: "دانلود رزومه",
    loopCaption: "تحویل پیوسته / ∞",
    loopTitle: "چرخهٔ DevOps: برنامه‌ریزی، کدنویسی، بیلد، تست، انتشار، استقرار، بهره‌برداری، پایش و بازگشت به برنامه‌ریزی.",
    capabilitiesLabel: "لایهٔ کاری من",
    portraitAlt: "تصویر ایلیا شاکری، خندان، در فضای باز",
    links: "پروفایل‌ها",
  },
  about: {
    eyebrow: "۰۱ / لایهٔ انسانی",
    titleLines: ["سیستمی فکر می‌کنم.", "عاشق ساختنم."],
    labels: { name: "نام", role: "نقش", basedIn: "محل زندگی", focus: "تمرکز", localTime: "ساعت محلی" },
  },
  ventures: {
    eyebrow: "۰۲ / پروژه‌هایی که به آن‌ها افتخار می‌کنم",
    titleLines: ["کارهایی که شروع کردم.", "و هنوز می‌سازم."],
    aside: "بنیان‌گذار نرخبان و هم‌بنیان‌گذار دلفین هستم. هر دو را خودم می‌سازم؛ از اولین کامیت تا نحوهٔ استقرارشان.",
    highlightsLabel: "سهم من",
    stackLabel: "تکنولوژی‌ها",
    statsLabel: "اطلاعات کلیدی",
  },
  builds: {
    eyebrow: "۰۳ / پروژه‌های دیگر",
    titleLines: ["ابزارهایی که", "در مسیر ساختم."],
    aside: "ابزارهای کوچک‌تر اتوماسیون، امنیت و مانیتورینگ از گیت‌هاب من؛ هرکدام با لینک سورس.",
    filterLabel: "فیلتر پروژه‌ها",
    filters: { all: "همه", ops: "اتوماسیون و عملیات", security: "امنیت", monitoring: "مانیتورینگ", apps: "اپلیکیشن" },
    footnote: "// هیچ عدد نمایشی در کار نیست؛ ارقام از مستندات خود هر مخزن آمده‌اند.",
  },
  caseStudy: {
    toggle: "یادداشت‌های مهندسی",
    problem: "مسئله",
    role: "نقش من",
    approach: "رویکرد",
    reliability: "امنیت و پایداری",
    result: "نتیجه",
    technologies: "تکنولوژی‌ها",
  },
  toolkit: {
    eyebrow: "۰۴ / جعبه‌ابزار فنی",
    titleLines: ["ابزار درست،", "برای مسئلهٔ درست."],
    toolsLabel: "ابزار",
    footnote: (count: number) => `// ${count.toLocaleString("fa-IR")} ابزار · آیکن‌ها از Simple Icons (CC0)`,
  },
  experience: {
    eyebrow: "۰۵ / سوابق کاری",
    title: "مسیری برای ساختن سیستم‌های بهتر.",
    note: ["// تاریخ‌ها و نقش‌ها از رزومهٔ من؛", "// جزئیات پروژه‌ها از گیت‌هاب."],
    focusLabel: "حوزه‌های تمرکز",
  },
  approach: {
    eyebrow: "۰۶ / روش کار من",
    title: "در چرخه کار می‌کنم، نه در جزیره.",
    output: "خروجی",
    banner: "پایداری هیچ‌وقت «تمام» نمی‌شود. هر استقرار، هر هشدار و هر تست بازیابی، گام بعدی را بهتر می‌کند.",
    bannerTag: "بازخورد ← پیشرفت",
  },
  education: {
    eyebrow: "۰۷ / تحصیلات و آموزش",
    title: "همیشه در حال یادگیری.",
    educationLabel: "تحصیلات",
    certId: "شناسهٔ گواهی",
    viewCertificate: "مشاهدهٔ گواهی",
  },
  resume: {
    eyebrow: "۰۸ / جمع‌بندی",
    titleLines: ["تصویر کامل،", "در یک سند."],
    body: "سوابق کاری، مهارت‌های فنی، تحصیلات و پروژه‌های منتخب در یک PDF دوصفحه‌ای به زبان انگلیسی، ساخته‌شده از همان محتوای تأییدشدهٔ این سایت.",
    download: "دانلود رزومه (انگلیسی)",
    printable: "نسخهٔ قابل چاپ",
    updated: "به‌روزرسانی",
    previewSections: ["Profile", "Experience", "Selected projects", "Technical skills"],
  },
  contact: {
    eyebrow: "۰۹ / ارتباط",
    titleLines: ["بیایید با هم", "بسازیم."],
  },
  footer: {
    tagline: "طراحی‌شده برای تکامل مداوم.",
    backToTop: "بازگشت به بالا",
  },
  external: "(در زبانهٔ جدید باز می‌شود)",
};
