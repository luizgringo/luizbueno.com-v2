#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ ! -x .venv-fonttools/bin/pyftsubset ]]; then
  python3 -m venv .venv-fonttools
  .venv-fonttools/bin/pip install -q fonttools brotli
fi
.venv-fonttools/bin/pyftsubset public/fonts/clacon2.ttf \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F,U+2010-2015,U+2026,U+20AC,U+2122,U+2190-21FF,U+2500-257F,U+2580-259F,U+25A0-25FF" \
  --flavor=woff2 \
  --output-file=public/fonts/clacon2.woff2 \
  --layout-features="*" \
  --glyph-names \
  --symbol-cmap \
  --legacy-cmap \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs
