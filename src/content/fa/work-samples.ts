import * as en from "../en/work-samples";
import type { WorkSample } from "../types";

const NERKHBAAN_SOURCE = "https://github.com/Ilia-Shakeri/Nerkhbaan/blob/025ccbbb236f8c947eef6b0a822cda952033c00b";
const VERIFIED_RUN = "https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38236359607";

const copy: Record<WorkSample["id"], Omit<WorkSample, "id">> = {
  cicd: {
    title: "CI/CD: بیلد، تست و امنیت",
    kind: "CI/CD",
    evidenceLabel: "CI پروژهٔ عمومی",
    intro: "در پروژهٔ نرخبان، هر ۱۵ جاب GitHub Actions در پنج گروه بررسی، در اجرای ۱۲ اکتبر ۲۰۲۶ موفق بودند.",
    sections: [
      {
        heading: "بررسی‌های اجرای پیوندشده",
        items: [
          "بیلد وب، پنل و دسکتاپ و قراردادهای API؛ تست‌های Python و Go.",
          "بررسی PostgreSQL/TimescaleDB و Redis، تکرار مایگریشن و تمرین بازیابی ایزوله.",
          "تست مرورگر و پیکربندی استقرار؛ بررسی وابستگی‌ها و secretها و اسکن هفت ایمیج با Trivy.",
        ],
      },
    ],
    links: [
      { label: "گردش‌کار در نسخهٔ مشخص سورس", href: `${NERKHBAAN_SOURCE}/.github/workflows/ci.yml` },
      { label: "اجرای موفق · ۱۵ از ۱۵ جاب", href: VERIFIED_RUN },
    ],
  },
  ansible: {
    title: "پیکربندی و اصلاح تغییرات با Ansible",
    kind: "آزمایش Ansible",
    evidenceLabel: "آزمایش محلی Ansible · آزموده‌شده",
    intro: "پیکربندی فقط‌فایلی در پوشهٔ موقت خصوصی؛ فایل systemd آن نصب یا اجرا نمی‌شود.",
    sections: [
      {
        heading: "نتیجهٔ آزمون",
        items: [
          "تغییر وظیفه‌ها: اجرای اول ۳، تکرار صفر، تشخیص تغییر ۱، اصلاح ۱ و بررسی نهایی صفر.",
          "هر چهار تست محافظ مسیر، بررسی محتوا و مجوزها و تأیید آفلاین واحد موفق بودند؛ check تغییر را دست‌نخورده گذاشت.",
        ],
      },
    ],
    links: [
      { label: "راهنمای آزمایش", href: "/work-samples/ansible-baseline/README.md" },
      { label: "دانلود ZIP آزمایش", href: "/work-samples/ansible-baseline.zip" },
      { label: "پلی‌بوک", href: "/work-samples/ansible-baseline/playbook.yml" },
      { label: "سورس اسکریپت بررسی", href: "/work-samples/ansible-baseline/verify.py" },
      { label: "اجراهای بررسی نمونه", href: "https://github.com/Ilia-Shakeri/Resume-Website/actions/workflows/ci.yml" },
    ],
  },
  restore: {
    title: "بازیابی VPS حذف‌شده",
    kind: "بازیابی بکاپ",
    evidenceLabel: "بازیابی واقعی · روایت دست‌اول",
    intro: "پس از حذف غیرمنتظرهٔ VPS اصلی OTICAMP توسط شرکت میزبان، سرویس‌های آن را از بکاپ بازیابی کردم.",
    sections: [
      {
        heading: "تمرین عمومیِ مرتبط",
        items: [
          "در یک تمرین جداگانهٔ CI نرخبان، نتیجهٔ بازیابی با hash چهار جدول و متادیتای TimescaleDB بررسی می‌شود.",
        ],
      },
    ],
    links: [
      { label: "تمرین بازیابی پروژهٔ عمومی", href: `${NERKHBAAN_SOURCE}/scripts/ci-restore-drill.sh` },
      { label: "اجرای موفق CI روی همان سورس", href: VERIFIED_RUN },
    ],
  },
};

export const workSamples: WorkSample[] = en.workSamples.map((sample) => ({ id: sample.id, ...copy[sample.id] }));
