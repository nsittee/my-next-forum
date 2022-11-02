require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_CONTEXT_PATH,
  reactStrictMode: true,
}

module.exports = nextConfig
