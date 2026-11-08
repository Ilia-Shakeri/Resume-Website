import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

test("artifact generators release their preview server when browser launch fails", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "resume-artifact-lifecycle-"));
  t.after(async () => {
    assert.equal(path.dirname(directory), path.resolve(tmpdir()));
    assert.match(path.basename(directory), /^resume-artifact-lifecycle-/);
    await rm(directory, { recursive: true, force: true });
  });
  await mkdir(path.join(directory, "out"));
  await writeFile(path.join(directory, "out/index.html"), '<script type="application/ld+json">{"@type":"Person","name":"Fixture","jobTitle":"Engineer"}</script>');
  for (const [file, name] of [["build-resume-pdf.mjs", "buildResumePdf"], ["build-og-image.mjs", "buildOgImage"]]) {
    const moduleUrl = new URL(file, import.meta.url).href;
    const script = `import { ${name} } from ${JSON.stringify(moduleUrl)}; try { await ${name}(); } catch (error) { console.error(error.message); process.exitCode = 23; }`;
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
      cwd: directory,
      env: { ...process.env, BUILD_BROWSER: "invalid-test-mode" },
      encoding: "utf8",
      timeout: 5000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 23, `${name}: ${result.stderr}`);
    assert.match(result.stderr, /BUILD_BROWSER must be auto or bundled/);
  }
});
