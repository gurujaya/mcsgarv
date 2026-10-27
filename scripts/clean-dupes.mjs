// Finder/iCloud occasionally drops "name 2.ts" copies into .next/types, which
// then fail the type check with duplicate declarations. Remove them.
import { readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
const dir = ".next/types";
const walk = (d) => {
  let out = [];
  try {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) out = out.concat(walk(p));
      else if (/ \d+\.ts$/.test(f)) out.push(p);
    }
  } catch {}
  return out;
};
for (const f of walk(dir)) {
  rmSync(f, { force: true });
  console.log("removed", f);
}
