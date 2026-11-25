import * as fs from "node:fs";
import * as path from "node:path";

// Setup: the universal reply-all sin, committed while begging to escape.
const SETUP =
  "I hit reply-all to 4,000 people to say 'please take me off this thread.'";
// Payoff: escalation — the would-be escapee ends up owning the thread.
const PAYOFF =
  "By Friday I owned the thread, moderated the thread, and was the only one still required at its weekly meeting.";
const ENTRY = `${SETUP} ${PAYOFF}`;

// Spec: exactly one line (including Unicode line breaks), 1..200 characters.
if (/[\r\n\u0085\u2028\u2029]/.test(ENTRY)) {
  throw new Error("Entry must be a single line");
}
const length = [...ENTRY].length;
if (length < 1 || length > 200) {
  throw new Error(`Entry must be 1..200 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "entry.txt");
fs.writeFileSync(outFile, ENTRY + "\n", "utf8");

// Read back to confirm the file holds exactly the entry plus one newline.
if (fs.readFileSync(outFile, "utf8") !== ENTRY + "\n") {
  throw new Error(`Read-back mismatch in ${outFile}`);
}
