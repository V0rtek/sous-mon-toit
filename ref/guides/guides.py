# reference decors in perspective, built from the poses' camera: chest-height camera, characters 4 m away, 1.75 m = 620 px
# python ref/guides/guides.py rewrites the pictures next to it (bg + _fg = the foreground over the characters)
from PIL import Image, ImageDraw, ImageFont
import json, math
W, H = 2400, 1350
Y0, HCH = 1250, 620              # feet line of the characters' plane, their height
D0, CAMH = 4.0, 0.72 * 1.75      # distance to that plane (m), camera height = chest height (m)
F = HCH / 1.75 * D0              # focal, px
CX, HZ = W / 2, Y0 - CAMH * F / D0   # vanishing point
import os
OUT = os.path.dirname(os.path.abspath(__file__)) + '/'
fnt = lambda s: ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', s)
def P(x, y, d):                  # world (m: x right from centre, y up from floor, d depth) -> px
  return (CX + x * F / d, HZ - (y - CAMH) * F / d)
def rr(a, b): return [min(a[0], b[0]), min(a[1], b[1]), max(a[0], b[0]), max(a[1], b[1])]
def X(px, d): return (px - CX) * d / F   # px on the characters' plane -> world x
SKY, FLOOR, LINE, RED, BLUE = (52, 58, 72), (74, 66, 60), (255, 255, 255, 70), (255, 70, 70), (90, 170, 255)

def base(floor=FLOOR, sky=SKY):
  im = Image.new('RGBA', (W, H), sky + (255,)); d = ImageDraw.Draw(im, 'RGBA')
  d.rectangle([0, HZ, W, H], fill=floor + (255,))
  return im, d
def grid(d, near=2.2, far=40, x0=-12, x1=12):
  for x in range(x0, x1 + 1):                 # lines into depth, every metre
    d.line([P(x, 0, near), P(x, 0, far)], fill=LINE, width=2)
  dd = near
  while dd < far:                              # across, every metre of depth
    d.line([P(x0, 0, dd), P(x1, 0, dd)], fill=LINE, width=2); dd += 1
def guides(d, title, notes, people=()):
  d.line([0, HZ, W, HZ], fill=(255, 220, 80, 230), width=4)
  d.text((20, HZ - 40), 'HORIZON = hauteur de poitrine (caméra) · les fuyantes vont au point rouge', font=fnt(28), fill=(255, 220, 80))
  d.ellipse([CX - 12, HZ - 12, CX + 12, HZ + 12], fill=RED)
  for pp in people:                           # where they stand: 1.75 m, chest, belt, and their 20° look
    x, face, dd = (pp[0], pp[1], D0) if len(pp) == 2 else pp   # (px on the 4 m plane, face) or (world x m, face, depth m)
    wx = X(x, D0) if len(pp) == 2 else x; sx, fy = P(wx, 0, dd); hh = HCH * D0 / dd; k = D0 / dd
    d.rectangle([sx - 4 * k, fy - hh, sx + 4 * k, fy], fill=(255, 255, 255, 90))
    for frac, lab in ((1, '1,75 m'), (0.72, 'poitrine'), (0.6, 'ceinture')):
      y = fy - hh * frac; d.line([sx - 40 * k, y, sx + 40 * k, y], fill=(255, 255, 255, 160), width=3)
      if len(pp) == 2 or dd == people[0][2]: d.text((sx + 46 * k, y - 14), lab, font=fnt(22), fill=(255, 255, 255, 200))
    sgn = 1 if face == 'r' else -1
    tip = P(wx + sgn * 1.2 * math.cos(math.radians(20)), 1.26, dd - 1.2 * math.sin(math.radians(20)))
    d.line([P(wx, 1.26, dd), tip], fill=BLUE + (230,), width=max(2, int(5 * k))); d.text((tip[0] - 20, tip[1] - 34), '20°', font=fnt(int(24 * k)), fill=BLUE)
  d.rectangle([20, 20, 1180, 40 + 40 * (len(notes) + 1)], fill=(0, 0, 0, 150))
  d.text((40, 30), title, font=fnt(34), fill=(255, 255, 255))
  for i, n in enumerate(notes): d.text((40, 80 + 40 * i), n, font=fnt(26), fill=(230, 230, 230))
def box(d, x0, x1, y0, y1, d0, d1, fill, edge=(0, 0, 0, 180), top=True, front=True):
  if top and y1 < CAMH or top and True:
    d.polygon([P(x0, y1, d0), P(x1, y1, d0), P(x1, y1, d1), P(x0, y1, d1)], fill=tuple(min(255, c + 25) for c in fill[:3]) + (255,), outline=edge)
  if front: d.polygon([P(x0, y0, d0), P(x1, y0, d0), P(x1, y1, d0), P(x0, y1, d0)], fill=fill, outline=edge)
