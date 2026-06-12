from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
REFS = ROOT / "references"
OUT = ROOT / "assets"
OUT.mkdir(exist_ok=True)


def crop(source: str, output: str, box: tuple[int, int, int, int]) -> None:
    with Image.open(REFS / source) as image:
        image.crop(box).save(OUT / output, optimize=True)


crop("02-uploads-ocr.png", "handwritten-calendar.png", (652, 220, 1136, 742))
crop("03-study-canvas.png", "lecture-slide-scaffolding.png", (355, 228, 653, 810))
crop("03-study-canvas.png", "handwritten-scaffolding-notes.png", (677, 242, 1103, 811))
crop("05-flashcards.png", "flashcard-source-slide.png", (1135, 216, 1299, 338))
crop("05-flashcards.png", "flashcard-source-notes.png", (1135, 443, 1304, 566))

crop("01-overview.png", "note-code-switching.png", (263, 883, 347, 974))
crop("01-overview.png", "note-motivation.png", (512, 883, 600, 974))
crop("01-overview.png", "note-past-progressive.png", (758, 883, 846, 974))
crop("01-overview.png", "note-authentic-texts.png", (1042, 883, 1130, 974))
