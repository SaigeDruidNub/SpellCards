/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  },
};

module.exports = nextConfig;
