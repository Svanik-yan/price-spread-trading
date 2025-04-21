/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用 ESLint 检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用 TypeScript 类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用图像优化警告
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
