/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "i.pravatar.cc",
      "s2.coinmarketcap.com",
    ],
  },
};

module.exports = nextConfig;
