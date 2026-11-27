"""Recolor cut poses into new characters: python -I recolor.py [name ...]  (writes the variants below into chars/<id>/).

A rule picks pixels by hue band (degrees), saturation and (optional 6th value) a brightness ceiling, then sets the hue
and scales saturation/brightness. "tint" colours the near-white pixels (hair, white cloth) the way a dye would.
Every pose of the source character is recoloured (the urban guy has his phone and fight poses too).
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

GREEN, BLUE = (140, 182), (182, 222)      # elf: dress + boots / stockings, sleeves bands, eyes
TEAL, FUR = (160, 215), (4, 33)           # feline: clothes / mane, tail, face fur
HAIR = (8, 42)                            # urban guy: brown hair, kept off the (brighter) skin by the ceiling
WINE_LO, WINE_HI = (330, 360), (0, 14)    # tv head: burgundy sweater

VARIANTS = {
    "melissa": ("ruby", [(GREEN, 0.25, 352, 1.05, 0.95), (BLUE, 0.15, 338, 0.9, 1.0)], (345, 0.20, 1.0)),
    "isa_nuit": ("ruby", [(GREEN, 0.25, 272, 0.85, 0.7), (BLUE, 0.15, 282, 0.6, 1.0)], (0, 0.0, 0.30)),
    "isa_or": ("ruby", [(GREEN, 0.25, 43, 1.0, 1.15), (BLUE, 0.15, 40, 0.3, 1.05)], (40, 0.42, 0.97)),
    "isa_noir": ("ruby", [(GREEN, 0.25, 0, 0.15, 0.32), (BLUE, 0.15, 0, 0.08, 1.08)], (14, 0.58, 0.82)),
    "amare": ("candy", [(TEAL, 0.25, 284, 0.85, 0.9), (FUR, 0.42, 22, 0.55, 0.42)], None),
    # the bar's 2nd guy (stand-in until his own sheet): navy tank top (its white is cream, so the dye works on a band of
    # rows, torso only, instead of skipping the warm whites), lighter hair
    "justin_b": ("justin", [(HAIR, 0.3, 32, 0.8, 1.9, 0.42)], (222, 0.55, 0.36, (0.13, 0.6))),
    # the stranger in the bathroom (stand-in until a suit sheet): black sweater
    "james_noir": ("james", [(WINE_LO, 0.3, 0, 0.1, 0.3), (WINE_HI, 0.3, 0, 0.1, 0.3)], None),
    # Last call, the house (stand-in until her sheet): Diane = the silver-haired elf in a black dress
    "diane": ("ruby", [(GREEN, 0.25, 0, 0.12, 0.28), (BLUE, 0.15, 0, 0.06, 0.95)], None),
}


def rgb_to_hsv(rgb):
    mx, mn = rgb.max(axis=2), rgb.min(axis=2)
    d = mx - mn
    h = np.zeros_like(mx)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    nz = d > 1e-6
    i = nz & (mx == r)
    h[i] = ((g - b)[i] / d[i]) % 6
    i = nz & (mx == g) & (mx != r)
    h[i] = (b - r)[i] / d[i] + 2
    i = nz & (mx == b) & (mx != r) & (mx != g)
    h[i] = (r - g)[i] / d[i] + 4
    return h * 60, np.where(mx > 0, d / np.maximum(mx, 1e-6), 0), mx


def hsv_to_rgb(h, s, v):
    c = v * s
    hp = (h % 360) / 60
    x = c * (1 - np.abs(hp % 2 - 1))
    z = np.zeros_like(h)
    k = np.floor(hp).astype(int) % 6
    lut = [(c, x, z), (x, c, z), (z, c, x), (z, x, c), (x, z, c), (c, z, x)]
    out = np.zeros(h.shape + (3,))
    for j, (r, g, b) in enumerate(lut):
        sel = k == j
        out[sel] = np.stack([r[sel], g[sel], b[sel]], axis=-1)
    return out + (v - c)[..., None]


def recolor(im, rules, tint):
    a = np.asarray(im).astype(np.float64) / 255
    h, s, v = rgb_to_hsv(a[..., :3])
    h2, s2, v2 = h.copy(), s.copy(), v.copy()
    for (lo, hi), smin, hue, ks, kv, *vmax in rules:
        sel = (h >= lo) & (h < hi) & (s > smin) & (v > 0.12) & (v < (vmax[0] if vmax else 1.01))
        h2[sel], s2[sel], v2[sel] = hue, np.clip(s[sel] * ks, 0, 1), np.clip(v[sel] * kv, 0, 1)
    if tint:
        hue, sat, kv, *band = tint
        if band:                                            # only these rows (share of the height), warm whites too
            rows = np.arange(a.shape[0])[:, None] / a.shape[0]
            sel = (s < 0.16) & (v > 0.45) & (rows >= band[0][0]) & (rows < band[0][1])
        else:
            warm = ((h < 50) | (h > 330)) & (s > 0.035)    # the elf's pale skin is near-white too, but warm
            sel = (s < 0.12) & (v > 0.45) & ~warm
        w = np.clip((v[sel] - 0.45) / 0.25, 0, 1)          # fade in above the shading greys, keep the ink
        h2[sel], s2[sel] = hue, np.maximum(s[sel], sat * w)
        v2[sel] = v[sel] * (1 - w * (1 - kv))
    out = np.dstack([hsv_to_rgb(h2, s2, v2), a[..., 3]])
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8), "RGBA")


def main(only=()):
    for name, (src, rules, tint) in VARIANTS.items():
        if only and name not in only:
            continue
        (ROOT / "chars" / name).mkdir(parents=True, exist_ok=True)
        for f in sorted((ROOT / "chars" / src).glob("*.png")):
            recolor(Image.open(f).convert("RGBA"), rules, tint).save(ROOT / "chars" / name / f.name)
        print("->", name)


if __name__ == "__main__":
    import sys
    main(sys.argv[1:])   # python -I recolor.py justin_b = that variant only
