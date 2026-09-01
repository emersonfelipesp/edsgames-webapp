"""
Original pixel-art loops for the EDSGAMES site.

The scenes deliberately reproduce the *level design language* of the eras the
site is nostalgic about — checkerboard hills, loops, palms and spinning rings; a
brick-and-warp-pipe plains stage under a castle; a desert firefight around a
boxy tracked vehicle — because that furniture is what makes a scene read as a
16-bit platformer or a run-and-gun at a glance.

What is deliberately *not* reproduced is any protagonist. The characters here
are original sprites, and no logo, title screen or level layout is copied from a
real game. Nothing in this file is traced or extracted from anyone's ROM.

Everything is drawn from primitives at 320x180, which is close to the real
Genesis and Neo Geo working resolutions, and upscaled with nearest-neighbour.

Each loop is seamless: every animated quantity is a function of `i / N`, and
every scrolling offset is taken modulo its own tile width.
"""

import math
from PIL import Image, ImageDraw

W, H = 320, 180
N = 72          # frames per loop
FPS = 12


# --------------------------------------------------------------------------- #
# Drawing helpers                                                              #
# --------------------------------------------------------------------------- #
def scroll_off(t, period, distance):
    """A seamless parallax offset.

    A layer only loops if it advances a whole number of its own tile periods
    over the full animation - otherwise the last frame does not line up with the
    first and the clip visibly jumps on repeat. `distance` is the pixels per
    loop you *want*; this rounds it to the nearest whole number of periods.
    """
    laps = max(1, round(distance / period))
    return (t * laps * period) % period


def _frame(bg):
    img = Image.new("RGB", (W, H), bg)
    return img, ImageDraw.Draw(img)


def _sky(draw, top, bottom, y_end, bands=8):
    """A banded vertical gradient. Real hardware could not do smooth ones."""
    for b in range(bands):
        y0 = int(y_end * b / bands)
        y1 = int(y_end * (b + 1) / bands)
        f = b / max(1, bands - 1)
        draw.rectangle(
            [0, y0, W, y1],
            fill=tuple(round(top[c] + (bottom[c] - top[c]) * f) for c in range(3)),
        )


def _sprite(draw, art, palette, x, y, s=1, flip=False):
    """Blits string art. Space means transparent; every other char is a key."""
    for row, line in enumerate(art):
        if flip:
            line = line[::-1]
        for col, ch in enumerate(line):
            if ch == " ":
                continue
            color = palette.get(ch)
            if color is None:
                continue
            draw.rectangle(
                [x + col * s, y + row * s, x + col * s + s - 1, y + row * s + s - 1],
                fill=color,
            )


def _cloud(draw, x, y, w, light=(255, 255, 255), shade=(206, 226, 250)):
    """The flat-bottomed, bump-topped cloud every 8-bit platformer used."""
    draw.rectangle([x, y + 6, x + w, y + 12], fill=light)
    draw.rectangle([x + 6, y + 2, x + w - 6, y + 12], fill=light)
    draw.rectangle([x + 12, y, x + w - 14, y + 12], fill=light)
    draw.rectangle([x, y + 11, x + w, y + 12], fill=shade)


# --------------------------------------------------------------------------- #
# Sprites                                                                      #
# --------------------------------------------------------------------------- #
# A blue speedster. Original character: round body, goggles, red boots.
SPEEDSTER = {
    "K": (18, 16, 40),      # outline
    "B": (40, 96, 220),     # body
    "D": (26, 62, 160),     # body shade
    "L": (96, 168, 255),    # body highlight
    "S": (250, 206, 168),   # skin
    "R": (226, 46, 46),     # boots
    "W": (250, 250, 255),   # goggles / sock
    "Y": (250, 210, 70),    # buckle
}

