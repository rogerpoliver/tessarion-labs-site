#!/usr/bin/env bash
# Screenshot each locale's share card at 1200x630 into public/brand/.
# Needs the Vite dev server running (bun run dev) and agent-browser installed.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-5173}"
node scripts/build-share-cards.mjs

agent-browser set viewport 1200 630
for locale in en pt-BR es-419; do
  agent-browser open "http://localhost:${PORT}/scripts/share/${locale}.html"
  sleep 1
  agent-browser screenshot "$(pwd)/public/brand/share-${locale}.png"
done

echo "Share images written to public/brand/."
