import type { Education, ExperienceItem, Profile, Qualification } from "../types";

// نسخهٔ فارسی src/content/en/profile.ts. ادعاها همان‌اند و منبعشان در
// docs/content-evidence.md ثبت شده است. نام ابزارها و فناوری‌ها عمداً لاتین مانده‌اند.

export const profile: Profile = {
  name: "ایلیا شاکری",
  role: "مهندس DevOps",
  headline: ["ساخته‌شده برای تحویل.", "ساخته‌شده برای پایداری."],
  intro:
    "من ایلیا شاکری هستم؛ مهندس DevOps با تمرکز بر لینوکس، کانتینرها، پایپ‌لاین‌های تحویل و مانیتورینگ. سیستم‌هایی می‌سازم که هر بار به یک شکل مستقر شوند و وقتی مشکلی پیش می‌آید، خودشان خبر بدهند.",
  location: "تهران، ایران",
  timeZone: "IRST · UTC+03:30",
  availability: "آمادهٔ همکاری دورکاری در نقش‌های DevOps و پلتفرم",
  email: "iliashkr@gmail.com",
  github: { label: "github.com/Ilia-Shakeri", href: "https://github.com/Ilia-Shakeri" },
  linkedin: { label: "linkedin.com/in/ilia-shakeri", href: "https://www.linkedin.com/in/ilia-shakeri/" },
  focus: "لینوکس · اتوماسیون · پایداری",
  languages: ["فارسی (زبان مادری)", "انگلیسی (سطح حرفه‌ای)"],
  bio: [
    "کار من جایی است که کد به سرور می‌رسد: امن‌سازی سرورهای لینوکس، بسته‌بندی سرویس‌ها در کانتینر، راه‌اندازی پایپ‌لاین‌های CI و قرار دادن Prometheus، Grafana و Loki جلوی هر چیزی که در محیط پروداکشن اجرا می‌شود. ابزارهای روزمره‌ام Bash، Python، Ansible، Docker Compose و n8n هستند.",
    "بر اساس شواهد کار می‌کنم: ران‌بوک می‌نویسم، بازیابی بکاپ را واقعاً تست می‌کنم و آنچه را واقعاً بررسی شده ثبت می‌کنم. بیرون از ترمینال، ابزارهای متن‌باز DevOps را دنبال می‌کنم و بیش از ده سال است که پیانو می‌نوازم.",
  ],
  principles: [
    { title: "تکراری‌ها را خودکار کن.", detail: "اسکریپت، پلی‌بوک و ورک‌فلو به‌جای کارهای دستی." },
    { title: "پایداری را قابل‌دیدن کن.", detail: "هلث‌چک، هشدار و شواهدی که بشود خواند." },
  ],
  contactMessage:
    "دنبال مهندس DevOps‌ای هستید که استقرار، بکاپ و هشدارها را کار مهندسی جدی بداند؟ خوشحال می‌شوم دربارهٔ سیستم‌هایی که اجرا می‌کنید بشنوم.",
};

export const capabilities = ["لینوکس و امن‌سازی", "اتوماسیون تحویل", "پایداری و مشاهده‌پذیری"];

export const experienceSummary: string =
  "از مدیریت عملی سرورهای لینوکس تا مسئولیت تحویل و مانیتورینگ سرویس‌های پروداکشن، و بنیان‌گذاری محصولاتی که از صفر تا صد خودم می‌سازم و اداره می‌کنم.";