SPEEDSTER_RUN = [
    [
        "      KKKKKK    ",
        "    KKBBBBBBK   ",
        "  KKBBBBBBBBBK  ",
        " KBBBBBBBBBSSSK ",
        "KDBBBBBBBBSSSSSK",
        "KDBBBKWWKBSSSSSK",
        " KDBBKWKKBSSSSK ",
        "  KBBBBBBSSSSSK ",
        "   KBBBBBBSSSK  ",
        "    KBBBBBBBK   ",
        "   KKBBBBBBBKK  ",
        "  KDBBBBBBBBBDK ",
        "  KBBBKYYYKBBBK ",
        "   KBBK   KBBK  ",
        "   KRRK   KRRK  ",
        "  KRRRRK KRRRRK ",
        "  KRWWRK KRWWRK ",
        "   KKKK   KKKK  ",
    ],
    [
        "      KKKKKK    ",
        "    KKBBBBBBK   ",
        "  KKBBBBBBBBBK  ",
        " KBBBBBBBBBSSSK ",
        "KDBBBBBBBBSSSSSK",
        "KDBBBKWWKBSSSSSK",
        " KDBBKWKKBSSSSK ",
        "  KBBBBBBSSSSSK ",
        "   KBBBBBBSSSK  ",
        "    KBBBBBBBK   ",
        "   KKBBBBBBBKK  ",
        "  KDBBBBBBBBBDK ",
        "  KBBBKYYYKBBBK ",
        "  KBBK     KBBK ",
        " KRRK       KRK ",
        " KRRRRK   KRRRK ",
        " KRWWRK   KRWWK ",
        "  KKKK     KKK  ",
    ],
]

# A plumber-ish jumper. Original character: cap, overalls, work gloves.
JUMPER = {
    "K": (24, 18, 34),
    "R": (222, 48, 48),     # cap and shirt
    "r": (168, 28, 28),     # shirt shade
    "S": (250, 200, 156),   # skin
    "s": (208, 154, 112),   # skin shade
    "B": (56, 84, 208),     # overalls
    "b": (36, 56, 156),     # overalls shade
    "W": (250, 250, 250),   # gloves
    "N": (86, 54, 30),      # hair
    "Y": (250, 206, 70),    # buttons
    "O": (110, 70, 34),     # boots
}

JUMPER_FRAMES = [
    [   # stride
        "     KKKKKK     ",
        "    KRRRRRRK    ",
        "   KRRRRRRRRK   ",
        "   KNNSSSSNK    ",
        "   KNSSSSSSK    ",
        "   KNSKSSKSK    ",
        "   KSSSSSSSK    ",
        "    KSNNNSK     ",
        "     KSSSK      ",
        "   KKRRRRRKK    ",
        "  KWRRrRRrRRWK  ",
        "  KWKBBYBBKKWK  ",
        "   KBBBBBBBK    ",
        "   KBBbBBbBK    ",
        "   KBBK KBBK    ",
        "   KBBK KBBK    ",
        "  KOOOK KOOOK   ",
        "  KKKKK KKKKK   ",
    ],
    [   # airborne, arms up
        "     KKKKKK     ",
        "    KRRRRRRK    ",
        "   KRRRRRRRRK   ",
        "   KNNSSSSNK    ",
        "   KNSSSSSSK    ",
        "   KNSKSSKSK    ",
        "   KSSSSSSSK    ",
        "    KSNNNSK     ",
        " KW  KSSSK  WK  ",
        " KWKKRRRRRKKWK  ",
        "  KRRRrRRrRRK   ",
        "   KBBYBBYBK    ",
        "   KBBBBBBBK    ",
        "   KBBbBBbBK    ",
        "  KBBK   KBBK   ",
        "  KOOK   KOOK   ",
        " KOOOK   KOOOK  ",
        " KKKKK   KKKKK  ",
    ],
]

# A commando. Original character: bandana, vest, boots, rifle.
TROOPER = {
    "K": (22, 24, 20),
    "G": (104, 132, 78),    # fatigues
    "g": (66, 88, 50),      # fatigues shade
    "S": (246, 200, 158),   # skin
    "R": (200, 44, 44),     # bandana
    "V": (78, 62, 42),      # vest
    "M": (72, 76, 80),      # metal
    "B": (52, 40, 30),      # boots
}

TROOPER_FRAMES = [
    [
        "    KKKKK       ",
        "   KRRRRRK      ",
        "   KRSSSSK      ",
        "   KSSKSSK      ",
        "   KSSSSSK      ",
        "    KSSSK       ",
        "   KGGGGGK      ",
        "  KGVVVVVGK     ",
        "  KGVGGGVGKMMMMM",
        "  KGVGGGVGKMMMMM",
        "  KGGGGGGGK     ",
        "  KGGgGGgGK     ",
        "   KGGK KGGK    ",
        "   KGGK  KGGK   ",
        "  KBBBK   KBBK  ",
        "  KKKKK   KKKK  ",
    ],
    [
        "    KKKKK       ",
        "   KRRRRRK      ",
        "   KRSSSSK      ",
        "   KSSKSSK      ",
        "   KSSSSSK      ",
        "    KSSSK       ",
        "   KGGGGGK      ",
        "  KGVVVVVGK     ",
        "  KGVGGGVGKMMMMM",
        "  KGVGGGVGKMMMMM",
        "  KGGGGGGGK     ",
        "  KGGgGGgGK     ",
        "  KGGK  KGGK    ",
        " KGGK    KGGK   ",
        " KBBBK   KBBBK  ",
        " KKKKK   KKKKK  ",
    ],
]


