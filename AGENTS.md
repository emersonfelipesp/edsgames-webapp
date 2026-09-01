# Working in this repository

Conventions an AI coding agent needs before changing anything here. The full
reasoning is in [README.md](./README.md); this file is the short list of things
that will break if you do not know them.

## Hard rules

1. **Never edit the PIX payload in `lib/pix.ts`.** It is an EMV static BR Code
   whose last four characters are a CRC-16 checksum. Any change — including
   trimming the odd spacing inside the merchant-name field — makes every
   Brazilian bank app reject it, and no test or lint rule will catch it. For the
   same reason, never regenerate, resize or re-encode
   `public/img/pix-qrcode.png`.

2. **The site is a static export.** `next.config.ts` sets `output: 'export'`.
   Do not add middleware, route handlers, Server Actions, `revalidate`, or
   anything else that needs a server. If a feature seems to need one, it does
   not belong here.

3. **No user-visible string goes in a component.** All copy lives in
   `lib/i18n/pt-BR.ts` and `lib/i18n/en.ts`. Portuguese is the source; `en.ts`
   is typed as `Dictionary`, which is inferred from the Portuguese file, so
   adding a Portuguese key without its English counterpart fails the build.
   That is intentional — do not weaken the type to work around it.

4. **Three.js only through `components/three/LazyScene.tsx`.** Never import
   `three`, `@react-three/fiber` or `@react-three/drei` from a component that
   ends up in the initial payload. Scenes are `next/dynamic` with `ssr: false`,
   mounted on approach, paused rather than unmounted, and skipped entirely on
   constrained devices.

5. **No third-party scripts.** No analytics, tag managers or tracking pixels —
   the original site had a Meta Pixel and a Mailchimp tag and they were removed
   on purpose. Adding one means editing `lib/csp.ts`, which is the signal that
   you are doing something the project decided against.

6. **No `dangerouslySetInnerHTML`, `eval`, `new Function`, or dynamic script
   injection.** There is no case for any of them in a static marketing site.
   The pre-paint theme script is a separate same-origin file,
   `public/theme-init.js`, precisely so that this rule holds. Keep it
   dependency-free, keep it synchronous — deferring it reintroduces the theme
   flash it exists to prevent — and keep it wrapped in `try`/`catch`, because
   `localStorage` throws outright in some privacy modes.

7. **Never hard-code a colour that assumes the dark theme.** Every colour comes
   from a token in `app/globals.css`, and the light theme redefines those same
   tokens. Four token pairs deliberately do not invert — `--color-accent` and
   `--color-on-accent`, `--color-plate`, and `--color-media-scrim` with
   `--color-on-media` — and they exist so that a call to action, artwork on a
   dark plate, and text over photography keep working when the ground flips.
   Reach for those rather than inventing a literal.

8. **The display face must draw accented uppercase.** Portuguese is the default
   language, and most pixel fonts fail this: Press Start 2P renders "APÓS
   EXTRAÍDO CONTRIBUIÇÃO" as "APóS EXTRAíDO CONTRIBUIÇAO", and Sixtyfour drops
   the tilde. Both were tried and rejected. Requesting `latin-ext` does not fix
   it — those faces *have* the codepoints and simply draw them wrong, so no
   fallback can rescue them. Render that sample string before swapping the font.

## Structure

- There is deliberately **no `app/layout.tsx`**. The route groups `app/(pt)` and
  `app/(en)` each provide their own root layout, which is what gives each
  language a correct `lang` attribute while Portuguese stays at the site root.
  Adding a shared root layout breaks internationalisation.
- `app/not-found.tsx` renders its own `<html>` and `<body>` for the same reason.
- Sections are server components. Only things that genuinely need browser APIs
  are `"use client"`: the header drawer, the PIX copy button, the video facade
  and the Three.js tree.

## Adding a route

1. Add the page to both trees under `app/`.
2. Add its paths to `PATHS` in `lib/routes.ts`.
3. Add its key to `ROUTE_KEYS` in `app/sitemap.ts`.

The language toggle and the sitemap read from those tables, so a route added
anywhere else will be unreachable in the other language.

## Styling

Design tokens are declared once in `app/globals.css` under `@theme`. Use them —
`text-neon-cyan`, `bg-panel`, `font-display` — rather than raw hex values.

Two things to check when you add a colour or a control:

- **Contrast, in both themes.** It is easy to land under WCAG AA on either
  ground — `--color-faint` was corrected once on dark, and the video-facade
  caption once on light, where it had been inheriting a token that inverted out
  from under it. Check a new colour against both palettes.
- **Display utilities collide.** `ButtonLink` carries `inline-flex` in its base
  class string, so adding `hidden sm:inline-flex` at the call site does *not*
  hide it — which utility wins depends on stylesheet order, not on the order of
  the class names. Wrap the element instead.

## Before you finish

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

If the change is visual, also serve `out/` and look at it at 320 px, 390 px and
1280 px, **in both themes**. Mobile-first is a requirement of this project, not
a preference, and 320 px is the width where the header runs out of room first —
it carries a logo, the language toggle, the theme toggle and the menu button.
