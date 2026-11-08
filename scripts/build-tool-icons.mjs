import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as simpleIcons from "simple-icons";
import ts from "typescript";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));

// The same LinkedIn mark used before the shared sprite was introduced.
const localPaths = {
  siLinkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(location);
    return entry.isFile() && /\.tsx?$/.test(entry.name) ? [location] : [];
  }));
  return files.flat().sort();
}

function collectBrands(source, file, brands) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const visit = (node) => {
    if (ts.isPropertyAssignment(node)) {
      const name = ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : null;
      if (name === "brand" && ts.isStringLiteral(node.initializer)) brands.add(node.initializer.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
}

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Build one deterministic sprite containing the marks referenced by the site. */
export async function generateToolIcons({ root = repositoryRoot } = {}) {
  const brands = new Set();
  // Contact links contain literal marks too, so scan components as well as copy.
  for (const directory of ["src/content", "src/components"]) {
    for (const file of await sourceFiles(path.join(root, directory))) collectBrands(await readFile(file, "utf8"), file, brands);
  }

  const missingBrands = [];
  const symbols = [];
  for (const brand of [...brands].sort()) {
    const vector = localPaths[brand] ?? simpleIcons[brand]?.path;
    if (!vector) {
      // Unknown marks keep the component's existing neutral fallback.
      missingBrands.push(brand);
      continue;
    }
    if (!/^si[A-Za-z\d]+$/.test(brand)) throw new Error(`Invalid brand symbol: ${brand}`);
    symbols.push(`<symbol id="${brand}" viewBox="0 0 24 24"><path d="${escapeXml(vector)}"/></symbol>`);
  }
  const content = `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join("\n")}\n</svg>\n`;
  const file = path.join(root, "public/images/tool-icons.svg");
  let previous = null;
  try {
    previous = await readFile(file, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const changed = previous !== content;
  if (changed) {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);
  }
  return { file, count: symbols.length, missingBrands, changed };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const result = await generateToolIcons();
  console.log(`Brand sprite: ${result.count} marks; ${result.changed ? "updated" : "unchanged"}`);
  if (result.missingBrands.length) console.warn(`Neutral fallback: ${result.missingBrands.join(", ")}`);
}
