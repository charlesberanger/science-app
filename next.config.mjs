import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    // Tree-shake Radix UI packages — lucide-react is already optimized by default
    optimizePackageImports: [
      "@radix-ui/react-avatar",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tooltip",
    ],
  },

  // Prevent three.js / R3F from being bundled server-side (WebGL-only)
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/get-started",
        permanent: true,
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
