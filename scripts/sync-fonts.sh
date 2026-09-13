#!/usr/bin/env bash
# Re-copy the latin woff2 subsets out of the @fontsource packages into
# public/fonts/. Run after bumping any @fontsource dependency.
set -euo pipefail
cd "$(dirname "$0")/.."

cp node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2 public/fonts/
cp node_modules/@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff2 public/fonts/
cp node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2 public/fonts/

echo "Fonts synced into public/fonts/."
