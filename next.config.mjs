/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