export const experience: ExperienceItem[] = [
  {
    title: "مهندس DevOps",
    organization: "OTICAMP",
    location: "تهران، ایران",
    period: "ژوئن ۲۰۲۵ — اکنون",
    scope: "راه‌اندازی، امن‌سازی و مانیتورینگ زیرساخت لینوکسی برای سرویس‌های داخلی و محصولات.",
    highlights: [
      "راه‌اندازی و امن‌سازی سرورهای مجازی لینوکس؛ پلی‌بوک‌های Ansible پیکربندی سرورها را بین محیط توسعه و پروداکشن یکسان نگه می‌دارند.",
      "استقرار استک Prometheus، Grafana و Loki برای متریک‌ها و لاگ‌های سیستم.",
      "ساخت اتوماسیون ChatOps با n8n که هشدارهای Prometheus و رویدادهای Jira را به اتاق‌ها و پیام‌های مستقیم Matrix می‌رساند.",
      "استقرار و نگهداری Keycloak برای ورود متمرکز به سرویس‌های داخلی.",
    ],
    tags: ["Ansible", "مشاهده‌پذیری", "ChatOps", "Keycloak"],
  },
  {
    title: "بنیان‌گذار",
    organization: "نرخبان",
    location: "تهران، ایران",
    period: "۲۰۲۶ — اکنون",
    scope: "بنیان‌گذاری و ساخت پلتفرم زندهٔ قیمت طلا، ارز و رمزارز، و اداره‌کردن آن در محیط پروداکشن.",
    highlights: [
      "ساخت بک‌اند با FastAPI، TimescaleDB و Redis، اپلیکیشن‌های وب و پنل مدیریت با React و اپلیکیشن دسکتاپ با Electron.",
      "اجرای سرویس روی استک Compose پشت Nginx با دو رپلیکای API، هشداردهی Prometheus و گیت‌های CI شامل تست یکپارچگی، تست مرورگر و اسکن ایمیج با Trivy.",
    ],
    tags: ["محصول", "FastAPI", "CI/CD", "Prometheus"],
  },
  {
    title: "هم‌بنیان‌گذار",
    organization: "دلفین (Dolphin CRM)",
    location: "تهران، ایران",
    period: "۲۰۲۶ — اکنون",
    scope: "هم‌بنیان‌گذاری یک CRM/ERP فارسی‌محور و هدایت مهندسی و فرایند تحویل آن.",
    highlights: [
      "ساخت پلتفرم Django/PostgreSQL با ۴۰ ماژول قابل فعال‌سازی که در قالب نسخه‌های تگ‌دار منتشر می‌شود.",
      "طراحی مدل استقرار: استک‌های Compose ایزوله، مانیفست امضاشدهٔ قابلیت‌ها، نقش‌های دیتابیس با حداقل دسترسی، بازگشت (rollback) خودکار و بکاپ‌هایی که با بازیابی واقعی تأیید می‌شوند.",
    ],
    tags: ["محصول", "Django", "Docker Compose", "PostgreSQL"],
  },
  {
    title: "مدیر لینوکس و DevOps (فریلنس)",
    organization: "خوداشتغال",
    location: "دورکاری",
    period: "دسامبر ۲۰۲۴ — ژوئن ۲۰۲۵",
    scope: "اسکریپت‌های اتوماسیون و مدیریت سرور برای مشتریان.",
    highlights: [
      "نوشتن اتوماسیون Bash برای نگهداری روزانه، بکاپ‌گیری و چرخش لاگ‌ها.",
      "ممیزی امنیتی سرورهای مشتریان و پیکربندی قوانین فایروال و گواهی‌های TLS.",
      "بهینه‌سازی پیکربندی Nginx و Apache، از جمله ریورس‌پراکسی و توزیع بار.",
    ],
    tags: ["عملیات لینوکس", "Bash", "Nginx"],
  },
];

export const education: Education = {
  degree: "کارشناسی علوم کامپیوتر",
  status: "در حال تحصیل · از اکتبر ۲۰۲۶",
  note: "یادگیری مبانی علوم کامپیوتر که پشت کارهای زیرساختی روزمره‌ام قرار دارد.",
};

export const qualifications: Qualification[] = [
  {
    title: "DevOps for Intermediates",
    issuer: "آموزشگاه CanDo",
    date: "فوریهٔ ۲۰۲۶",
    note: "دوره از ژوئن ۲۰۲۵ تا ژانویهٔ ۲۰۲۶ گذرانده شد.",
    certId: "04/30289",
    href: "/certificates/cando-devops-intermediates.webp",
  },
  {
    title: "DevOps for Beginners",
    issuer: "آموزشگاه CanDo",
    date: "ژوئیهٔ ۲۰۲۵",
    note: "دوره از ژانویه تا ژوئن ۲۰۲۵ گذرانده شد.",
    certId: "02/20889",
    href: "/certificates/cando-devops-beginners.webp",
  },
  {
    title: "دورهٔ آموزشی LPIC-2",
    issuer: "توسینسو",
    date: "ژوئن ۲۰۲۵",
    note: "دورهٔ مدیریت لینوکس بر اساس سرفصل‌های LPIC-2.",
  },
  {
    title: "دورهٔ آموزشی LPIC-1",
    issuer: "آموزشگاه CanDo",
    date: "ژانویهٔ ۲۰۲۵",
    note: "دورهٔ مدیریت لینوکس بر اساس سرفصل‌های LPIC-1، از اکتبر ۲۰۲۴ تا ژانویهٔ ۲۰۲۵.",
    certId: "03/17758",
    href: "/certificates/cando-lpic-1.webp",
  },
];

export const resumeSummary: string = "";
