import { readFileSync } from "node:fs";
import path from "node:path";

/** Final export resolves asset URLs before rendering the page-data stream. */
const manifest: Record<string, string> = process.env.STATIC_ASSET_MANIFEST === "1"
  ? JSON.parse(readFileSync(path.join(process.cwd(), ".generated/asset-map.json"), "utf8"))
  : {};

for (const [original, versioned] of Object.entries(manifest)) {
  if (!original.startsWith("/") || typeof versioned !== "string" || !/^\/assets\/[a-f\d]{16}\//.test(versioned)) {
    throw new Error("Invalid static asset manifest");
  }
}

export function assetPath(original: string): string {
  return Object.hasOwn(manifest, original) ? manifest[original] : original;
}

/** Resolve only exact asset paths; prose, route links, and external URLs stay intact. */
export function withAssetPaths<T>(value: T): T {
  if (typeof value === "string") return assetPath(value) as T;
  if (Array.isArray(value)) return value.map((entry) => withAssetPaths(entry)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, withAssetPaths(entry)])) as T;
  }
  return value;
}
