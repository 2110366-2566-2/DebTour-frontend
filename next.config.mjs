/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
