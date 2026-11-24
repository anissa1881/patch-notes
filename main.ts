import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "v1.0.3: fixed a bug where Mondays arrived before the weekend had finished installing.";

// The gate requires 1 to 160 characters of UTF-8 text; fail loudly
// rather than writing an entry that could never be judged.
const length = [...ENTRY].length;
if (length < 1 || length > 160) {
  throw new Error(`entry is ${length} characters, must be 1-160`);
}

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  join(dirname(fileURLToPath(import.meta.url)), "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${length} characters)`);
