/**
 * The pre-paint theme bootstrap, inlined into every document's `<head>`.
 *
 * It was previously `public/theme-init.js`, loaded with a synchronous
 * `<script src>` to keep the project's no-`dangerouslySetInnerHTML` rule
 * intact. Lighthouse measured that round trip at **304 ms of render-blocking
 * time on mobile for 1.1 KB** — by far the largest blocking item on the page.
 *
 * React 19 renders a string child of `<script>` as real inline script text, so
 * this inlines with no `dangerouslySetInnerHTML` and no round trip. The string
 * is a frozen constant: nothing is interpolated into it, ever. If that changes,
 * it stops being safe.
 *
 * `script-src` already allows `'unsafe-inline'` because Next.js emits its own
 * inline bootstrap, so this adds no new permission. A host tightening the
 * policy to hashes must hash this snippet too — see DEPLOYMENT.md.
 */
export const THEME_INIT_SCRIPT =
  '(function(){try{var t=window.localStorage.getItem("edsgames-theme");' +
  'if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}' +
  'catch(e){}})();';
