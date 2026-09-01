/**
 * Content Security Policy, delivered as a `<meta http-equiv>` tag because a
 * static export has no response-header layer of its own. The host should send
 * the same policy as a real header — see DEPLOYMENT.md — which is also the only
 * way `frame-ancestors` takes effect, since it is ignored in a meta tag.
 *
 * `script-src` has to allow `'unsafe-inline'`: Next.js emits an inline bootstrap
 * script into every exported page and a static export cannot carry a per-request
 * nonce. The exposure is bounded by the rest of the policy — no third-party
 * script origin is allowed at all, the site has no forms, no user input is ever
 * rendered as markup, and `dangerouslySetInnerHTML` appears nowhere in the
 * codebase. DEPLOYMENT.md describes how to tighten this to script hashes at the
 * header level if a host prefers.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'none'",
  // `frame-ancestors` is deliberately absent: a meta tag cannot enforce it, and
  // including it only makes the browser log an error. It is sent as a real
  // header instead — see `public/_headers` and DEPLOYMENT.md.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  // The only third-party origin on the site, and only after the visitor clicks
  // the video facade.
  "frame-src https://www.youtube-nocookie.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");
