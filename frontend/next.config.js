/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    IMAGE_API_KEY: process.env.NEXT_PUBLIC_IMAGE_KEY,
    TEST: process.env.NEXT_PUBLIC_TEST_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
};

module.exports = nextConfig;
