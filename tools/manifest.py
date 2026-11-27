"""Write chars.js: every chars/<id>/<pose>.png with its size, for the player. python -I manifest.py"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
sprites = {}
for d in sorted(p for p in (ROOT / "chars").iterdir() if p.is_dir()):
    poses = {f.stem: list(Image.open(f).size) for f in sorted(d.glob("*.png"))}
    sprites[d.name] = {"refH": max(h for _, h in poses.values()), "poses": poses}
(ROOT / "chars.js").write_text("window.SPRITES = " + json.dumps(sprites, separators=(",", ":")) + ";\n", encoding="utf-8")
print(len(sprites), "sprites ->", ", ".join(sprites))
