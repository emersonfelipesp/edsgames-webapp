import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The whole site is exported as static HTML. There is no server runtime and
   * no database, which removes every class of server-side vulnerability by
   * construction rather than by configuration.
   */
  output: "export",
  trailingSlash: true,
  images: {
    // Static export cannot run the Next.js image optimizer.
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
