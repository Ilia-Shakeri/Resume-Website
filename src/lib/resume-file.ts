import { statSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";

/** Size of the committed résumé PDF, read at build time (static export). */
export function resumeFileSize(): string | null {
  try {
    const bytes = statSync(path.join(process.cwd(), site.resume.pdfFile)).size;
    return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null;
  }
}
