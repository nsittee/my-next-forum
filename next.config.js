require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CONTEXT_PATH,
  reactStrictMode: true,
  env: {
    CONTEXT_PATH: process.env.CONTEXT_PATH,
  },
}

module.exports = nextConfig
