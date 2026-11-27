"""chars/<id>/<pose>.png -> .webp next to it (what the player loads; ~5x lighter for phones),
and the pose sheets source/<sheet>.png -> ref/<sheet>.webp (shown in the menu's character gallery). python -I webp.py"""
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent
jobs = [(p, p.with_suffix(".webp"), 88) for p in sorted((ROOT / "chars").glob("*/*.png"))]
jobs += [(p, ROOT / "ref" / (p.stem + ".webp"), 80) for p in sorted((ROOT / "source").glob("*.png"))]
for src, dst, q in jobs:
    if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        continue
    dst.parent.mkdir(exist_ok=True)
    Image.open(src).save(dst, "WEBP", quality=q, method=6)
print("done")
