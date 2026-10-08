/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // lets phones on the same Wi-Fi open the dev server (e.g. /waiter)
  allowedDevOrigins: ['192.168.*.*'],
};

export default nextConfig;
