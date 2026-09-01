/**
 * Applies the visitor's stored theme choice before the first paint.
 *
 * This runs as a separate same-origin file rather than an inline snippet for
 * two reasons: the project forbids `dangerouslySetInnerHTML`, and keeping it
 * external means a host that tightens the Content Security Policy to script
 * hashes does not have to hash it.
 *
 * With JavaScript disabled nothing here runs, and the site still follows the
 * operating system through the `prefers-color-scheme` media query in the CSS.
 */
(function () {
  try {
    var stored = window.localStorage.getItem("edsgames-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch {
    /* Private mode, or site data blocked. The media query still applies. */
  }
})();
