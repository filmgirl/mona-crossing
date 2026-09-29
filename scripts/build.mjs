import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const item of ["index.html", "styles.css", "src", "assets"]) {
  await cp(new URL(`../${item}`, import.meta.url), new URL(item, dist), { recursive: true });
}
await writeFile(new URL(".nojekyll", dist), "");
console.log("Static game staged in dist/ (HTML, CSS, modules and assets only).");
