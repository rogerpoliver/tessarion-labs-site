#!/usr/bin/env bash
# Render scripts/share-card.html at 1200x630 into public/brand/share.png.
# Needs the Vite dev server running (bun run dev) and agent-browser installed.
set -euo pipefail
cd "$(dirname "$0")/.."

URL="${1:-http://localhost:5173/scripts/share-card.html}"

agent-browser set viewport 1200 630
agent-browser open "$URL"
sleep 1
agent-browser screenshot "$(pwd)/public/brand/share.png"

echo "Share image written to public/brand/share.png."
