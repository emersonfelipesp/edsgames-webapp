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
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing the copy](#editing-the-copy)
- [The PIX payload](#the-pix-payload)
- [Three.js scenes](#threejs-scenes)
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
| Third-party requests | 7 CDNs, Meta Pixel, Mailchimp, a YouTube embed on load | None. Fonts and images are self-hosted; YouTube loads only on click |
| Images | ~2.5 MB of Blogger-hosted PNG, hotlinked | ~400 KB of WebP, committed to the repository |
| Sales page | `/p/vendas.html` is empty | A real store page built from the homepage sales copy |
| 3D | None | Four procedural Three.js scenes, code-split and capability-gated |

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
  origin. A visitor's browser never contacts a font CDN.
- **React Three Fiber and drei.** Only for the decorative scenes, always
  code-split, never in the initial payload.

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
  globals.css      design tokens and base styles
  not-found.tsx    bilingual 404 (has its own <html>, see below)
  sitemap.ts  robots.ts  icon.png  apple-icon.png

components/
  pages/           one component per page, taking a `locale`
  sections/        the page sections, all server components
  site/            header, footer, page shell, language toggle
  three/           models, scenes, canvas stage, lazy loader
  ui/              button, panel, section, PIX copy button

lib/
  i18n/            pt-BR.ts (source), en.ts (translation), index.ts
  routes.ts        the per-locale route table
  pix.ts           the PIX payload — read the warning in that file
  csp.ts           the Content Security Policy
  fonts.ts  metadata.ts  cn.ts
  hooks/           reduced motion, in-view, device-capability

public/img/        every image, vendored from the original site
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

## Three.js scenes

Four models — a console, a cartridge, a gamepad and a voxel character — are
built from primitives in `components/three/models/`. Nothing is loaded from a
`.glb` or `.gltf`, so there is no third-party model licence to track and the
scenes take their colours from the site palette in `components/three/palette.ts`.

Everything goes through `components/three/LazyScene.tsx`, which:

- code-splits each scene behind `next/dynamic` with `ssr: false`, keeping the
  Three.js runtime out of the initial payload of every route;
- mounts a scene only once it has come near the viewport;
- then **pauses** rather than unmounting when it scrolls away, because tearing
  the canvas down drops and re-creates a WebGL context on every pass;
- skips the bundle entirely — about 237 KB compressed — for visitors on Data
  Saver, on a 2G or 3G connection, or on a device reporting under 2 GB of
  memory;
- renders a single still frame under `prefers-reduced-motion`;
- marks every canvas `aria-hidden`, because they are decoration.

Phones additionally render at a lower pixel ratio and skip shadow maps.

## Security

The site is static, so there is no server-side attack surface. What is left is
the delivery layer, and it is handled deliberately:

- A Content Security Policy in `lib/csp.ts`, emitted as a `<meta http-equiv>`
  tag and documented for the host to send as a real header.
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
- Contrast meets WCAG AA against the dark palette on every combination in use.
  This is the easiest thing to break here: if you add a colour, check it.
- `prefers-reduced-motion` is respected by the CSS and by every 3D scene.
- Decorative images have empty `alt`; decorative canvases are `aria-hidden`.

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
