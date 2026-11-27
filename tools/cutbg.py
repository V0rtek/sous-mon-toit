"""Cut a 3x2 pose sheet that is already transparent (no backdrop, no frames) into one PNG per pose: each cell is
cropped to what's drawn in it. For a sheet with flat framed panels and a backdrop, use cut.py.

Usage: python -I cutbg.py <sheet.png> <char_id> pose1,pose2,...   (row 1 left to right, then row 2; "_" skips a cell)
Writes chars/<char_id>/<pose>.png.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent


def main():
    sheet, char_id, names = sys.argv[1], sys.argv[2], sys.argv[3].split(",")
    im = Image.open(sheet).convert("RGBA")
    W, H = im.size
    out = ROOT / "chars" / char_id
    out.mkdir(parents=True, exist_ok=True)
    for k, name in enumerate(names):
        if name == "_":
            continue
        c, r = k % 3, k // 3
        cell = im.crop((int(c * W / 3), int(r * H / 2), int((c + 1) * W / 3), int((r + 1) * H / 2)))
        a = np.asarray(cell)[..., 3]
        # the person = the biggest drawn blob (a stray speck of a neighbour cell or of the glow is left out)
        lab, n = ndi.label(a > 24)
        body = lab == (int(np.argmax(ndi.sum(a > 24, lab, range(1, n + 1)))) + 1)
        ys, xs = np.nonzero(body)
        cell.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)).save(out / f"{name}.png")
        print(f"{char_id:8s} {name:10s} {xs.max() - xs.min() + 1}x{ys.max() - ys.min() + 1}")


if __name__ == "__main__":
    main()
