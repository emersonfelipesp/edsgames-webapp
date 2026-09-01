# Deployment

`pnpm build` writes a complete static site to `out/`. Any static host can serve
it: there is no Node process, no database and no environment variable to
configure.

```bash
pnpm install
pnpm build
# deploy the contents of ./out
```

`trailingSlash: true` is set in `next.config.ts`, so every route is a directory
with an `index.html` inside it. That is what makes the export work on hosts that
do not rewrite extensionless URLs.

---

## Security headers

The site carries its Content Security Policy in a `<meta http-equiv>` tag,
because a static export has no response-header layer of its own. **The host
should send the same policy as a real header as well**, for two reasons:

- `frame-ancestors` is ignored in a meta tag. Only a real header can stop the
  site being framed, so clickjacking protection depends on this.
- The other headers below — HSTS, `X-Content-Type-Options`, `Permissions-Policy`
  — have no meta-tag equivalent at all.

The policy is defined in `lib/csp.ts`. Keep the two copies in step: if you
change one, change the other.

### The policy

```
default-src 'self';
base-uri 'none';
object-src 'none';
form-action 'none';
frame-ancestors 'none';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self';
media-src 'self';
frame-src https://www.youtube-nocookie.com;
worker-src 'self' blob:;
manifest-src 'self';
upgrade-insecure-requests
```

`frame-src` is the only third-party origin on the whole site, and it is only
reached after a visitor clicks the video facade.

### About `'unsafe-inline'` in `script-src`

Next.js emits an inline bootstrap script into every exported page, and a static
export cannot carry a per-request nonce, so the meta-tag policy has to allow
inline scripts. The exposure is bounded: no external script origin is permitted,
the site has no forms and takes no user input, and nothing is ever rendered as
markup — there is no `dangerouslySetInnerHTML`, `eval` or `new Function` in the
codebase.

A host that wants to tighten this can replace `'unsafe-inline'` with SHA-256
hashes of the inline scripts in the header copy of the policy. Extract them
after a build:

```bash
grep -oP '(?<=<script>).*?(?=</script>)' out/index.html \
  | while read -r s; do printf "'sha256-%s'\n" \
      "$(printf '%s' "$s" | openssl dgst -sha256 -binary | openssl base64)"; done
```

The hashes change on every build, so only do this if your deploy pipeline can
regenerate them automatically. A stale hash list breaks the site completely.

---

## Host configuration

### Netlify, or Cloudflare Pages

Create `out/_headers` as part of the deploy (or commit a `public/_headers`, which
is copied into the export):

```
/*
  Content-Security-Policy: default-src 'self'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-src https://www.youtube-nocookie.com; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable
```

Build command `pnpm build`, publish directory `out`.

### Vercel

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-src https://www.youtube-nocookie.com; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### nginx

```nginx
server {
    listen 443 ssl http2;
    server_name edsgames.com.br www.edsgames.com.br;

    root /var/www/edsgames-webapp/out;
    index index.html;

    add_header Content-Security-Policy "default-src 'self'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-src https://www.youtube-nocookie.com; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }

    location /img/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }
}
```

Note that `add_header` does not inherit into a `location` block that declares
its own, which is why the cache blocks above would otherwise silently drop every
security header. Repeat them, or use `nginx` 1.25+ with an include.

---

## After deploying

- Set the real origin in `SITE_URL` (`lib/metadata.ts`) before the first deploy.
  It is baked into the canonical URLs, the `hreflang` alternates, the Open Graph
  tags and `sitemap.xml`.
- Check that `/` serves Portuguese and `/en/` serves English, each with the
  right `lang` attribute.
- Check that the PIX copy button works over HTTPS. The Clipboard API is
  unavailable on insecure origins, where the button falls back to a selectable
  field.
- Confirm the browser console is free of CSP violations on `/` and
  `/download/`.
