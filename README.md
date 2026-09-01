# edsgames-webapp

A modern, retro-themed rebuild of [edsgames.com.br](https://www.edsgames.com.br/),
the site of the **EDSGAMES** community — a non-profit Brazilian project that
distributes ready-to-run RetroBAT and Batocera emulator systems.

The original runs on Blogger with Bootstrap 3, jQuery, Owl Carousel, Flickity,
Font Awesome, a Meta Pixel and a Mailchimp tag, all pulled from seven different
CDNs. This repository keeps every word of that site and replaces everything
underneath it.

---

## Table of contents

- [What changed](#what-changed)
- [Stack, and why](#stack-and-why)
- [Type](#type)
- [Themes](#themes)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing the copy](#editing-the-copy)
- [The PIX payload](#the-pix-payload)
- [Game screenshots](#game-screenshots)
- [Security](#security)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Licence](#licence)

---

## What changed

| | Original | This repository |
|---|---|---|
| Platform | Blogger template | Next.js App Router, exported to static HTML |
| Languages | Brazilian Portuguese only | Brazilian Portuguese and English, both statically generated |
| Themes | One, light | Light and dark, following the operating system by default, with a toggle |
| Third-party requests | 7 CDNs, Meta Pixel, Mailchimp, a YouTube embed on load | None. Fonts and images are self-hosted; YouTube loads only on click |
| Images | ~2.5 MB of Blogger-hosted PNG, hotlinked | ~700 KB of WebP, committed to the repository |
| Sales page | `/p/vendas.html` is empty | A real store page built from the homepage sales copy |
| Artwork | One interface capture | Eighteen game screenshots at native resolution, across six systems, lazily loaded |

The content itself is unchanged in substance. Obvious typographic errors in the
Portuguese source were corrected; nothing was added, softened or invented.

## Stack, and why

- **Next.js (App Router) with `output: 'export'`.** The site is pure static
  HTML, CSS, JavaScript and images. There is no server runtime and no database,
  which is what "secure by default" means here: there is nothing to inject into,
  authenticate against, or leak from. It also means no middleware, which is why
  internationalisation is done with two route trees rather than a locale
  negotiator.
- **TypeScript.** The English dictionary is typed against the Portuguese one, so
  a missing translation is a build error rather than a blank space on the page.
- **Tailwind CSS v4.** All design tokens are CSS custom properties declared once
  in `app/globals.css` under `@theme`. No component carries an ad-hoc colour.
- **`next/font`.** Fonts are downloaded at build time and served from our own
  origin. A visitor's browser never contacts a font CDN. See [Type](#type).
- **No runtime dependencies beyond React and Next.** Every section is server
  rendered and the artwork is plain `<img>`, so there is no WebGL runtime, no
  player and no motion library: `package.json` lists exactly three production
  dependencies.

## Type

Two faces, one for each half of the brief.

- **Silkscreen** for display: headings, buttons and labels. A genuine bitmap
  face — the lettering of a cabinet marquee or an 8-bit title screen.
- **IBM Plex Mono** for body copy and interface text. The terminal half: it
  carries the "old computing" feeling while staying readable at paragraph
  length, which a bitmap terminal font such as VT323 does not.

Silkscreen was chosen empirically rather than by taste. **Most pixel faces draw
accented uppercase badly or not at all**, and this site's default language is
Portuguese, so that disqualifies them outright:

| Face | `APÓS EXTRAÍDO CONTRIBUIÇÃO DÚVIDAS` |
|---|---|
| Press Start 2P | `APóS EXTRAíDO CONTRIBUIÇAO DúVIDAS` ✗ |
| Sixtyfour | `APÓS EXTRAíDO CONTRIBUIÇAO DÓVIDAS` ✗ |
| **Silkscreen** | `APÓS EXTRAÍDO CONTRIBUIÇÃO DÚVIDAS` ✓ |

Silkscreen also ships a real 700 weight, so bold headings are drawn rather than
synthetically smeared — which matters more for a bitmap face than for a normal
one.

**If you change the display face, render that sample string first.** No subset
setting can rescue a face that draws those glyphs badly: Press Start 2P *has*
the codepoints and simply draws them as undersized lowercase forms, so the
browser never falls back.

Both faces request the **`latin` subset only**. That was verified against the
generated `@font-face` rules: every accent Portuguese needs sits in `latin`
(U+0000–00FF), and `latin-ext` (U+0100–024F) covers none of them. Adding it
preloaded four font files the site can never use.

## Themes

The site ships light and dark, and **follows the operating system by default**.

- The palette lives entirely in CSS custom properties. `@theme` in
  `app/globals.css` holds the dark values, and the light theme redefines the
  same variables, so no utility, shadow or `color-mix()` needs to know which
  theme is active.
- The toggle in the header and footer cycles three states: **follow the system**,
  force light, force dark. "System" is a real state, not an implicit default, so
  a visitor who once picked a theme can hand control back to their OS.
- The choice is stored in `localStorage` and applied by the small inline script
  in `lib/theme-init-script.ts` before the first paint, so a forced theme never
  flashes the other one. It is inlined rather than fetched because as an
  external file it cost 304 ms of render-blocking time on mobile for 1.1 KB.
- **With JavaScript disabled the site still follows the system**, because the
  `prefers-color-scheme` media query does that on its own. The script only ever
  applies a stored override.
- `<meta name="theme-color">` is kept in step by `ThemeColorSync`, so the
  browser chrome never disagrees with the page.

A few colours deliberately do **not** invert, and they have their own tokens:

| Token | Why |
|---|---|
| `--color-accent` / `--color-on-accent` | The call to action stays the same warm amber in both themes, so its foreground cannot follow the page ground |
| `--color-plate` | A permanently dark plate behind artwork that only reads on dark — the neon logo, the near-white trust seals. Transparent in the dark theme |
| `--color-media-scrim` / `--color-on-media` | Text sitting on photography, which is dark in both themes |

The neon accents are darkened rather than reused in the light theme: `#22e1f2`
on white is about 1.6:1 and unreadable.

## Getting started

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # static export into ./out
pnpm lint       # ESLint
pnpm exec tsc --noEmit
```

`pnpm build` writes a complete, self-contained site into `out/`. To preview
exactly what will be deployed:

```bash
pnpm build && npx serve out
```

## Project structure

```
app/
  (pt)/            Portuguese route tree, served at /
    layout.tsx     root layout, lang="pt-BR"
    page.tsx  download/  loja/  contribua/
  (en)/            English route tree, served at /en
    layout.tsx     root layout, lang="en"
    en/page.tsx  en/download/  en/store/  en/contribute/
  globals.css      design tokens, both palettes, base styles
  not-found.tsx    bilingual 404 (has its own <html>, see below)
  sitemap.ts  robots.ts  icon.png  apple-icon.png

components/
  pages/           one component per page, taking a `locale`
  sections/        the page sections, all server components
  media/           the game-screenshot grid and the YouTube facade
  site/            header, footer, page shell, language and theme toggles
  ui/              button, panel, section, PIX copy button

lib/
  i18n/            pt-BR.ts (source), en.ts (translation), index.ts
  routes.ts        the per-locale route table
  pix.ts           the PIX payload — read the warning in that file
  csp.ts           the Content Security Policy
  theme.ts         theme preference store and the resolved-theme hook
  theme-init-script.ts  the inline pre-paint theme bootstrap
  fonts.ts  metadata.ts  cn.ts

public/
  _headers         security and caching headers for Netlify / Cloudflare Pages
  img/             every image, vendored from the original site
    games/         the game screenshots, at each system's native resolution
```

Two details worth knowing before you move things around:

- **There is no `app/layout.tsx`.** The two route groups each provide their own
  root layout, which is what lets each language emit a correct `lang`
  attribute. Adding a shared root layout would break that.
- **`app/not-found.tsx` renders its own `<html>` and `<body>`.** With multiple
  root layouts there is no shared shell for it to inherit.

## Editing the copy

No user-visible string lives in a component. All of it is in
`lib/i18n/pt-BR.ts` and `lib/i18n/en.ts`.

`pt-BR.ts` is the source of truth: `Dictionary` is inferred from it, and `en.ts`
is typed as `Dictionary`. Adding a key to the Portuguese file therefore makes
the build fail until the English file has it too, which is the point.

To add a section:

1. Add its strings to `lib/i18n/pt-BR.ts`.
2. Add the same keys to `lib/i18n/en.ts` — `pnpm exec tsc --noEmit` will tell
   you exactly what is missing.
3. Build the component in `components/sections/`, taking `dict: Dictionary`.
4. Render it from `components/pages/HomePage.tsx` or a new page component.

To add a route, add it to both trees under `app/`, to the `PATHS` table in
`lib/routes.ts`, and to `ROUTE_KEYS` in `app/sitemap.ts`. The language toggle
and the sitemap pick it up from there.

## The PIX payload

EDSGAMES is funded by voluntary contributions through PIX, Brazil's instant
payment system. The payload lives in `lib/pix.ts`:

```
00020101021126580014br.gov.bcb.pix0136bc30ce17-…-32bbb8ced298…62070503***63043244
```

**Do not edit this string.** It is an EMV static BR Code, and its last four
characters are a CRC-16 checksum over everything before them. Reformatting it,
trimming the unusual spacing inside the merchant-name field, or "tidying" it in
any way invalidates the checksum, and every Brazilian bank app will reject the
resulting code. Donations would silently stop working, and nothing in CI would
catch it.

For the same reason `public/img/pix-qrcode.png` is the original file from the
live site, committed byte for byte. It is never regenerated, resized or
re-encoded.

## Game screenshots

Four grids of screenshots run through the site: the 16-bit consoles on the home
page, the 32- and 64-bit generation beside the feature grid, the disc era in the
store, and a wider arcade-and-cartridge spread on the download page. Eighteen
images in total, in `public/img/games/`.

They are **real frames from the games the product actually runs** — Mega Drive,
Super Nintendo, Neo Geo, Nintendo 64, PlayStation and Dreamcast — captured at
each system's native resolution. A Mega Drive frame is 320x224 and stays 320x224
in the repository; the browser upscales it with `image-rendering: pixelated`, so
nothing is smoothed and a 224-line frame still reads as one. Sources with a flat
palette are stored as lossless WebP, the 3D-era frames as quality-90 lossy, and
the whole set is about 310 KB.

An earlier revision drew these scenes from primitives instead, to keep publisher
artwork off a site that also sells hardware. That trade was reversed
deliberately: hand-drawn approximations of Sonic and Metal Slug read as
amateurish next to the product they are selling, and the screenshots are the
product. If a rights holder objects, the fix is to replace the file in
`public/img/games/` — no code changes, because the component only knows paths
and intrinsic sizes.

Display goes through `components/media/GameShots.tsx`, which:

- is a **server component**, because a static image needs no browser API: there
  is no player, no capability gate and no motion to negotiate;
- reserves each tile's space from the intrinsic width and height, so nothing
  shifts as the files arrive;
- lazily loads every tile and decodes it asynchronously;
- crops to a 4:3 tile with `object-cover`, which is within a few percent of every
  source's native aspect;
- marks the whole grid `aria-hidden` with empty `alt`, because the surrounding
  copy already says what the library contains.

Adding a screenshot means dropping the WebP into `public/img/games/` and adding
its path and intrinsic size to a set in that component.

## Publishing download checksums

The two files on `/download/` are bootable system images: a visitor writes one
to a disk, destroying its contents, and boots it. They travel through a
third-party unlock page and are unsigned, so a swapped file would be installed
with nothing to catch it.

`lib/i18n/*.ts` therefore gives each entry in `downloadPage.downloads` a
`checksum` field. While it is `null` the page shows an honest "not verified yet"
advisory — a placeholder hash would be worse than none, because a visitor would
compare against it and believe the answer.

To publish the real ones, hash each released file and paste the result into both
dictionaries:

```bash
sha256sum EDSBATOCERA-V32GB.zip EDSRETROBAT-V32GB.zip
```

The page then renders each hash with the `certutil` / `sha256sum` / `shasum`
commands a visitor needs to check it.

## Security

The site is static, so there is no server-side attack surface. What is left is
the delivery layer, and it is handled deliberately:

- A Content Security Policy in `lib/csp.ts`, emitted as a `<meta http-equiv>`
  tag and documented for the host to send as a real header. Enforcement is
  verified by injection rather than by an absence of console errors: a
  cross-origin script, image, `fetch` and iframe are all refused.
- No third-party script origins at all. No analytics, no tag manager, no
  tracking pixel. The only third-party origin in the whole policy is
  `youtube-nocookie.com`, in `frame-src`, reachable only after a visitor clicks
  the video.
- `rel="noopener noreferrer"` on every external link.
- No `dangerouslySetInnerHTML`, no `eval`, no `new Function`, no dynamic script
  injection anywhere in the codebase.
- Self-hosted fonts and images, so there are no CDN origins to trust.

`script-src` does allow `'unsafe-inline'`, and that is worth being explicit
about. Next.js emits an inline bootstrap script into every exported page, and a
static export cannot carry a per-request nonce. The exposure is bounded by
everything above: no external script origin is permitted, the site has no forms
and no user input, and nothing is ever rendered as markup. See DEPLOYMENT.md for
how to tighten this to script hashes at the header level.

## Accessibility

- Semantic landmarks, a skip link, and a continuous heading order on every
  route.
- Every interactive control is keyboard-operable. The FAQ and the PIX key
  disclosure use native `<details>`, so they work with no JavaScript at all.
- Touch targets are at least 44 px.
- Contrast meets WCAG AA in **both** themes, verified by walking every text
  node in the rendered page and computing the ratio against its composited
  background. This is the easiest thing to break here: if you add a colour,
  check it in light *and* dark.
- `prefers-reduced-motion` is respected by the CSS, and `prefers-color-scheme`
  selects the theme when the visitor has not chosen one.
- Decorative images have empty `alt`; the screenshot grids are `aria-hidden`.

## Deployment

`pnpm build` produces `out/`, which any static host can serve. See
[DEPLOYMENT.md](./DEPLOYMENT.md) for the security headers the host should send,
with ready-to-use configuration for Netlify, Cloudflare Pages, Vercel and nginx.

## Licence

The application code is MIT licensed — see [LICENSE](./LICENSE).

The EDSGAMES name, logo, screenshots, box art and marketing copy belong to the
EDSGAMES project and are included here to run its own site. They are not covered
by the MIT licence. Console and platform names and logos are trademarks of their
respective owners, reproduced from the original site.
