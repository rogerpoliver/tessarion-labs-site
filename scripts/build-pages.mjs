#!/usr/bin/env node
// Render content/*.json into the three HTML entry points Vite builds.
//
// These files are generated, not authored — they are listed in .gitignore, and
// `bun run pages` (which `dev` and `build` both run first) recreates them. Edit
// content/*.json for copy and scripts/template.mjs for structure.

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { render } from "./template.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// English is first, which makes it the x-default and the root document.
const LOCALES = ["en", "pt-BR", "es-419"];

const dictionaries = await Promise.all(
  LOCALES.map(async (locale) =>
    JSON.parse(await readFile(join(root, "content", `${locale}.json`), "utf8")),
  ),
);

// A key that exists in one dictionary and not another would ship an English
// string on a Portuguese page, and nothing downstream would notice. Fail here.
function shape(value, path = "") {
  if (Array.isArray(value)) return value.flatMap((item, i) => shape(item, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => shape(child, path ? `${path}.${key}` : key));
  }
  return [path];
}

const [reference, ...others] = dictionaries;
const expected = new Set(shape(reference));

for (const dictionary of others) {
  const actual = new Set(shape(dictionary));
  const missing = [...expected].filter((key) => !actual.has(key));
  const extra = [...actual].filter((key) => !expected.has(key));

  if (missing.length || extra.length) {
    console.error(`${dictionary.locale} does not match ${reference.locale}:`);
    for (const key of missing) console.error(`  missing  ${key}`);
    for (const key of extra) console.error(`  unexpected  ${key}`);
    process.exit(1);
  }
}

for (const dictionary of dictionaries) {
  const target = dictionary.dir
    ? join(root, dictionary.dir, "index.html")
    : join(root, "index.html");

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, render(dictionary, dictionaries), "utf8");
  console.log(`Rendered ${dictionary.locale} -> ${target.slice(root.length + 1)}`);
}
