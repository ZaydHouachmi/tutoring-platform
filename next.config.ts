import type { NextConfig } from "next";

/**
 * Response headers that close off the common browser-side attacks. They cost
 * nothing and they apply to every route.
 */
const securityHeaders = [
  // Do not let other sites frame this one (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Do not let the browser guess a file is a different type than declared.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin, not the full URL, when leaving the site.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // This site needs none of these, so switch them off.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Force HTTPS for two years once seen over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
