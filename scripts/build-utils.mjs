import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
export async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}
export function localizeHtml(html, locale) {
  return html.replace(/<html\b([^>]*)>/i, (_match, attributes) =>
    `<html${attributes.replace(/\s(?:lang|dir)=["'][^"']*["']/gi, "")} lang="${locale}" dir="${locale === "fa" ? "rtl" : "ltr"}">`);
}
export function secureHtml(html) {
  html = html.replace(/<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi, "");
  const hashes = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(match[1]) && match[2]) hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
  }
  const policy = ["default-src 'self'", `script-src 'self' ${[...hashes].join(" ")}`, "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self' data:", "connect-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'"].join("; ");
  return html.replace(/<head([^>]*)>/i, `<head$1><meta http-equiv="Content-Security-Policy" content="${policy}"/>`);
}
export async function fingerprintAssets(out = "out") {
  const candidates = (await filesIn(out)).filter((file) => {
    const relative = path.relative(out, file).replaceAll(path.sep, "/");
    return relative.startsWith("images/") || relative.startsWith("certificates/") || relative === "og-image.png" || relative === "resume/ilia-shakeri-resume.pdf";
  });
  const replacements = [];
  for (const file of candidates) {
    const relative = path.relative(out, file).replaceAll(path.sep, "/");
    const hash = createHash("sha256").update(await readFile(file)).digest("hex").slice(0, 16);
    const target = path.join(out, "assets", hash, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(file, target);
    replacements.push([`/${relative}`, `/assets/${hash}/${relative}`]);
  }
  return replacements;
}
