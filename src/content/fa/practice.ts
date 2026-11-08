import * as en from "../en/practice";
import type { ToolkitGroup, ToolkitGroupId } from "../types";

// نسخهٔ فارسی src/content/en/practice.ts. نام ابزارها و آیکن‌ها از نسخهٔ
// انگلیسی می‌آیند؛ فقط عنوان گروه‌ها و توضیحات ترجمه شده‌اند.

const groupText: Record<ToolkitGroupId, Pick<ToolkitGroup, "title" | "detail" | "evidence">> = {
  linux: {
    title: "لینوکس و زیرساخت",
    detail: "راه‌اندازی، امن‌سازی و مدیریت پیکربندی با Ansible.",
    evidence: "سرورهای OTICAMP · LinSecGuard",
  },
  containers: {
    title: "کانتینر و ارکستراسیون",
    detail: "سرویس‌های پروداکشن روی Docker Compose، ایمیج‌های امن بدون دسترسی root و چارت‌های Helm.",
    evidence: "نرخبان · دلفین CRM · Stackplore",
  },
  delivery: {
    title: "تحویل و اتوماسیون",
    detail: "پایپ‌لاین‌های GitHub Actions با تست یکپارچگی، تست مرورگر و اسکن ایمیج؛ اتوماسیون با Bash و n8n.",
    evidence: "CI نرخبان · پل‌های ChatOps",
  },
  observability: {
    title: "مانیتورینگ و مشاهده‌پذیری",
    detail: "متریک، قوانین هشدار و لاگ، همراه با ارسال هشدارها به چت تیم.",
    evidence: "OTICAMP · قوانین هشدار نرخبان",
  },
  security: {
    title: "وب، شبکه و امنیت",
    detail: "ریورس‌پراکسی و TLS، دسترسی حداقلی، احراز هویت دومرحله‌ای، اسکن آسیب‌پذیری و بکاپی که با بازیابی تأیید می‌شود.",
    evidence: "دلفین CRM · نرخبان · EasyCert",
  },
  data: {
    title: "داده و پیام‌رسانی",
    detail: "مایگریشن، تاریخچه با TimescaleDB، تفکیک نقش‌های پایگاه داده، lease و کش در Redis و صف خروجی (outbox).",
    evidence: "نرخبان · دلفین CRM",
  },
  languages: {
    title: "زبان‌ها و فریم‌ورک‌ها",
    detail: "API و سرویس با Python (FastAPI، Django) و Go؛ React و Next.js وقتی محصول به فرانت‌اند نیاز دارد.",
    evidence: "نرخبان · دلفین CRM · Stackplore",
  },
  chatops: {
    title: "همکاری و ChatOps",
    detail: "ارسال هشدارهای Prometheus و به‌روزرسانی‌های Jira به چت تیم، و مدیریت سرور چت.",
    evidence: "پل‌های ChatOps · Matrix User Manager",
  },
};

export const toolkit: ToolkitGroup[] = en.toolkit.map((group) => ({ ...group, ...groupText[group.id] }));
