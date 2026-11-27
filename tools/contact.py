"""Contact sheet of the cut poses over a magenta backdrop, to eyeball the masks. python -I contact.py <out.png> <char>..."""
import sys
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent
POSES = ["listen", "surprised", "thinking", "explaining", "angry", "holding"]
out, chars = sys.argv[1], sys.argv[2:]
cw, ch = 220, 520
sheet = Image.new("RGB", (cw * 6, ch * len(chars)), (200, 40, 160))
for r, c in enumerate(chars):
    for k, p in enumerate(POSES):
        im = Image.open(ROOT / "chars" / c / f"{p}.png")
        im.thumbnail((cw - 10, ch - 10))
        sheet.paste(im, (k * cw + 5, r * ch + 5), im)
sheet.save(out)