def save(name, bg, fg=None, scene=None):
  bg.convert('RGB').save(OUT + name + '.webp', quality=88)
  if fg: fg.save(OUT + name + '_fg.webp', quality=90, lossless=False)
  return scene
scenes = {}

# 1 · the street: walk. Facades 7 m back, lamp posts 2.5 m from the camera (foreground, they pass in front)
bg, d = base(); grid(d)
for i, x in enumerate(range(-14, 15, 3)):
  c = (96 + 12 * (i % 3), 80, 70)
  d.polygon([P(x, 0, 11), P(x + 3, 0, 11), P(x + 3, 6, 11), P(x, 6, 11)], fill=c + (255,), outline=(0, 0, 0, 200))
  for wx in (x + 0.6, x + 1.9):
    d.rectangle(rr(P(wx, 1.2, 11), P(wx + 0.6, 2.4, 11)), fill=(40, 50, 70)); d.rectangle(rr(P(wx, 3.4, 11), P(wx + 0.6, 4.6, 11)), fill=(40, 50, 70))
fg = Image.new('RGBA', (W, H)); f = ImageDraw.Draw(fg)
for x in range(-8, 9, 4):
  a, b = P(x, 0, 2.6), P(x + 0.12, 3.2, 2.6); f.rectangle([a[0], b[1], b[0], a[1]], fill=(30, 26, 24, 255))
guides(d, 'RUE · marche', ['Façades à 11 m, fenêtres 60 cm', 'Lampadaires à 2,6 m de la caméra (avant-plan, ils passent devant)', 'Grille au sol = 1 m', 'Persos à 4 m : 1,75 m = 620 px'], people=[(900, 'r'), (1200, 'r')])
scenes['g_street'] = save('rue', bg, fg)

# 2 · the stairs: 10 steps of 17.5 cm × 28 cm, parallel to the picture, on the characters' plane, a rail at 90 cm
bg, d = base(); grid(d)
d.polygon([P(-12, 0, 6), P(12, 0, 6), P(12, 5, 6), P(-12, 5, 6)], fill=(70, 62, 66, 255))   # the wall behind
sx = X(700, D0)
for i in range(10):
  x = sx + 0.28 * i; y = 0.175 * (i + 1)
  box(d, x, sx + 0.28 * 10 + 1.5, 0, y, D0 - 0.6, D0 + 0.6, (110, 84, 64, 255))
box(d, sx + 2.8, sx + 6, 0, 1.75, D0 - 0.6, D0 + 0.6, (110, 84, 64, 255))   # the landing
fg = Image.new('RGBA', (W, H)); f = ImageDraw.Draw(fg)
for i in range(0, 11, 2):                     # the rail, in front of them (near edge of the stairs)
  x = sx + 0.28 * i; a = P(x, 0.175 * i, D0 - 0.6); b = P(x, 0.175 * i + 0.9, D0 - 0.6)
  f.line([a, b], fill=(40, 28, 20, 255), width=10)
f.line([P(sx - 0.3, 0.9, D0 - 0.6), P(sx + 2.8, 1.75 + 0.9, D0 - 0.6), P(sx + 4, 1.75 + 0.9, D0 - 0.6)], fill=(60, 40, 28, 255), width=16)
guides(d, 'ESCALIER', ['Marches : 17,5 cm de haut × 28 cm de profond, 10 marches = 1,75 m', 'Escalier parallèle à l’image, au plan des persos (4 m), 1,2 m de large', 'Rampe à 90 cm au-dessus du nez des marches (avant-plan)', 'Palier en haut : 1,75 m'], people=[(700, 'r')])
scenes['g_stairs'] = save('escalier', bg, fg)

# 3 · the bar: the counter runs into the depth on the left, the patrons in a row behind it, side by side (each 80 cm
# further), facing right (toward the camera's side): the counter is between the camera and their bellies. Its top in the
# back (their forearms rest on it, the poses are cut there), its side and near end in front of them
BAR = (-1.05, -0.5, 2.0, 22)                 # x left, x right, from depth, to depth (m); top at 1.05 m
bg, d = base(); grid(d)
d.polygon([P(-12, 0, 12), P(12, 0, 12), P(12, 4, 12), P(-12, 4, 12)], fill=(60, 44, 38, 255))
for y in (1.1, 1.6, 2.1):                     # the back bar, far end
  d.rectangle(rr(P(-6, y + 0.05, 12), P(6, y, 12)), fill=(110, 80, 50))
  for x in [i * 0.35 - 6 for i in range(35)]:
    d.rectangle(rr(P(x, y + 0.32, 12), P(x + 0.09, y + 0.05, 12)), fill=((70 + int(x * 40)) % 200 + 40, 90, 60))
