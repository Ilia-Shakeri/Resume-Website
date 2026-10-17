import * as en from "../en/practice";
import type { ApproachStep, ToolkitGroup } from "../types";

// نسخهٔ فارسی src/content/en/practice.ts. نام ابزارها و آیکن‌ها از نسخهٔ
// انگلیسی می‌آیند؛ فقط عنوان گروه‌ها و توضیحات ترجمه شده‌اند.

export const toolkitIntro: string =
  "دسته‌بندی بر اساس کاربرد، نه نمودار سطح مهارت. همهٔ این ابزارها در سوابق کاری یا مخزن‌های گیت‌هاب من دیده می‌شوند.";

const groupText: { title: string; practices: string[] }[] = [
  { title: "لینوکس و زیرساخت", practices: ["راه‌اندازی", "امن‌سازی", "مدیریت پیکربندی"] },
  { title: "کانتینر و ارکستراسیون", practices: ["ایمیج", "استک Compose", "چارت Helm"] },
  { title: "تحویل و اتوماسیون", practices: ["بیلد", "اسکن", "انتشار", "بازگشت نسخه"] },
  { title: "مانیتورینگ و مشاهده‌پذیری", practices: ["متریک", "هشدار", "لاگ"] },
  { title: "وب، شبکه و امنیت", practices: ["ریورس‌پراکسی", "TLS", "مدیریت هویت", "امن‌سازی"] },
  { title: "داده و پیام‌رسانی", practices: ["نقش‌های حداقل دسترسی", "بکاپ", "تست بازیابی"] },
  { title: "زبان‌ها و فریم‌ورک‌ها", practices: ["اسکریپت‌نویسی", "API", "تست"] },
  { title: "همکاری و ChatOps", practices: ["مسیریابی هشدار", "اعلان تیکت", "ران‌بوک"] },
];

export const toolkit: ToolkitGroup[] = en.toolkit.map((group, index) => ({ ...group, ...groupText[index] }));

export const approachIntro: string = "تغییرهای کوچک و قابل بازبینی، عملیات مستند و بازخوردی که به بیلد بعدی می‌رسد.";

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
    practice: "فایل‌های Compose، پلی‌بوک‌های Ansible، وابستگی‌های قفل‌شده با hash و دسترسی‌های صریح دیتابیس.",
    output: "سیستم‌های تکرارپذیر",
  },
  {
    ...en.approach[2],
    title: "تحویل امن",
    description: "در گام‌های کوچک تست، اسکن و منتشر کن؛ همیشه با برنامهٔ بازگشت.",
    practice: "ایمیج از کامیت تگ‌دار، اسکن در CI، استقرار پس از بکاپ و بازگشت با اسکریپت.",
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
