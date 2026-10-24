#!/usr/bin/env bash
# Screenshot a design with system Chromium and print its console errors.
# Usage: scripts/shot.sh <slug> [width=1440] [height=900] [out=.shots/<slug>-<w>x<h>.png]
# shortcut: viewport-sized capture only (no full-page); pass a tall height to see the whole section.
set -euo pipefail
slug="$1"; w="${2:-1440}"; h="${3:-900}"
root="$(cd "$(dirname "$0")/.." && pwd)"
file="$root/designs/$slug/index.html"
[ -f "$file" ] || { echo "missing $file" >&2; exit 1; }
out="${4:-$root/.shots/$slug-${w}x${h}.png}"
mkdir -p "$(dirname "$out")"
# Headless Chromium clamps --window-size to a 500px minimum width, so narrower shots go through CDP emulation.
if [ "$w" -lt 500 ]; then
  exec node --input-type=module -e "
    import { launch } from '$root/scripts/lib/cdp.mjs';
    const p = await launch({ width: $w, height: $h });
    try { await p.goto('file://$file', 15000); await p.waitFor(5000); await p.screenshot('$out');
      p.errors.forEach(e => console.log('CONSOLE ERROR: ' + e.text)); console.log('screenshot: $out'); } finally { await p.close(); }"
fi
profile="$(mktemp -d)"; trap 'rm -rf "$profile"' EXIT
chromium --headless=new --disable-gpu --hide-scrollbars --no-first-run \
  --user-data-dir="$profile" --window-size="$w,$h" --virtual-time-budget=5000 \
  --enable-logging=stderr --v=0 \
  --screenshot="$out" "file://$file" 2>"$profile/log" >/dev/null || true
grep -E 'CONSOLE|Uncaught|ERROR:.*(console|javascript)' "$profile/log" | grep -vi 'gpu\|dbus\|vaapi\|sandbox' || true
[ -f "$out" ] && echo "screenshot: $out" || { echo "screenshot failed" >&2; exit 1; }