x0, x1, d0, d1 = BAR
d.polygon([P(x0, 1.05, d0), P(x1, 1.05, d0), P(x1, 1.05, d1), P(x0, 1.05, d1)], fill=(150, 104, 66, 255), outline=(0, 0, 0, 200))
for dd in range(3, 22, 2): d.line([P(x0, 1.05, dd), P(x1, 1.05, dd)], fill=(0, 0, 0, 50), width=2)
fg = Image.new('RGBA', (W, H)); f = ImageDraw.Draw(fg)
f.polygon([P(x1, 0, d0), P(x1, 0, d1), P(x1, 1.05, d1), P(x1, 1.05, d0)], fill=(96, 62, 40, 255), outline=(40, 24, 14, 255))   # its side
f.polygon([P(x0, 0, d0), P(x1, 0, d0), P(x1, 1.05, d0), P(x0, 1.05, d0)], fill=(80, 50, 32, 255), outline=(40, 24, 14, 255))   # its near end
f.line([P(x1, 1.0, d0), P(x1, 1.0, d1)], fill=(60, 36, 22, 255), width=6)
BAR_PEOPLE = [(-1.2, 'r', 4.0 + 0.8 * i) for i in range(4)]
guides(d, 'BAR', ['Comptoir 1,05 m de haut (= leur ceinture), 55 cm de large, il file vers le fond', 'Les clients côte à côte = en profondeur, tous tournés vers la droite, 80 cm entre eux', 'Le dessus est derrière eux (leurs avant-bras posés dessus, la pose est coupée là)', 'Le côté et le bout du comptoir sont l’avant-plan : ils cachent leur ventre'], people=BAR_PEOPLE)
scenes['g_bar'] = save('bar', bg, fg)
print('bar people', [(round(P(x, 0, dd)[0]), round(P(x, 0, dd)[1]), round(HCH * D0 / dd)) for x, _, dd in BAR_PEOPLE])

# 4 · the campfire: logs 45 cm high, a log 30 cm in front of each (foreground), the fire between them
bg, d = base((54, 62, 44), (22, 26, 40)); grid(d)
for x in range(-12, 13, 2):
  t = P(x, 0, 14); d.polygon([t, (t[0] - 60, HZ + 2), (t[0] + 60, HZ + 2)], fill=(18, 34, 26))   # far trees
d.polygon([P(-12, 0, 14), P(12, 0, 14), P(12, 4, 14), P(-12, 4, 14)], fill=(20, 30, 26, 255))
fx = X(1200, D0)
for k, col in ((0.6, (255, 120, 30)), (0.42, (255, 180, 60)), (0.25, (255, 235, 150))):
  d.polygon([P(fx - k * 0.5, 0, D0), P(fx, k * 1.4, D0), P(fx + k * 0.5, 0, D0)], fill=col + (255,))
d.ellipse(rr(P(fx - 0.5, 0.05, D0 - 0.2), P(fx + 0.5, -0.05, D0 + 0.2)), outline=(90, 90, 90), width=6)
fg = Image.new('RGBA', (W, H)); f = ImageDraw.Draw(fg)
for x in (X(900, D0), X(1500, D0)):
  f.rounded_rectangle(rr(P(x - 0.6, 0.5, D0 - 0.3), P(x + 0.6, 0, D0 - 0.3)), radius=30, fill=(92, 60, 36, 255), outline=(40, 24, 14, 255), width=6)
guides(d, 'FEU DE CAMP', ['Assis sur des bûches de 45 cm : leur ceinture à 52 cm du sol', 'Une bûche de 50 cm, 30 cm devant chacun (avant-plan) : elle cache le bas', 'Le feu entre eux, au même plan, 1,2 m de large', 'Face à face : la même pose, retournée'], people=[(900, 'r'), (1500, 'l')])
scenes['g_fire'] = save('feu', bg, fg)

# 5 · the alley: two walls 1,9 m apart, receding to the vanishing point; each leans back on one, facing the other
bg, d = base(); grid(d, x0=-1, x1=1)
xl, xr = X(1010, D0) - 0.18, X(1390, D0) + 0.18
for (x, c) in ((xl, (92, 80, 74)), (xr, (84, 74, 70))):
  d.polygon([P(x, 0, 2.2), P(x, 0, 30), P(x, 6, 30), P(x, 6, 2.2)], fill=c + (255,), outline=(0, 0, 0, 200))
  for dd in range(3, 30, 2): d.line([P(x, 0, dd), P(x, 6, dd)], fill=(0, 0, 0, 60), width=2)
guides(d, 'RUELLE · adossés', ['Deux murs à 1,9 m l’un de l’autre, ils filent vers le point rouge', 'Chacun dos à un mur, face à l’autre : la même pose, retournée', 'Joints du mur tous les 2 m', 'Grille au sol = 1 m'], people=[(1010, 'r'), (1390, 'l')])
scenes['g_alley'] = save('ruelle', bg, None)
print(json.dumps({'HZ': HZ, 'F': F}))
