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
  // Sentry org + project — set in .env or Vercel env vars
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in CI / production builds
  silent: !process.env.CI,

  // Upload source maps so stack traces show original code
  widenClientFileUpload: true,

  // Tree-shake Sentry logger from client bundle
  disableLogger: true,

  // Automatically instrument server-side routes
  autoInstrumentServerFunctions: true,
});
