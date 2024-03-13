/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;
