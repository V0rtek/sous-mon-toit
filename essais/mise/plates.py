from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageChops
import numpy as np
src = Image.open('bg/taverne_bar.webp').convert('RGB')
def night(im, k=0.62):
    a = np.asarray(im).astype(np.float32)
    r,g,b = a[...,0],a[...,1],a[...,2]
    lum = (r+g+b)/3
    sky = np.clip((b - r + 6)/22, 0, 1) * np.clip((lum-95)/50, 0, 1)   # daylight through the windows
    sky = np.clip(sky + np.clip((lum-215)/25,0,1)*np.clip((b-r+25)/25,0,1), 0, 1)
    sky = np.asarray(Image.fromarray((sky*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))).astype(np.float32)/255
    sky = np.clip(sky*3, 0, 1)
    warm = np.clip((r - b - 40)/80, 0, 1) * np.clip((lum-150)/70, 0, 1)   # lantern light stays
    out = a * np.array([k*1.0, k*0.9, k*1.02])
    out = out*(1-sky[...,None]) + (np.array([14,20,46]) + lum[...,None]*np.array([0.05,0.07,0.13]))*sky[...,None]
    out = out + a*warm[...,None]*0.5
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8))
W,H = 1800,1200
# --- the table plate: the room behind (windows, door), a long table across the front
bg = src.crop((40, 90, 1050, 763)).resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2.2))
bg = night(bg)
plate = bg.copy()
TY = 850
rng = np.random.default_rng(7)
def wood(w, h, base, grain=22):
    n = rng.normal(0, 1, (h, w//24+2)); n = np.asarray(Image.fromarray(((n*40)+128).clip(0,255).astype(np.uint8)).resize((w, h), Image.BICUBIC)).astype(np.float32)-128
    f = rng.normal(0, 1, (h, w)); f = np.asarray(Image.fromarray(((f*30)+128).clip(0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))).astype(np.float32)-128
    v = (n*grain/40 + f*0.25)[..., None]
    return np.clip(np.array(base, np.float32)[None, None, :] + v*np.array([1, .8, .6]), 0, 255)
SH = 120
surf = wood(W, SH, (112, 70, 44), 9)
yy = np.linspace(0, 1, SH)[:, None, None]; xx = np.linspace(-1, 1, W)[None, :, None]
surf = surf*(0.62 + 0.5*yy) * (1.12 - 0.35*xx**2)             # darker far away and on the sides
for k in range(1, 6): surf[int(SH*(k/6)**1.5), :, :] *= 0.55                                     # plank joints, closer together far away
surf[:2] *= 0.6
plate.paste(Image.fromarray(surf.clip(0,255).astype(np.uint8)), (0, TY))
ap = wood(W, H-TY-SH, (58, 36, 24), 6); ap *= np.linspace(0.95, 0.5, H-TY-SH)[:, None, None]
for x in range(0, W, 225): ap[:, x:x+4, :] *= 0.5
ap[:14] *= 0.45
plate.paste(Image.fromarray(ap.clip(0,255).astype(np.uint8)), (0, TY+SH))
d = ImageDraw.Draw(plate, 'RGBA')
d.rectangle((0, TY+SH-4, W, TY+SH), fill=(255,200,140,70))   # the near edge's lit rim
sh = Image.new('L', (W,H), 0); ImageDraw.Draw(sh).rectangle((0, TY-10, W, TY+10), fill=110)
sh = sh.filter(ImageFilter.GaussianBlur(9)); plate.paste((10,6,4), (0,0), sh)
# vignette
v = Image.new('L', (W,H), 0); ImageDraw.Draw(v).ellipse((-300,-250,W+300,H+350), fill=255); v = v.filter(ImageFilter.GaussianBlur(160))
plate = Image.composite(plate, Image.new('RGB',(W,H),(8,6,10)), v)
plate.save('mise/table.webp', quality=86)
# --- aside: by the pillar and the door
a = src.crop((560, 150, 1260, 617)).resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3))
a = night(a, .55); a = Image.composite(a, Image.new('RGB',(W,H),(8,6,10)), v); a.save('mise/aside.webp', quality=84)
# --- the room, for the opening
r = night(src.resize((W, int(W*940/1672)), Image.LANCZOS).crop((0,0,W,1012)), .7); r.save('mise/salle.webp', quality=84)
print('ok')
