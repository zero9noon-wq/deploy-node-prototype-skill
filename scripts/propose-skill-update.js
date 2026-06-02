#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const learningFiles = [
  "learnings/LEARNINGS.md",
  "learnings/ERRORS.md",
  "learnings/FEATURE_REQUESTS.md"
];

function parseEntries(content, file) {
  const chunks = content.split(/\n(?=## \[[A-Z]+-\d{8}-[A-Z0-9]+\])/g);
  return chunks
    .filter(chunk => /^## \[[A-Z]+-\d{8}-[A-Z0-9]+\]/.test(chunk.trim()))
    .map(chunk => {
      const id = chunk.match(/^## \[([^\]]+)\]/m)?.[1] || "unknown";
      const summary = chunk.match(/### Summary\n([\s\S]*?)(\n### |\n---|$)/)?.[1]?.trim()
        || chunk.match(/### Requested Capability\n([\s\S]*?)(\n### |\n---|$)/)?.[1]?.trim()
        || "(no summary)";
      const patternKey = chunk.match(/Pattern-Key:\s*([^\n]+)/)?.[1]?.trim() || "";
      const recurrence = Number(chunk.match(/Recurrence-Count:\s*(\d+)/)?.[1] || 1);
      const priority = chunk.match(/\*\*Priority\*\*:\s*([^\n]+)/)?.[1]?.trim() || "medium";
      const status = chunk.match(/\*\*Status\*\*:\s*([^\n]+)/)?.[1]?.trim() || "pending";
      return { id, file, summary, patternKey, recurrence, priority, status };
    });
}

const entries = learningFiles.flatMap(relative => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) return [];
  return parseEntries(fs.readFileSync(file, "utf8"), relative);
});

const candidates = entries.filter(entry =>
  entry.status === "pending" &&
  entry.patternKey &&
  (entry.recurrence >= 3 || ["high", "critical"].includes(entry.priority))
);

if (!candidates.length) {
  console.log("No skill-update candidates found. Keep logging learnings until a pattern recurs or becomes high impact.");
  process.exit(0);
}

console.log("# Skill Update Proposal\n");
console.log("Review these candidates before editing SKILL.md:\n");

candidates.forEach(entry => {
  console.log(`## ${entry.id}`);
  console.log(`- Source: ${entry.file}`);
  console.log(`- Pattern-Key: ${entry.patternKey}`);
  console.log(`- Priority: ${entry.priority}`);
  console.log(`- Recurrence-Count: ${entry.recurrence}`);
  console.log(`- Summary: ${entry.summary}`);
  console.log("- Suggested next step: distill this into a concise rule, checklist item, command, or provider note in SKILL.md.\n");
});

console.log("After editing, validate with evals/pressure-scenarios.md and record the accepted change in CHANGELOG.md.");
