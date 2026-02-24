import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/get-started",
        permanent: false,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "sera-ro",
  project: "science-mvp",

  // Only upload source maps in CI / production builds
  silent: !process.env.CI,

  // Upload source maps so stack traces show original code
  widenClientFileUpload: true,

  // Tree-shake Sentry logger from client bundle
  disableLogger: true,

  // Automatically instrument server-side routes
  autoInstrumentServerFunctions: true,
});
