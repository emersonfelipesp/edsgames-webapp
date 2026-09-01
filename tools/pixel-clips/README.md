# Pixel-art clips

The looping animations on the site are generated here, not filmed and not
downloaded. Everything is drawn from primitives in `scenes.py` at 320×180 — close to the
real Genesis and Neo Geo working resolutions — and upscaled with
nearest-neighbour, which is what gives the authentic chunky-pixel look.

## Why they are generated

The site is nostalgic about Sonic, Mario and Metal Slug, and the obvious move
would be to embed footage of them. That footage belongs to SEGA, Nintendo and
SNK, and hosting it on a site that also sells hardware is a takedown waiting to
happen.

So these scenes go after the thing that actually makes a stage recognisable: its
**level design language**. Checkerboard hills, loops, palms and spinning rings.
Brick and question blocks over warp pipes with a castle on the horizon. A desert
firefight around a boxy tracked vehicle, with sandbags and oil drums. That
furniture is what a player recognises in the first half second.

What is deliberately *not* reproduced is any protagonist. The three characters
are original sprites, drawn here, and no logo, title screen or level layout is
copied. Nothing is traced or extracted from a ROM. Everything ships under the
repository's own licence.

## Regenerating

```bash
python3 -m venv .venv
./.venv/bin/pip install pillow
./.venv/bin/python tools/pixel-clips/render.py
```

Requires `ffmpeg` built with `libvpx-vp9` and `libx264`. Output lands in
`public/video/` as `<name>.webm`, `<name>.mp4` and `<name>.webp` (the poster,
which is frame 0).

## Adding a scene

Write a `def myscene(i)` that returns a `PIL.Image` for frame `i` of `N`, and
add it to `SCENES`. Two rules make the result loop cleanly:

- Every animated quantity must be a function of `i / N`.
- Every scrolling offset must be taken modulo its own tile width, so the last
  frame joins the first without a jump.

Then add the name to `CLIPS` in `components/media/RetroClip.tsx`.

## Sizes

Four clips, twelve files. A browser fetches exactly one file per clip — the
WebM if it can, the MP4 otherwise — so the cost of a visible clip is about
60–120 KB. The WebGL runtime these replaced was 237 KB compressed before a
single frame was drawn.
