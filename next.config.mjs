/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '192.168.29.46',
    '192.168.29.*',
    '192.168.*.*',
    '*.local'
  ],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
