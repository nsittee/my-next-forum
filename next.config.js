require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_CONTEXT_PATH,
  reactStrictMode: true,
  staticPageGenerationTimeout: 180
}

module.exports = nextConfig
