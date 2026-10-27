/**
 * Emits public/search-index.json from the typed content modules.
 * Runs automatically on `prebuild`; run manually with `npm run search-index`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildSearchIndex } from "../src/lib/search";

const out = resolve(process.cwd(), "public/search-index.json");
mkdirSync(resolve(process.cwd(), "public"), { recursive: true });
const index = buildSearchIndex();
writeFileSync(out, JSON.stringify(index));
console.log(`search-index: wrote ${index.length} items → ${out}`);
