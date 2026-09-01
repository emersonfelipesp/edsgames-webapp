#!/usr/bin/env python3
"""
Renders the site's pixel-art clips from `scenes.py` and encodes them.

    python3 -m venv .venv && ./.venv/bin/pip install pillow
    ./.venv/bin/python tools/pixel-clips/render.py

Writes `<name>.webm`, `<name>.mp4` and `<name>.webp` (the poster) into
`public/video/`. Requires ffmpeg with libvpx-vp9 and libx264.

The frames are drawn at 256x144 and upscaled with nearest-neighbour, which is
what produces the chunky-pixel look; encoding a smooth-scaled source instead
would blur exactly the thing that makes these read as retro.
"""

import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import scenes  # noqa: E402

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "video")
UPSCALE = 4


def encode(name, frame_dir, out_dir):
    webm = os.path.join(out_dir, f"{name}.webm")
    mp4 = os.path.join(out_dir, f"{name}.mp4")
    pattern = os.path.join(frame_dir, "f%03d.png")

    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(scenes.FPS), "-i", pattern,
         "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1",
         "-deadline", "good", "-pix_fmt", "yuv420p", "-an", webm],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(scenes.FPS), "-i", pattern,
         "-c:v", "libx264", "-crf", "25", "-preset", "veryslow", "-profile:v", "main",
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4],
        check=True,
    )
    Image.open(os.path.join(frame_dir, "f000.png")).convert("RGB").save(
        os.path.join(out_dir, f"{name}.webp"), "WEBP", quality=82, method=6
    )


def main():
    out_dir = os.path.normpath(OUT_DIR)
    os.makedirs(out_dir, exist_ok=True)

    for name, render in scenes.SCENES.items():
        frame_dir = tempfile.mkdtemp(prefix=f"clip-{name}-")
        try:
            for i in range(scenes.N):
                frame = render(i).resize(
                    (scenes.W * UPSCALE, scenes.H * UPSCALE), Image.NEAREST
                )
                frame.save(os.path.join(frame_dir, f"f{i:03d}.png"))
            encode(name, frame_dir, out_dir)
            print(f"wrote {name}.webm / {name}.mp4 / {name}.webp")
        finally:
            shutil.rmtree(frame_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