# --------------------------------------------------------------------------- #
# 1. Checkerboard hills — the 16-bit speed platformer                          #
# --------------------------------------------------------------------------- #
GH_SKY_TOP, GH_SKY_LOW = (56, 132, 232), (128, 200, 248)
GH_SEA, GH_SEA_LT = (44, 108, 200), (86, 156, 230)
GH_HILL_FAR, GH_HILL_FAR_D = (52, 152, 96), (34, 116, 74)
GH_GRASS, GH_GRASS_LT, GH_GRASS_DK = (76, 200, 96), (140, 234, 140), (44, 152, 68)
GH_DIRT_A, GH_DIRT_B, GH_DIRT_EDGE = (206, 148, 62), (152, 96, 36), (110, 66, 24)
GH_RING, GH_RING_DK = (252, 214, 62), (206, 152, 20)
GH_PALM_TRUNK, GH_PALM_LEAF = (150, 96, 44), (48, 168, 88)


def _palm(d, x, y, s=1):
    for k in range(6):
        d.rectangle([x, y + k * 6 * s, x + 5 * s, y + (k * 6 + 5) * s], fill=GH_PALM_TRUNK)
        d.rectangle([x, y + (k * 6 + 5) * s, x + 5 * s, y + (k * 6 + 6) * s], fill=(110, 66, 28))
    for dx, dy, w in ((-22, -4, 24), (4, -4, 24), (-16, -12, 18), (8, -12, 18)):
        d.ellipse([x + dx * s, y + dy * s, x + (dx + w) * s, y + (dy + 10) * s], fill=GH_PALM_LEAF)


