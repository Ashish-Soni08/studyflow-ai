from pathlib import Path
import re

root = Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "styles.css").read_text(encoding="utf-8")

checks = []

def add(name, passed, detail):
    checks.append((name, passed, detail))

add("viewport", 'name="viewport"' in html and "initial-scale=1" in html, "viewport meta should allow responsive scaling")
add("skip_link", "skip-link" in html, "keyboard users should be able to skip navigation")
add("focus_visible", ":focus-visible" in css, "visible focus rings should be present")
add("reduced_motion", "prefers-reduced-motion" in css, "motion should respect reduced motion")
add("visited_links", "a:visited" in css, "visited links should remain distinguishable")
add("no_horizontal_body", "overflow-x: hidden" in css, "body should avoid horizontal drift")
add("touch_action", "touch-action: manipulation" in css, "tap delay should be minimized")
add("aria_labels", html.count("aria-label") >= 6, "icon-only/profile controls need labels")
add("mobile_breakpoint", "@media (max-width: 820px)" in css, "small-screen layout rules should exist")
add("button_feedback", ":active" in css, "tap/press states should feel responsive")

small_fonts = [float(x) for x in re.findall(r"font-size:\s*([0-9.]+)px", css) if float(x) < 11]
add("tiny_text", not small_fonts, f"avoid unreadable text smaller than 11px; found {small_fonts}")

css_without_root = re.sub(r":root\s*\{.*?\}\s*", "", css, flags=re.S)
raw_hex_count = len(re.findall(r"#[0-9a-fA-F]{3,8}", css_without_root))
add("semantic_color_bias", raw_hex_count <= 35, f"prefer semantic CSS tokens outside :root; raw hex count is {raw_hex_count}")

failed = [item for item in checks if not item[1]]
for name, passed, detail in checks:
    print(f"{'PASS' if passed else 'FAIL'} {name}: {detail}")

raise SystemExit(1 if failed else 0)
