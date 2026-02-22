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

export default nextConfig;