def hillside(i):
    img, d = _frame(GH_SKY_TOP)
    t = i / N
    _sky(d, GH_SKY_TOP, GH_SKY_LOW, 88)

    # sea band on the horizon
    d.rectangle([0, 88, W, 102], fill=GH_SEA)
    wave = scroll_off(t, 40, 40)
    for k in range(-1, W // 40 + 2):
        x = k * 40 - wave
        d.rectangle([x, 91, x + 16, 93], fill=GH_SEA_LT)
        d.rectangle([x + 20, 97, x + 32, 99], fill=GH_SEA_LT)

    cloud_off = scroll_off(t, 160, 60)
    for k in range(-1, W // 160 + 2):
        x = k * 160 - cloud_off
        _cloud(d, x, 12, 44)
        _cloud(d, x + 84, 30, 32)

    # rolling background hills
    hill_off = scroll_off(t, 128, 190)
    for k in range(-1, W // 128 + 2):
        cx = k * 128 - hill_off
        d.ellipse([cx, 62, cx + 140, 150], fill=GH_HILL_FAR)
        d.ellipse([cx + 12, 68, cx + 128, 148], fill=GH_HILL_FAR_D)
        d.ellipse([cx + 12, 66, cx + 128, 138], fill=GH_HILL_FAR)

    # the loop: the single most recognisable piece of furniture in the genre
    loop_off = scroll_off(t, 300, 300)
    for k in range(-1, 2):
        lx = k * 300 - loop_off + 150
        d.ellipse([lx, 40, lx + 104, 126], outline=(30, 104, 66), width=13)
        d.ellipse([lx + 5, 45, lx + 99, 121], outline=GH_GRASS_DK, width=7)
        d.ellipse([lx + 9, 49, lx + 95, 117], outline=GH_DIRT_A, width=3)
        d.ellipse([lx + 12, 52, lx + 92, 114], outline=GH_DIRT_B, width=1)

    palm_off = scroll_off(t, 132, 320)
    for k in range(-1, W // 132 + 2):
        _palm(d, k * 132 - palm_off, 54)

    # foreground platform: scalloped grass over the checkered dirt wall
    top_y = 128
    d.rectangle([0, top_y, W, H], fill=GH_DIRT_A)
    d.rectangle([0, top_y, W, top_y + 8], fill=GH_GRASS)
    d.rectangle([0, top_y, W, top_y + 3], fill=GH_GRASS_LT)

    scallop = scroll_off(t, 16, 600)
    for k in range(-1, W // 16 + 2):
        x = k * 16 - scallop
        d.ellipse([x, top_y + 3, x + 15, top_y + 13], fill=GH_GRASS)
        d.ellipse([x + 4, top_y + 4, x + 11, top_y + 9], fill=GH_GRASS_DK)
    d.rectangle([0, top_y + 12, W, top_y + 14], fill=GH_DIRT_EDGE)

    # checkerboard dirt
    tile = 13
    dirt_off = scroll_off(t, tile * 2, 600)
    for ri, row in enumerate(range(top_y + 14, H, tile)):
        for k in range(-1, W // (tile * 2) + 2):
            x = k * tile * 2 - dirt_off + (tile if ri % 2 else 0)
            d.rectangle([x, row, x + tile - 1, row + tile - 1], fill=GH_DIRT_B)

    # spinning rings: four-phase width squash, the way a sprite sheet does it
    ring_off = scroll_off(t, 96, 600)
    for k in range(-1, W // 96 + 2):
        rx = k * 96 - ring_off + 48
        ph = (t * 4) % 1.0
        rw = (11, 7, 2, 7)[int(ph * 4) % 4]
        ry = 66 + round(math.sin((t * 2 + k * 0.25) * math.tau) * 5)
        d.ellipse([rx - rw, ry, rx + rw, ry + 24], outline=GH_RING, width=4)
        if rw > 4:
            d.ellipse([rx - rw + 3, ry + 4, rx + rw - 3, ry + 20],
                      outline=GH_RING_DK, width=1)

    # the runner, with speed streaks behind
    frame = (i // 3) % 2
    ry = top_y - 34
    for k in range(5):
        sx = 44 - k * 11
        d.rectangle([sx, ry + 10 + k * 4, sx + 9 - k, ry + 11 + k * 4], fill=(198, 232, 255))
    _sprite(d, SPEEDSTER_RUN[frame], SPEEDSTER, 66, ry, s=2)
    return img


# --------------------------------------------------------------------------- #
# 2. Mushroom plains — the block-and-pipe platformer                           #
# --------------------------------------------------------------------------- #
MP_SKY = (92, 148, 252)
MP_BRICK, MP_BRICK_DK, MP_MORTAR = (200, 116, 56), (146, 74, 28), (60, 30, 12)
MP_Q, MP_Q_DK, MP_Q_LT = (252, 188, 56), (196, 128, 24), (255, 226, 140)
MP_PIPE, MP_PIPE_LT, MP_PIPE_DK = (64, 188, 84), (128, 232, 132), (28, 122, 48)
MP_BUSH, MP_BUSH_DK = (72, 200, 88), (34, 140, 60)
MP_HILL, MP_HILL_DK = (86, 196, 92), (44, 148, 64)
MP_CASTLE, MP_CASTLE_DK = (196, 108, 52), (132, 62, 24)
MP_COIN, MP_COIN_DK = (252, 210, 74), (198, 148, 26)
MP_GROUND, MP_GROUND_DK = (214, 148, 74), (150, 92, 34)


def _brick(d, x, y, s=18):
    d.rectangle([x, y, x + s - 1, y + s - 1], fill=MP_BRICK)
    d.rectangle([x, y, x + s - 1, y + 1], fill=(228, 152, 92))
    d.rectangle([x, y + s - 3, x + s - 1, y + s - 1], fill=MP_BRICK_DK)
    d.line([x, y + s // 2, x + s - 1, y + s // 2], fill=MP_MORTAR)
    d.line([x + s // 2, y, x + s // 2, y + s // 2], fill=MP_MORTAR)
    d.line([x, y + s // 2, x, y + s - 1], fill=MP_MORTAR)


def _qblock(d, x, y, blink, s=18):
    d.rectangle([x, y, x + s - 1, y + s - 1], fill=MP_Q if blink else MP_Q_LT)
    d.rectangle([x, y, x + s - 1, y + 1], fill=MP_Q_LT)
    d.rectangle([x, y + s - 3, x + s - 1, y + s - 1], fill=MP_Q_DK)
    d.rectangle([x + 1, y + 1, x + 2, y + 2], fill=MP_Q_DK)
    d.rectangle([x + s - 3, y + 1, x + s - 2, y + 2], fill=MP_Q_DK)
    d.rectangle([x + 1, y + s - 3, x + 2, y + s - 2], fill=MP_Q_DK)
    d.rectangle([x + s - 3, y + s - 3, x + s - 2, y + s - 2], fill=MP_Q_DK)
    # the question mark
    d.rectangle([x + 6, y + 4, x + 12, y + 6], fill=MP_MORTAR)
    d.rectangle([x + 10, y + 6, x + 12, y + 9], fill=MP_MORTAR)
    d.rectangle([x + 8, y + 8, x + 11, y + 10], fill=MP_MORTAR)
    d.rectangle([x + 8, y + 12, x + 10, y + 14], fill=MP_MORTAR)


def platformer(i):
    img, d = _frame(MP_SKY)
    t = i / N
    ground_y = 142

    cloud_off = scroll_off(t, 176, 60)
    for k in range(-1, W // 176 + 2):
        x = k * 176 - cloud_off
        _cloud(d, x, 14, 46)
        _cloud(d, x + 96, 30, 34)

    # stepped hills
    hill_off = scroll_off(t, 210, 130)
    for k in range(-1, W // 210 + 2):
        x = k * 210 - hill_off
        d.ellipse([x, ground_y - 48, x + 104, ground_y + 20], fill=MP_HILL)
        d.ellipse([x + 18, ground_y - 36, x + 48, ground_y - 12], fill=MP_HILL_DK)
        d.ellipse([x + 58, ground_y - 32, x + 84, ground_y - 12], fill=MP_HILL_DK)

    # castle, the classic end-of-stage silhouette
    castle_off = scroll_off(t, 400, 100)
    for k in range(-1, 2):
        cx = k * 400 - castle_off + 230
        d.rectangle([cx, ground_y - 64, cx + 84, ground_y], fill=MP_CASTLE)
        for row in range(ground_y - 58, ground_y, 11):
            d.line([cx, row, cx + 84, row], fill=MP_CASTLE_DK)
        for c in range(5):
            d.rectangle([cx + c * 18, ground_y - 74, cx + c * 18 + 11, ground_y - 62],
                        fill=MP_CASTLE)
            d.rectangle([cx + c * 18, ground_y - 74, cx + c * 18 + 11, ground_y - 71],
                        fill=MP_CASTLE_DK)
        d.rectangle([cx + 28, ground_y - 96, cx + 56, ground_y - 72], fill=MP_CASTLE)
        for c in range(3):
            d.rectangle([cx + 28 + c * 11, ground_y - 104, cx + 35 + c * 11, ground_y - 94],
                        fill=MP_CASTLE)
        d.rectangle([cx + 36, ground_y - 90, cx + 48, ground_y - 80], fill=MP_CASTLE_DK)
        d.rectangle([cx + 32, ground_y - 32, cx + 52, ground_y], fill=(40, 26, 16))
        d.ellipse([cx + 32, ground_y - 42, cx + 52, ground_y - 22], fill=(40, 26, 16))

    bush_off = scroll_off(t, 128, 240)
    for k in range(-1, W // 128 + 2):
        x = k * 128 - bush_off
        d.ellipse([x, ground_y - 26, x + 54, ground_y + 8], fill=MP_BUSH)
        d.ellipse([x + 30, ground_y - 20, x + 78, ground_y + 8], fill=MP_BUSH)
        d.ellipse([x + 8, ground_y - 18, x + 40, ground_y + 2], fill=MP_BUSH_DK)

    # warp pipes
    pipe_off = scroll_off(t, 196, 480)
    for k in range(-1, W // 196 + 2):
        x = k * 196 - pipe_off
        d.rectangle([x + 5, ground_y - 44, x + 37, ground_y], fill=MP_PIPE)
        d.rectangle([x + 7, ground_y - 44, x + 13, ground_y], fill=MP_PIPE_LT)
        d.rectangle([x + 30, ground_y - 44, x + 37, ground_y], fill=MP_PIPE_DK)
        d.rectangle([x, ground_y - 56, x + 42, ground_y - 42], fill=MP_PIPE)
        d.rectangle([x + 3, ground_y - 56, x + 9, ground_y - 42], fill=MP_PIPE_LT)
        d.rectangle([x + 35, ground_y - 56, x + 42, ground_y - 42], fill=MP_PIPE_DK)
        d.rectangle([x, ground_y - 56, x + 42, ground_y - 54], fill=(160, 246, 164))

    # floating row of bricks and question blocks
    block_y = 62
    blink = (i // 4) % 3 == 0
    # A repeating 12-slot pattern: two short brick runs, a lone question block
    # and a gap, which is how these stages actually lay blocks out.
    PATTERN = "bqb..q.....bbqb."
    block_off = scroll_off(t, 18 * len(PATTERN), 480)
    for rep in range(-1, W // (18 * len(PATTERN)) + 2):
        for k, slot in enumerate(PATTERN):
            if slot == ".":
                continue
            x = rep * 18 * len(PATTERN) + k * 18 - block_off
            if x < -20 or x > W + 4:
                continue
            if slot == "q":
                _qblock(d, x, block_y, blink)
            else:
                _brick(d, x, block_y)

    # ground
    d.rectangle([0, ground_y, W, H], fill=MP_GROUND)
    d.rectangle([0, ground_y, W, ground_y + 3], fill=(236, 180, 112))
    ground_off = scroll_off(t, 20, 480)
    for ri, row in enumerate(range(ground_y + 4, H, 14)):
        for k in range(-1, W // 20 + 2):
            x = k * 20 - ground_off + (10 if ri % 2 else 0)
            d.rectangle([x, row, x + 19, row + 13], outline=MP_GROUND_DK)

    # the jumper, and a coin knocked out of the block above the apex
    hop = max(0.0, math.sin(t * math.tau * 2))
    airborne = hop > 0.08
    py = ground_y - 36 - round(hop * 44)
    _sprite(d, JUMPER_FRAMES[1 if airborne else 0], JUMPER, 74, py, s=2)

    if hop > 0.5:
        c = (hop - 0.5) / 0.5
        cy = block_y - round(c * 30)
        cw = (7, 4, 1, 4)[int(c * 8) % 4]
        d.ellipse([84 - cw, cy, 84 + cw, cy + 16], fill=MP_COIN)
        d.ellipse([84 - max(1, cw - 2), cy + 3, 84 + max(1, cw - 2), cy + 13],
                  outline=MP_COIN_DK)
    return img


# --------------------------------------------------------------------------- #
# 3. Desert ops — the run-and-gun                                              #
# --------------------------------------------------------------------------- #
DO_SKY_TOP, DO_SKY_LOW = (244, 150, 70), (252, 218, 150)
DO_RUIN, DO_RUIN_DK = (176, 124, 82), (134, 90, 56)
DO_DUNE_FAR, DO_DUNE_MID = (206, 152, 96), (176, 122, 70)
DO_SAND, DO_SAND_DK, DO_SAND_LT = (224, 182, 118), (188, 144, 84), (240, 208, 156)
DO_TANK, DO_TANK_LT, DO_TANK_DK = (110, 124, 84), (146, 160, 112), (60, 70, 44)
DO_TREAD = (48, 50, 44)
DO_DRUM, DO_DRUM_DK = (188, 66, 48), (128, 38, 28)


def _explosion(d, x, y, p):
    """A three-ring blast: white core, orange body, smoke shell."""
    r = 6 + p * 44
    d.ellipse([x - r, y - r, x + r, y + r], outline=(120, 96, 84), width=5)
    d.ellipse([x - r * 0.78, y - r * 0.78, x + r * 0.78, y + r * 0.78], fill=(250, 142, 46))
    d.ellipse([x - r * 0.5, y - r * 0.5, x + r * 0.5, y + r * 0.5], fill=(252, 206, 96))
    d.ellipse([x - r * 0.22, y - r * 0.22, x + r * 0.22, y + r * 0.22], fill=(255, 250, 226))
    for k in range(6):
        a = k * math.tau / 6 + p * 2
        px = x + math.cos(a) * r * 1.25
        py = y + math.sin(a) * r * 1.05
        d.ellipse([px - 5, py - 5, px + 5, py + 5], fill=(180, 152, 132))


def rungun(i):
    img, d = _frame(DO_SKY_TOP)
    t = i / N
    _sky(d, DO_SKY_TOP, DO_SKY_LOW, 108)
    d.ellipse([238, 22, 296, 80], fill=(255, 232, 168))
    d.ellipse([246, 30, 288, 72], fill=(255, 244, 206))

    ground_y = 132

    # ruined skyline: varied so it does not read as a bar chart
    RUINS = ((46, 40), (30, 22), (62, 52), (24, 30), (40, 20), (54, 44))
    ruin_off = scroll_off(t, 320, 50)
    for k in range(-1, 2):
        base = k * 320 - ruin_off
        x = base
        for w, h in RUINS:
            d.rectangle([x, 112 - h, x + w, 116], fill=DO_RUIN)
            d.rectangle([x + w - 8, 112 - h, x + w, 116], fill=DO_RUIN_DK)
            d.rectangle([x, 112 - h, x + w, 112 - h + 3], fill=(206, 158, 112))
            for c in range(max(1, w // 16)):
                for r in range(max(1, h // 22)):
                    d.rectangle([x + 6 + c * 16, 112 - h + 10 + r * 20,
                                 x + 12 + c * 16, 112 - h + 18 + r * 20], fill=DO_RUIN_DK)
            x += w + 8

    dune_far = scroll_off(t, 88, 110)
    for k in range(-1, W // 88 + 2):
        x = k * 88 - dune_far
        d.polygon([(x, 124), (x + 44, 98), (x + 92, 124)], fill=DO_DUNE_FAR)
    dune_mid = scroll_off(t, 112, 220)
    for k in range(-1, W // 112 + 2):
        x = k * 112 - dune_mid
        d.polygon([(x, 136), (x + 56, 106), (x + 116, 136)], fill=DO_DUNE_MID)

    # sand
    d.rectangle([0, ground_y, W, H], fill=DO_SAND)
    d.rectangle([0, ground_y, W, ground_y + 3], fill=DO_SAND_LT)
    sand_off = scroll_off(t, 18, 420)
    for k in range(-1, W // 18 + 2):
        x = k * 18 - sand_off
        d.rectangle([x, ground_y + 10, x + 7, ground_y + 12], fill=DO_SAND_DK)
        d.rectangle([x + 9, ground_y + 26, x + 17, ground_y + 28], fill=DO_SAND_DK)
        d.ellipse([x + 4, ground_y + 34, x + 11, ground_y + 39], fill=DO_SAND_DK)

    # the boxy tracked vehicle, crossing the full frame once per loop
    period = W + 200
    tx = int(W + 40 - scroll_off(t, period, period))
    d.rectangle([tx, ground_y - 34, tx + 88, ground_y - 12], fill=DO_TANK)
    d.rectangle([tx, ground_y - 34, tx + 88, ground_y - 30], fill=DO_TANK_LT)
    d.rectangle([tx, ground_y - 18, tx + 88, ground_y - 12], fill=DO_TANK_DK)
    for rv in range(6):
        d.rectangle([tx + 8 + rv * 14, ground_y - 26, tx + 11 + rv * 14, ground_y - 23],
                    fill=DO_TANK_DK)
    d.rectangle([tx + 20, ground_y - 58, tx + 62, ground_y - 32], fill=DO_TANK)
    d.rectangle([tx + 20, ground_y - 58, tx + 62, ground_y - 54], fill=DO_TANK_LT)
    d.rectangle([tx + 54, ground_y - 58, tx + 62, ground_y - 32], fill=DO_TANK_DK)
    # hatch and driver
    d.rectangle([tx + 28, ground_y - 70, tx + 52, ground_y - 56], fill=DO_TANK_DK)
    d.ellipse([tx + 32, ground_y - 78, tx + 48, ground_y - 62], fill=(246, 200, 158))
    d.rectangle([tx + 32, ground_y - 78, tx + 48, ground_y - 71], fill=(200, 44, 44))
    d.rectangle([tx + 36, ground_y - 70, tx + 38, ground_y - 68], fill=(30, 26, 22))
    d.rectangle([tx + 43, ground_y - 70, tx + 45, ground_y - 68], fill=(30, 26, 22))
    # gun
    d.rectangle([tx - 34, ground_y - 52, tx + 24, ground_y - 44], fill=DO_TANK_DK)
    d.rectangle([tx - 42, ground_y - 54, tx - 30, ground_y - 42], fill=DO_TANK)
    # treads
    d.rectangle([tx - 4, ground_y - 14, tx + 92, ground_y + 3], fill=DO_TREAD)
    for w in range(7):
        d.ellipse([tx + 2 + w * 13, ground_y - 12, tx + 15 + w * 13, ground_y + 1],
                  fill=DO_TANK_DK)
        d.ellipse([tx + 6 + w * 13, ground_y - 8, tx + 11 + w * 13, ground_y - 3],
                  fill=DO_TANK_LT)
    link = int(scroll_off(t, 8, 420))
    for lx in range(tx - 4 - link, tx + 94, 8):
        d.rectangle([lx, ground_y - 14, lx + 3, ground_y - 11], fill=(88, 92, 82))
        d.rectangle([lx, ground_y, lx + 3, ground_y + 3], fill=(88, 92, 82))

    # oil drums and sandbag emplacements in the foreground
    prop_off = scroll_off(t, 160, 420)
    for k in range(-1, W // 160 + 2):
        x = k * 160 - prop_off
        d.rectangle([x, ground_y - 26, x + 22, ground_y + 2], fill=DO_DRUM)
        d.rectangle([x + 16, ground_y - 26, x + 22, ground_y + 2], fill=DO_DRUM_DK)
        d.rectangle([x, ground_y - 21, x + 22, ground_y - 18], fill=(236, 200, 100))
        d.rectangle([x, ground_y - 9, x + 22, ground_y - 6], fill=(236, 200, 100))

        bx0 = x + 74
        for row in range(3):
            for col in range(3 - row):
                bx = bx0 + col * 22 + row * 11
                by = ground_y - 12 - row * 11
                d.ellipse([bx, by, bx + 23, by + 13], fill=(206, 176, 108))
                d.ellipse([bx + 3, by + 3, bx + 20, by + 9], fill=(172, 140, 78))

    # trooper firing
    fire = (t * 4) % 1.0
    _sprite(d, TROOPER_FRAMES[0 if fire < 0.5 else 1], TROOPER, 36, ground_y - 34, s=2)
    if fire < 0.28:
        d.polygon([(70, ground_y - 16), (94, ground_y - 26), (94, ground_y - 6)],
                  fill=(255, 240, 160))
        d.polygon([(70, ground_y - 16), (86, ground_y - 21), (86, ground_y - 11)],
                  fill=(255, 255, 236))
        d.rectangle([92, ground_y - 19, 112, ground_y - 13], fill=(255, 202, 92))

    boom = (t * 2) % 1.0
    if boom < 0.46:
        _explosion(d, 236, ground_y - 40, boom / 0.46)
    return img


# --------------------------------------------------------------------------- #
# 4. Starfield shooter                                                          #
# --------------------------------------------------------------------------- #
SPACE = (10, 8, 26)


def shooter(i):
    img, d = _frame(SPACE)
    t = i / N

    for layer, (a, b) in enumerate(((37, 11), (91, 53), (149, 97))):
        speed = 20 + layer * 30
        shade = (86 + layer * 62,) * 3
        size = layer  # nearer stars are chunkier
        for k in range(32):
            x = (a * k) % W
            y = ((b * k) + scroll_off(t, H, speed * 6)) % H
            d.rectangle([x, y, x + size, y + size], fill=shade)

    py = int(scroll_off(t, H + 120, H + 120)) - 60
    d.ellipse([228, py, 296, py + 68], fill=(50, 38, 94))
    d.ellipse([240, py + 10, 280, py + 44], fill=(78, 58, 134))
    d.ellipse([256, py + 30, 274, py + 46], fill=(50, 38, 94))

    for k in range(5):
        ey = int((scroll_off(t, H + 56, (H + 56) * 2) + k * 42) % (H + 56)) - 28
        ex = int(40 + k * 52 + math.sin((t * math.tau) + k) * 18)
        d.polygon([(ex, ey), (ex + 28, ey), (ex + 14, ey + 22)], fill=(226, 76, 140))
        d.rectangle([ex + 4, ey, ex + 24, ey + 6], fill=(166, 40, 96))
        d.rectangle([ex + 10, ey + 5, ex + 18, ey + 12], fill=(255, 196, 220))
        d.rectangle([ex + 12, ey + 7, ex + 16, ey + 10], fill=(120, 22, 70))

    sx = int(W / 2 + math.sin(t * math.tau) * 52)
    sy = 142
    d.polygon([(sx, sy - 24), (sx - 20, sy + 12), (sx + 20, sy + 12)], fill=(72, 176, 220))
    d.polygon([(sx, sy - 16), (sx - 10, sy + 12), (sx + 10, sy + 12)], fill=(226, 244, 255))
    d.rectangle([sx - 4, sy - 8, sx + 4, sy + 6], fill=(46, 128, 180))
    d.rectangle([sx - 3, sy - 6, sx + 3, sy - 1], fill=(140, 230, 255))
    flick = (i % 3) * 4
    d.rectangle([sx - 5, sy + 11, sx + 5, sy + 20 + flick], fill=(255, 190, 84))
    d.rectangle([sx - 2, sy + 11, sx + 2, sy + 26 + flick], fill=(255, 246, 196))

    for k in range(3):
        by = int((sy - 28 - (scroll_off(t, H + 48, (H + 48) * 3) + k * 40)) % (H + 48))
        d.rectangle([sx - 2, by, sx + 2, by + 12], fill=(255, 246, 170))
        d.rectangle([sx - 1, by - 3, sx + 1, by + 15], fill=(255, 255, 236))
    return img


SCENES = {
    "hillside": hillside,
    "platformer": platformer,
    "rungun": rungun,
    "shooter": shooter,
}
