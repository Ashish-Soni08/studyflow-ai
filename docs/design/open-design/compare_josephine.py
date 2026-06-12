from pathlib import Path

from PIL import Image, ImageDraw


root = Path(__file__).resolve().parents[1]
reference = Image.open(
    root / "docs" / "design" / "reference" / "josephines-tagebuch.png"
).convert("RGB")
prototype = Image.open(
    root / "docs" / "design" / "screenshots" / "josephine-home-desktop.png"
).convert("RGB")

height = 1024
reference.thumbnail((720, height))
prototype.thumbnail((720, height))

canvas = Image.new("RGB", (1440, height + 42), "#f4f1eb")
canvas.paste(reference, (0, 42))
canvas.paste(prototype, (720, 42))

draw = ImageDraw.Draw(canvas)
draw.text((18, 13), "REFERENCE", fill="#4b2140")
draw.text((738, 13), "IMPLEMENTATION", fill="#0f5848")

canvas.save(
    root / "docs" / "design" / "screenshots" / "josephine-design-comparison.png",
    optimize=True,
)
