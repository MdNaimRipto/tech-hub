/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_SECRET_KEY: process.env.DB_SECRET_KEY,
    DB_IMAGE_KEY: process.env.DB_IMAGE_KEY,
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
