"""Placeholder decors (flat vector, 1920x1080): python -I bgs.py -> bg/terrasse.svg, bg/maison.svg, bg/salon.svg.
A real image dropped as bg/<name>.jpg or .png wins over the .svg (the player tries jpg, png, then svg).
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "bg"
W, H = 1920, 1080


def svg(body, defs=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
            f'<defs>{defs}</defs>{body}</svg>\n')


def rect(x, y, w, h, fill, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {extra}/>'


def windows(x0, y0, cols, rows, w, h, gx, gy, glass, frame, lit=None):
    out = []
    for r in range(rows):
        for c in range(cols):
            x, y = x0 + c * (w + gx), y0 + r * (h + gy)
            g = lit if lit and (r * 7 + c * 3) % 5 == 0 else glass
            out.append(rect(x - 6, y - 6, w + 12, h + 12, frame) + rect(x, y, w, h, g)
                       + rect(x + 6, y + 6, w * 0.25, h - 12, "#ffffff", 'opacity=".18"'))
    return "".join(out)


def plant(x, y, s=1.0):
    return (f'<polygon points="{x - 34 * s},{y} {x + 34 * s},{y} {x + 26 * s},{y + 60 * s} {x - 26 * s},{y + 60 * s}" fill="#b5653f"/>'
            f'<circle cx="{x}" cy="{y - 40 * s}" r="{44 * s}" fill="#4f8a4a"/>'
            f'<circle cx="{x - 30 * s}" cy="{y - 18 * s}" r="{30 * s}" fill="#5f9c55"/>'
            f'<circle cx="{x + 28 * s}" cy="{y - 22 * s}" r="{32 * s}" fill="#447a40"/>')


def bistro(x, y):
    return (rect(x - 70, y, 140, 12, "#3b3b40", 'rx="6"') + rect(x - 5, y + 12, 10, 90, "#3b3b40")
            + rect(x - 40, y + 98, 80, 8, "#3b3b40", 'rx="4"')
            + rect(x - 130, y + 20, 44, 10, "#7a4a30", 'rx="4"') + rect(x - 126, y + 30, 6, 72, "#7a4a30")
            + rect(x - 94, y - 40, 8, 142, "#7a4a30")
            + rect(x + 86, y + 20, 44, 10, "#7a4a30", 'rx="4"') + rect(x + 120, y + 30, 6, 72, "#7a4a30")
            + rect(x + 86, y - 40, 8, 142, "#7a4a30"))


def terrasse():
    defs = ('<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc2e8"/>'
            '<stop offset="1" stop-color="#e3f2f7"/></linearGradient>'
            '<pattern id="awn" width="90" height="10" patternUnits="userSpaceOnUse">'
            '<rect width="45" height="10" fill="#ee7f3b"/><rect x="45" width="45" height="10" fill="#fbeedd"/></pattern>'
            '<pattern id="tile" width="128" height="64" patternUnits="userSpaceOnUse"><rect width="128" height="64" fill="#dad1c4"/>'
            '<path d="M0 0H128M0 0V64" stroke="#c7bdb0" stroke-width="3"/></pattern>'
            '<pattern id="brick" width="48" height="24" patternUnits="userSpaceOnUse"><rect width="48" height="24" fill="#c56b4f"/>'
            '<path d="M0 0H48M0 12H48M24 0V12M0 12V24" stroke="#a8563e" stroke-width="2"/></pattern>')
    b = [rect(0, 0, W, H, "url(#sky)")]
    b += [f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="#ffffff" opacity=".7"/>'
          for x, y, rx, ry in [(260, 70, 120, 26), (330, 52, 70, 22), (1500, 40, 140, 24), (1580, 30, 60, 18)]]
    # facades, left to right; the cafe sits where the friends' table is
    b.append(rect(0, 130, 340, 700, "#ecd5ab") + rect(0, 120, 340, 18, "#d9bd8c") + windows(40, 190, 3, 4, 64, 92, 46, 48, "#5f8fa6", "#fff4de", "#ffe08a"))
    b.append(rect(340, 60, 320, 770, "url(#brick)") + rect(340, 50, 320, 18, "#8e4632") + windows(384, 120, 3, 5, 58, 86, 44, 40, "#41606e", "#f2e6d2"))
    b.append(rect(660, 170, 320, 660, "#5d9c9c") + rect(660, 160, 320, 16, "#3f7676") + windows(706, 230, 3, 4, 56, 84, 42, 44, "#2f4f5a", "#e9f1ee", "#ffe08a")
             + rect(690, 560, 260, 12, "#2f3a3a") + "".join(rect(700 + i * 24, 520, 5, 40, "#2f3a3a") for i in range(11)))
    b.append(rect(980, 90, 700, 740, "#e8b7a5") + rect(980, 80, 700, 18, "#c98d79") + windows(1030, 150, 5, 2, 74, 96, 58, 50, "#4b6b78", "#fff4ea", "#ffe08a"))
    b.append(rect(980, 470, 700, 360, "#2d4f57") + rect(1010, 560, 290, 230, "#3c6b74") + rect(1360, 560, 290, 230, "#3c6b74")
             + rect(1300, 540, 60, 290, "#1f383e") + rect(1020, 570, 80, 210, "#ffffff", 'opacity=".12"') + rect(1370, 570, 80, 210, "#ffffff", 'opacity=".12"'))
    b.append(rect(1100, 390, 460, 64, "#1f383e", 'rx="10"') + '<text x="1330" y="436" text-anchor="middle" font-family="Georgia, serif" '
             'font-size="44" font-weight="700" letter-spacing="6" fill="#fbeedd">CAFÉ LARINA</text>')
    b.append(f'<polygon points="960,470 1700,470 1730,560 930,560" fill="url(#awn)"/>'
             + "".join(f'<circle cx="{940 + i * 45}" cy="560" r="22" fill="{"#ee7f3b" if i % 2 == 0 else "#fbeedd"}"/>' for i in range(18)))
    b.append(rect(1680, 140, 240, 690, "#e2b14b") + rect(1680, 130, 240, 16, "#b98b2c") + windows(1716, 200, 2, 4, 62, 90, 46, 46, "#5f8fa6", "#fff4de"))
    # string lights over the terrace
    pts, bulbs = [], []
    for i in range(41):
        x = 980 + i * 17.5
        y = 600 + 46 * (1 - ((i - 20) / 20) ** 2)
        pts.append(f"{x:.0f},{y:.0f}")
        if i % 4 == 2:
            bulbs.append(f'<circle cx="{x:.0f}" cy="{y + 12:.0f}" r="9" fill="#ffd977"/><circle cx="{x:.0f}" cy="{y + 12:.0f}" r="20" fill="#ffd977" opacity=".25"/>')
    b.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#333" stroke-width="3"/>' + "".join(bulbs))
    b.append(rect(0, 830, W, 250, "url(#tile)") + rect(0, 822, W, 16, "#bdb2a4"))
    b.append(plant(290, 790) + plant(930, 790, 1.1) + plant(1720, 790))
    b.append(bistro(500, 790) + bistro(1160, 800) + bistro(1520, 800))
    return svg("".join(b), defs)


def maison():
    defs = ('<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93b9e0"/>'
            '<stop offset=".55" stop-color="#f6cfa2"/><stop offset="1" stop-color="#f3a77a"/></linearGradient>'
            '<pattern id="siding" width="10" height="26" patternUnits="userSpaceOnUse"><rect width="10" height="26" fill="#efe1c9"/>'
            '<rect y="22" width="10" height="4" fill="#dccaa9"/></pattern>'
            '<radialGradient id="sun"><stop offset="0" stop-color="#fff2c4"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>')
    b = [rect(0, 0, W, H, "url(#sky)"), f'<circle cx="1700" cy="560" r="260" fill="url(#sun)"/>']
    b.append("".join(f'<circle cx="{x}" cy="{600 + (x * 37) % 40}" r="{70 + (x * 13) % 40}" fill="{"#6c9758" if x % 3 else "#5a8449"}"/>'
                     for x in range(-40, W + 80, 90)))
    b.append(rect(0, 360, 440, 420, "#b9cfe0") + '<polygon points="-20,370 220,220 460,370" fill="#6b5b5b"/>'
             + windows(60, 450, 2, 1, 110, 120, 80, 0, "#ffd98a", "#ffffff"))
    b.append(rect(560, 300, 1000, 460, "url(#siding)") + '<polygon points="520,320 1060,80 1600,320" fill="#594545"/>'
             + rect(1320, 130, 70, 120, "#8a5a4a"))
    b.append(windows(690, 370, 1, 1, 170, 130, 0, 0, "#ffd98a", "#ffffff") + windows(1260, 370, 1, 1, 170, 130, 0, 0, "#ffd98a", "#ffffff")
             + windows(650, 520, 1, 1, 200, 150, 0, 0, "#f7c96f", "#ffffff") + windows(1280, 520, 1, 1, 200, 150, 0, 0, "#f7c96f", "#ffffff"))
    b.append('<polygon points="880,500 1240,500 1270,470 850,470" fill="#594545"/>' + rect(900, 500, 20, 220, "#ffffff") + rect(1200, 500, 20, 220, "#ffffff"))
    b.append(rect(1000, 520, 120, 190, "#7b3a2c") + rect(1016, 540, 88, 60, "#93503f") + rect(1016, 620, 88, 70, "#93503f")
             + '<circle cx="1102" cy="618" r="7" fill="#e8c15a"/>' + rect(860, 708, 400, 22, "#d6c4a8"))
    for i in range(4):
        y = 730 + i * 36
        b.append(rect(950 - i * 14, y, 220 + i * 28, 36, "#cdb99e" if i % 2 == 0 else "#bba68a"))
    b.append(rect(0, 776, W, 304, "#86b15c") + "".join(rect(0, 800 + i * 70, W, 26, "#7aa553") for i in range(4)))
    b.append('<polygon points="930,874 1190,874 1330,1080 790,1080" fill="#d8c9b0"/>' + rect(1600, 776, 320, 304, "#b8b1a6"))
    # Ruby's car, parked in the street on the left
    b.append(rect(90, 800, 520, 110, "#d4435a", 'rx="40"') + '<path d="M190 806 L250 720 L470 720 L540 806 Z" fill="#c23a50"/>'
             + '<path d="M215 800 L262 734 L355 734 L355 800 Z M370 800 L370 734 L460 734 L515 800 Z" fill="#2c3e50"/>'
             + '<circle cx="210" cy="910" r="48" fill="#222"/><circle cx="210" cy="910" r="20" fill="#9aa"/>'
             + '<circle cx="500" cy="910" r="48" fill="#222"/><circle cx="500" cy="910" r="20" fill="#9aa"/>'
             + rect(580, 830, 30, 20, "#ffe8a0", 'rx="6"'))
    return svg("".join(b), defs)


def salon():
    defs = ('<radialGradient id="glow"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>'
            '<radialGradient id="oven"><stop offset="0" stop-color="#ffb066"/><stop offset="1" stop-color="#e2562b"/></radialGradient>'
            '<pattern id="tiles" width="60" height="40" patternUnits="userSpaceOnUse"><rect width="60" height="40" fill="#f4f0e8"/>'
            '<path d="M0 0H60M0 0V40" stroke="#d9d2c4" stroke-width="3"/></pattern>')
    b = [rect(0, 0, W, 830, "#e7d2bd"), rect(0, 600, 1320, 220, "#d8bea2")]
    b.append("".join(rect(x, 610, 4, 200, "#c8ab8c") for x in range(30, 1320, 90)) + rect(0, 812, W, 22, "#fbf3e6"))
    b.append(rect(0, 834, W, 246, "#9a6a49") + "".join(rect(0, 834 + i * 50, W, 4, "#83573a") for i in range(1, 5))
             + "".join(rect((i * 397) % W, 834 + (i % 4) * 50 + 4, 4, 46, "#83573a") for i in range(14)))
    # front door, left
    b.append(rect(120, 280, 300, 552, "#fbf3e6") + rect(140, 300, 260, 532, "#6b3a28") + rect(170, 330, 200, 70, "#e9c98f")
             + rect(170, 430, 90, 170, "#7d4733") + rect(280, 430, 90, 170, "#7d4733") + rect(170, 630, 200, 160, "#7d4733")
             + '<circle cx="372" cy="600" r="10" fill="#e8c15a"/>')
    # night window
    b.append(rect(600, 180, 440, 380, "#fbf3e6") + rect(620, 200, 400, 340, "#1c2646") + '<circle cx="920" cy="270" r="38" fill="#f3efcf"/>'
             + "".join(f'<circle cx="{x}" cy="{y}" r="3" fill="#ffffff"/>' for x, y in [(680, 240), (760, 300), (700, 420), (840, 230), (980, 380), (800, 460)])
             + rect(816, 200, 8, 340, "#fbf3e6") + rect(620, 366, 400, 8, "#fbf3e6")
             + rect(560, 160, 70, 440, "#b4524a") + rect(1010, 160, 70, 440, "#b4524a") + rect(540, 150, 560, 16, "#5a3a2a"))
    # frames, sofa, rug, lamp
    b.append(rect(1130, 240, 120, 150, "#5a3a2a") + rect(1142, 252, 96, 126, "#9fc3c9") + rect(460, 250, 90, 110, "#5a3a2a") + rect(470, 260, 70, 90, "#e9b75a"))
    b.append('<ellipse cx="860" cy="960" rx="420" ry="70" fill="#c26a58"/>' + '<ellipse cx="860" cy="960" rx="360" ry="52" fill="#d27d68"/>')
    b.append(rect(580, 620, 560, 120, "#3e6374", 'rx="26"') + rect(560, 700, 600, 110, "#355767", 'rx="24"')
             + rect(540, 660, 70, 160, "#2f4d5b", 'rx="22"') + rect(1110, 660, 70, 160, "#2f4d5b", 'rx="22"')
             + rect(630, 640, 120, 90, "#e8b54a", 'rx="20"') + rect(990, 640, 120, 90, "#e07a5f", 'rx="20"'))
    b.append('<circle cx="1240" cy="520" r="260" fill="url(#glow)"/>' + rect(1234, 520, 10, 300, "#3a3a3a") + rect(1196, 812, 86, 14, "#3a3a3a", 'rx="6"')
             + '<polygon points="1180,520 1300,520 1270,420 1210,420" fill="#f5e3b6"/>')
    # kitchen, right
    b.append(rect(1340, 150, 580, 210, "#5c8270") + "".join(rect(1356 + i * 142, 166, 126, 178, "#6b927f") for i in range(4)))
    b.append(rect(1340, 360, 580, 200, "url(#tiles)") + rect(1330, 556, 590, 40, "#f2eee6") + rect(1340, 596, 580, 222, "#5c8270")
             + "".join(rect(1356 + i * 142, 612, 126, 190, "#6b927f") for i in (0, 3)))
    b.append(rect(1520, 596, 220, 222, "#2b2b2f") + rect(1540, 650, 180, 120, "url(#oven)", 'rx="10"') + rect(1540, 616, 180, 18, "#444")
             + '<ellipse cx="1630" cy="700" rx="70" ry="30" fill="#f7d36b" opacity=".6"/>')
    return svg("".join(b), defs)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name, fn in [("terrasse", terrasse), ("maison", maison), ("salon", salon)]:
        (OUT / f"{name}.svg").write_text(fn(), encoding="utf-8")
        print("->", name)
