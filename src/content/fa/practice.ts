import * as en from "../en/practice";
import type { ApproachStep, Expertise, ToolkitGroup } from "../types";

// نسخهٔ فارسی src/content/en/practice.ts. نام ابزارها و آیکن‌ها از نسخهٔ
// انگلیسی می‌آیند؛ فقط عنوان گروه‌ها و توضیحات ترجمه شده‌اند.

const groupText: { title: string; practices: string[] }[] = [
  { title: "لینوکس و زیرساخت", practices: ["راه‌اندازی", "امن‌سازی", "مدیریت پیکربندی"] },
  { title: "کانتینر و ارکستراسیون", practices: ["ایمیج", "مجموعه سرویس‌های Compose", "چارت Helm"] },
  { title: "تحویل و اتوماسیون", practices: ["بیلد", "اسکن", "انتشار", "بازگشت نسخه"] },
  { title: "مانیتورینگ و مشاهده‌پذیری", practices: ["متریک", "هشدار", "لاگ"] },
  { title: "وب، شبکه و امنیت", practices: ["ریورس‌پراکسی", "TLS", "مدیریت هویت", "امن‌سازی"] },
  { title: "داده و پیام‌رسانی", practices: ["نقش‌های حداقل دسترسی", "بکاپ", "تست بازیابی"] },
  { title: "زبان‌ها و فریم‌ورک‌ها", practices: ["اسکریپت‌نویسی", "API", "تست"] },
  { title: "همکاری و ChatOps", practices: ["مسیریابی هشدار", "اعلان تیکت", "ران‌بوک"] },
];

export const expertise: Expertise[] = [
  { title: "سیستم‌های لینوکسی", detail: "راه‌اندازی، امن‌سازی و مدیریت پیکربندی با Ansible.", evidence: "سرورهای OTICAMP · LinSecGuard" },
  { title: "توسعهٔ بک‌اند", detail: "API و سرویس با Python (FastAPI، Django) و Go.", evidence: "نرخبان · دلفین CRM · Stackplore" },
  { title: "کانتینر", detail: "سرویس‌های پروداکشن روی Docker Compose، ایمیج‌های امن بدون دسترسی root، و Helm.", evidence: "نرخبان · دلفین CRM · Stackplore" },
  { title: "CI/CD و اتوماسیون", detail: "پایپ‌لاین‌های GitHub Actions با تست یکپارچگی، تست مرورگر و اسکن ایمیج؛ اتوماسیون با Bash و n8n.", evidence: "نرخبان (۱۵ جاب CI) · پل‌های ChatOps" },
  { title: "PostgreSQL و Redis", detail: "مایگریشن، تاریخچه با TimescaleDB، تفکیک نقش‌ها، lease، کش و صف خروجی (outbox).", evidence: "نرخبان · دلفین CRM" },
  { title: "مانیتورینگ و مشاهده‌پذیری", detail: "Prometheus، Alertmanager، Grafana و Loki؛ قوانین هشدار و ارسال آن به چت.", evidence: "OTICAMP · قوانین هشدار نرخبان" },
  { title: "امنیت و بازیابی", detail: "دسترسی حداقلی، TLS، احراز هویت دومرحله‌ای، اسکن آسیب‌پذیری و بکاپی که با بازیابی تأیید می‌شود.", evidence: "دلفین CRM · نرخبان · EasyCert" },
];

export const toolkit: ToolkitGroup[] = en.toolkit.map((group, index) => ({ ...group, ...groupText[index] }));

export const approach: ApproachStep[] = [
  {
    ...en.approach[0],
    title: "درک",
    description: "سیستم، محدودیت‌هایش و هزینهٔ خرابی را نقشه‌برداری کن.",
    practice: "اول قرارداد را بنویس: قوانین کسب‌وکار دلفین در یک سند مشخصات بک‌اند ثبت است، نه در حافظه.",
    output: "یک خط مبنای روشن",
  },
  {
    ...en.approach[1],
    title: "کدنویسی زیرساخت",
    description: "زیرساخت، دسترسی‌ها و سیاست‌ها را به کد نسخه‌دار و قابل بازبینی تبدیل کن.",
    practice: "فایل‌های Compose، پلی‌بوک‌های Ansible، وابستگی‌های قفل‌شده با hash و دسترسی‌های صریح پایگاه داده.",
    output: "سیستم‌های تکرارپذیر",
  },
  {
    ...en.approach[2],
    title: "تحویل امن",
    description: "در گام‌های کوچک تست، اسکن و منتشر کن؛ همیشه با برنامهٔ بازگشت.",
    practice: "ایمیج از کامیت برچسب‌گذاری‌شده، اسکن در CI، استقرار پس از بکاپ و بازگشت نسخه با اسکریپت.",
    output: "تحویل با اطمینان",
  },
  {
    ...en.approach[3],
    title: "پایش و بهبود",
    description: "سلامت سرویس را بسنج، از حادثه‌ها یاد بگیر و کارهای تکراری را کم کن.",
    practice: "بررسی readiness، هشدارهای Prometheus در چت و تست بازیابی روی بکاپ‌های واقعی.",
    output: "بهبود مستمر",
  },
];
