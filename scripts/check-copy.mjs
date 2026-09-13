#!/usr/bin/env node
// Voice and length gate for content/*.json.
//
// These checks were run by hand after every copy change, which meant they were
// run when someone remembered. They are rules from brand-guidelines.md §2 and
// the people and crew specs, so they belong in the build.
//
// Reads the dictionaries rather than the built HTML: every user-visible string
// lives there, and this way the gate runs without a build.

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["en", "pt-BR", "es-419"];

// design-system.md §2, plus the equivalents in each language. A translation of
// a banned word is still a banned word.
const BANNED = {
  en: ["revolutionary", "seamless", "passionate", "world-class", "leverage", "synergy",
       "unlock", "supercharge", "magic", "effortless", "simply", "just"],
  "pt-BR": ["revolucionário", "revolucionária", "apaixonado", "apaixonada", "sinergia",
            "mágico", "mágica", "sem esforço", "simplesmente", "incrível", "de ponta"],
  "es-419": ["revolucionario", "revolucionaria", "apasionado", "apasionada", "sinergia",
             "mágico", "mágica", "sin esfuerzo", "simplemente", "increíble", "de punta"],
};

// Calques caught in review. Each one was correct word for word and wrong as a
// sentence; they are listed so they do not come back.
const CALQUES = {
  en: [],
  "pt-BR": ["colocadas de propósito", "não há ", "essa é a troca", "entrega em type",
            "contra a sua meta", "é esse o plano"],
  "es-419": ["puestas a propósito", "ese es el intercambio", "entrega en type",
             "contra tu meta", "ese es todo el plan", "nómina"],
};

const ENDORSEMENT = "A Tessarion Labs product";
const PUNCT_ONLY = /^[\W_]+$/u;

/** Words, not tokens — a standalone em dash is punctuation. */
const words = (text) => text.split(/\s+/).filter((t) => t && !PUNCT_ONLY.test(t));

function* strings(value, path = "") {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (const [i, v] of value.entries()) yield* strings(v, `${path}[${i}]`);
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) yield* strings(v, path ? `${path}.${k}` : k);
  }
}

const failures = [];
const fail = (locale, message) => failures.push(`${locale}: ${message}`);

for (const locale of LOCALES) {
  const t = JSON.parse(await readFile(join(root, "content", `${locale}.json`), "utf8"));
  const bioCap = locale === "en" ? 80 : 96;

  for (const [path, text] of strings(t)) {
    // Identifiers and URLs are not prose.
    if (/(\.href$|\.src$|^locale$|^htmlLang$|^dir$|\.id$|^short$)/.test(path)) continue;

    for (const word of BANNED[locale]) {
      if (new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "iu").test(text)) {
        fail(locale, `banned word "${word}" in ${path}`);
      }
    }
    for (const calque of CALQUES[locale]) {
      if (text.toLowerCase().includes(calque)) fail(locale, `calque "${calque}" in ${path}`);
    }
    if (text.includes("!")) fail(locale, `exclamation mark in ${path}`);
    if (/\p{Extended_Pictographic}/u.test(text)) fail(locale, `emoji in ${path}`);
  }

  for (const member of t.people.members) {
    const n = words(member.bio).length;
    if (n > bioCap) fail(locale, `${member.id} bio is ${n} words, cap ${bioCap}`);
  }

  for (const member of t.crew.members) {
    const role = words(member.role).length;
    const line = words(member.bio).length;
    if (role > 12) fail(locale, `${member.id} role is ${role} words, cap 12`);
    if (line > 16) fail(locale, `${member.id} second line is ${line} words, cap 16`);
  }

  // brand-guidelines.md §8: the endorsement is exact, and it is not translated.
  for (const item of t.products.items) {
    if (t.products.endorsement !== ENDORSEMENT) {
      fail(locale, `endorsement is "${t.products.endorsement}", must be "${ENDORSEMENT}" (${item.id})`);
      break;
    }
  }
}

if (failures.length) {
  console.error("Copy gate failed:");
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`Copy gate passed for ${LOCALES.join(", ")}.`);
