# Install guide (English)

This guide explains how to set up the **edsgames-webapp** project for local
development and how to build it for production deployment.

The site is a **static export** — there is no Node.js server in production. A
build writes plain HTML, CSS, JavaScript and assets into the `out/` directory,
which any static host can serve.

See also: [Guia de instalação em português](./INSTALL.pt-BR.md) ·
[Deployment](../DEPLOYMENT.md) · [README](../README.md)

---

## Table of contents

- [Requirements](#requirements)
- [Clone the repository](#clone-the-repository)
- [Development](#development)
  - [Install dependencies](#install-dependencies)
  - [Start the dev server](#start-the-dev-server)
  - [Useful development commands](#useful-development-commands)
  - [What to expect in development](#what-to-expect-in-development)
- [Production build](#production-build)
  - [Build the static site](#build-the-static-site)
  - [Preview the production output locally](#preview-the-production-output-locally)
  - [Deploy to production](#deploy-to-production)
  - [Before the first public deploy](#before-the-first-public-deploy)
- [Troubleshooting](#troubleshooting)

---

## Requirements

| Tool | Version |
|---|---|
| **Node.js** | 22 LTS (`>=22.0.0 <23`) — CI uses **22.23.2** |
| **pnpm** | **10.32.1** (pinned in `package.json`) |

Install Node.js 22 from [nodejs.org](https://nodejs.org/) or your system package
manager. Enable Corepack and activate the pinned pnpm release:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
pnpm --version   # should print 10.32.1
```

No environment variables, database or external services are required to develop
or build this project.

---

## Clone the repository

```bash
git clone https://github.com/emersonfelipesp/edsgames-webapp.git
cd edsgames-webapp
```

If you use the Gitea mirror:

```bash
git clone git@git.nmulti.cloud:emersonfelipesp/edsgames-webapp.git
cd edsgames-webapp
```

---

## Development

### Install dependencies

From the repository root:

```bash
pnpm install
```

Use `pnpm install --frozen-lockfile` in CI or when you need an exact match to the
committed lockfile.

### Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Route | Language |
|---|---|
| `/` | Brazilian Portuguese (default) |
| `/en/` | English |
| `/download/`, `/loja/`, `/contribua/` | Portuguese pages |
| `/en/download/`, `/en/store/`, `/en/contribute/` | English pages |

The dev server supports hot reload: saving a file refreshes the affected page.

### Useful development commands

Run these before opening a pull request or after substantive changes:

```bash
pnpm lint                  # ESLint
pnpm exec tsc --noEmit     # TypeScript (catches missing translations)
pnpm audit --audit-level=low
pnpm build                 # verify the static export still succeeds
```

TypeScript checks that every key in `lib/i18n/pt-BR.ts` exists in
`lib/i18n/en.ts`. A missing English string fails the build by design.

### What to expect in development

- **No `.env` file is needed.** The app has no server-side secrets or runtime
  configuration.
- **`pnpm start` is not used for this project.** `next start` serves a Node.js
  application; this site is exported to static files instead. Use `pnpm dev` for
  development and `pnpm build` for production output.
- **Two route trees.** Portuguese lives under `app/(pt)/` at the site root;
  English lives under `app/(en)/en/`. There is no shared `app/layout.tsx`.

---

## Production build

### Build the static site

```bash
pnpm install --frozen-lockfile
pnpm build
```

On success, the complete site is written to **`out/`**. That directory is
self-contained: HTML, hashed JavaScript and CSS under `_next/static/`, fonts,
images and `public/_headers` for hosts that read it.

`next.config.ts` sets `output: "export"` and `trailingSlash: true`, so each
route becomes a folder with an `index.html` inside (for example `out/loja/index.html`).
This layout works on nginx, Netlify, Cloudflare Pages and similar hosts without
URL rewriting.

### Preview the production output locally

To see exactly what will be deployed — not the dev server — serve `out/`:

```bash
pnpm build
npx serve out
```

Open the URL printed by `serve` (usually port 3000 or 5000). Test both themes,
both languages, and key flows (navigation, PIX copy button, video facade) over
**http://localhost** is enough for layout; HTTPS is required on a real origin for
the Clipboard API used by the PIX button.

### Deploy to production

1. Run `pnpm build` in your CI pipeline or on a build machine.
2. Upload or publish **only the contents of `out/`** to your static host.
3. Configure security headers on the host. See [DEPLOYMENT.md](../DEPLOYMENT.md)
   for ready-to-use examples (Netlify, Cloudflare Pages, Vercel, nginx).

There is **no Node process** to run in production. Do not deploy the repository
root or run `pnpm start` on a server unless you are deliberately hosting the
Next.js dev/build toolchain itself.

Example CI steps (matching this repository's workflow):

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
pnpm install --frozen-lockfile
pnpm audit --audit-level=low
pnpm lint
pnpm exec tsc --noEmit
pnpm build
# artifact: ./out
```

### Before the first public deploy

- Set the real site origin in `SITE_URL` inside `lib/metadata.ts`. It is baked
  into canonical URLs, `hreflang` alternates, Open Graph tags and `sitemap.xml`.
- Confirm `/` serves Portuguese and `/en/` serves English with the correct
  `lang` attribute.
- Publish SHA-256 checksums for download files in `lib/i18n/pt-BR.ts` and
  `lib/i18n/en.ts` when the release artifacts are available (see README).

Full post-deploy checklist: [DEPLOYMENT.md § After deploying](../DEPLOYMENT.md#after-deploying).

---

## Troubleshooting

**Wrong Node.js version**

```text
error edsgames-webapp@0.1.0: The engine "node" is incompatible with this module.
```

Install Node.js 22 LTS. The project rejects Node 23 and older major versions.

**pnpm not found or wrong version**

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

**Build fails with a TypeScript error in `lib/i18n/en.ts`**

Add the missing translation key to match `lib/i18n/pt-BR.ts`. Portuguese is the
source of truth; English must mirror every key.

**Blank page or 404 on a static host**

Ensure the host serves directory indexes (`index.html` inside each route folder)
or uses the rewrite rules in [DEPLOYMENT.md](../DEPLOYMENT.md). Routes use
trailing slashes (for example `/loja/` not `/loja`).

**CSP or security header issues after deploy**

The policy lives in `lib/csp.ts` and `public/_headers`. Keep header copies in
sync with the meta tag policy. Details are in [DEPLOYMENT.md](../DEPLOYMENT.md).
