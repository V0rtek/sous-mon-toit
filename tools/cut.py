"""Cut a framed 3x2 pose sheet (flat panels, dark frames, white gutters) into one transparent PNG per pose.

Usage: python -I cut.py <sheet.png> <char_id> [pose1,pose2,...]
Writes chars/<char_id>/<pose>.png. Poses, in sheet order: listen, surprised, thinking, explaining, angry, holding.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
POSES = ["listen", "surprised", "thinking", "explaining", "angry", "holding"]
BG_TOL = 16      # max channel distance to the panel colour
SMOOTH = 3.0     # max local brightness spread (5x5) of a backdrop pixel
ERODE = 3        # cuts the thin "!" strokes touching the head


def disk(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


def panel_interior(rgb, x0, y0, x1, y1):
    """Bounding box of the panel inside an approximate cell: flood the backdrop from a corner inside the frame."""
    cell = rgb[y0:y1, x0:x1]
    seed = cell[30:40, 30:40].reshape(-1, 3).mean(axis=0)
    near = np.abs(cell - seed).max(axis=2) < 14
    lab, _ = ndi.label(near)
    sel = ndi.binary_fill_holes(lab == lab[35, 35])
    ys, xs = np.nonzero(sel)
    return x0 + xs.min() + 3, y0 + ys.min() + 3, x0 + xs.max() - 2, y0 + ys.max() - 2, seed


def bg_mask(rgb, bgc):
    """Backdrop of a flat (possibly tinted) panel + the floor shadow + gaps enclosed by outlines (arm against body)."""
    lum, bl = rgb.mean(axis=2), float(bgc.mean())
    m1, m2 = ndi.uniform_filter(lum, 5), ndi.uniform_filter(lum * lum, 5)
    spread = np.sqrt(np.maximum(m2 - m1 * m1, 0))
    tint = rgb - rgb.mean(axis=2, keepdims=True)          # colour cast, independent of brightness
    btint = bgc - bgc.mean()
    loose = np.abs(rgb - bgc).max(axis=2) < BG_TOL
    near = loose & (spread < SMOOTH)
    ys = np.nonzero((~near).any(axis=1))[0]
    band = np.zeros_like(near)
    band[ys[-1] - int((ys[-1] - ys[0]) * 0.13):] = True   # feet band: only place a shadow can be
    shadow = band & (np.abs(tint - btint).max(axis=2) < 16) & (lum > bl - 80) & (lum < bl + 10)
    cand = near | (shadow & (spread < SMOOTH * 2))
    lab, _ = ndi.label(cand)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    # hard-edged comic shadow: a dark island in the feet band touching the backdrop
    lab, n = ndi.label(cand & band & ~bg & (lum < bl - 30))
    touch = ndi.binary_dilation(bg, structure=disk(5))
    for i in range(1, n + 1):
        sel = lab == i
        if sel.sum() > 40 and (sel & touch).any():
            bg |= sel
    # enclosed gaps (between the legs, arm against body): dead flat or big. Grey shading on a white shirt is small and
    # grainy (measured: gaps spread 0.47-0.69, shirt shading 1.1-1.5)
    lab, n = ndi.label(near & ~bg)
    for i in range(1, n + 1):
        sel = lab == i
        size = sel.sum()
        if size >= 60 and (spread[sel].mean() < 0.9 or size > 2500):
            bg |= sel
    return ndi.binary_dilation(bg, structure=disk(1), iterations=4, mask=loose | shadow)


def person(rgb, bgc):
    fg = ~bg_mask(rgb, bgc)
    core = ndi.binary_erosion(fg, structure=disk(ERODE))
    lab, n = ndi.label(core)
    sizes = ndi.sum(core, lab, range(1, n + 1))
    body = lab == (int(np.argmax(sizes)) + 1)
    body = ndi.binary_dilation(body, structure=disk(ERODE + 1)) & fg
    return ndi.binary_fill_holes(body) & fg


def main():
    sheet, char_id = sys.argv[1:3]
    names = sys.argv[3].split(",") if len(sys.argv) > 3 else POSES
    rgb = np.asarray(Image.open(sheet).convert("RGB")).astype(np.float32)
    H, W = rgb.shape[:2]
    out = ROOT / "chars" / char_id
    out.mkdir(parents=True, exist_ok=True)
    for k, name in enumerate(names):
        c, r = k % 3, k // 3
        bx0, by0, bx1, by1, bgc = panel_interior(rgb, int(c * W / 3), int(r * H / 2), int((c + 1) * W / 3), int((r + 1) * H / 2))
        crop = rgb[by0:by1, bx0:bx1]
        m = person(crop, bgc)
        ys, xs = np.nonzero(m)
        y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        m, crop = m[y0:y1, x0:x1], crop[y0:y1, x0:x1]
        # soft edge, pulled 1px inside so the panel colour does not fringe on the decors
        soft = ndi.gaussian_filter(ndi.binary_erosion(m, iterations=1).astype(np.float32), 0.8)
        alpha = np.clip(soft * 1.15, 0, 1)
        Image.fromarray(np.dstack([crop, alpha * 255]).astype(np.uint8), "RGBA").save(out / f"{name}.png")
        print(f"{char_id:8s} {name:10s} {x1 - x0}x{y1 - y0}")


if __name__ == "__main__":
    main()
