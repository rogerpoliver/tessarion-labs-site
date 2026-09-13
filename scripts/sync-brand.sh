#!/usr/bin/env bash
# Re-copy the vendored brand assets from the Tessarion Labs brand repository.
#
# The brand repo is the source of truth for tokens and marks. Nothing under
# src/styles/tokens.css or public/brand/ is ever edited here — change it there,
# then run this. BRAND_REPO defaults to a sibling checkout.
set -euo pipefail
cd "$(dirname "$0")/.."

BRAND_REPO="${BRAND_REPO:-../../branding}"

if [ ! -d "$BRAND_REPO/docs/logo" ]; then
  echo "Brand repo not found at $BRAND_REPO. Set BRAND_REPO and retry." >&2
  exit 1
fi

cp "$BRAND_REPO/tokens.css" src/styles/tokens.css
cp "$BRAND_REPO"/docs/logo/*.svg public/brand/logo/

for product in taimu mascada; do
  mkdir -p "public/brand/$product"
  cp "$BRAND_REPO/products/$product/logo/symbol.svg" "public/brand/$product/"
  cp "$BRAND_REPO/products/$product/logo/lockup-horizontal.svg" "public/brand/$product/"
  cp "$BRAND_REPO/products/$product/logo/lockup-horizontal-inverted.svg" "public/brand/$product/"
done

echo "Brand assets synced from $BRAND_REPO."
