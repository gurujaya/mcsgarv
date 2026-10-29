// Usage: node scripts/import-headshots.mjs <raw-dir> <mapping-file>
// mapping-file lines: "<number> <person-slug>"   e.g. "07 dana-narh"
// Crops each raw/<nn>.jpg to a square around the face area, resizes to 640px,
// writes public/people/<slug>.jpg and sets photo: on that person in people.ts.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [raw, mapFile] = process.argv.slice(2);
if (!raw || !mapFile) {
  console.error("usage: node scripts/import-headshots.mjs <raw-dir> <mapping-file>");
  process.exit(1);
}
let people = readFileSync("src/content/people.ts", "utf8");
let done = 0;
for (const line of readFileSync(mapFile, "utf8").split("\n")) {
  const m = line.trim().match(/^(\d{1,2})\s+([a-z0-9-]+)$/);
  if (!m) continue;
  const src = join(raw, `${m[1].padStart(2, "0")}.jpg`);
  const slug = m[2];
  if (!existsSync(src)) {
    console.warn("missing", src);
    continue;
  }
  if (!people.includes(`slug: "${slug}"`)) {
    console.warn("no such person", slug);
    continue;
  }
  const out = `public/people/${slug}.jpg`;
  // Square crop, slightly above center so the face sits high in a round avatar.
  const [w, h] = execSync(`sips -g pixelWidth -g pixelHeight "${src}"`)
    .toString()
    .match(/\d+/g)
    .slice(-2)
    .map(Number);
  const side = Math.min(w, h);
  const top = Math.max(0, Math.round((h - side) * 0.15));
  const left = Math.round((w - side) / 2);
  execSync(
    `sips -c ${side} ${side} --cropOffset ${top} ${left} "${src}" --out "${out}" >/dev/null`,
  );
  execSync(
    `sips -Z 640 -s format jpeg -s formatOptions 82 "${out}" --out "${out}" >/dev/null`,
  );
  // set or replace photo: on that person
  const re = new RegExp(`(slug: "${slug}",[^}]*?)(\\s*photo: "[^"]*",)?`);
  people = people.replace(re, (all, head, photo) =>
    photo
      ? all.replace(photo, `\n    photo: "/people/${slug}.jpg",`)
      : `${head}\n    photo: "/people/${slug}.jpg",`,
  );
  done++;
  console.log("ok", m[1], slug);
}
writeFileSync("src/content/people.ts", people);
console.log(
  `imported ${done}; run: npx prettier --write src/content/people.ts && npm run build`,
);
