/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  async rewrites() {
    return [
      {
        source: 'https://15.236.209.222:1337',
        destination: 'http://15.236.209.222:1337',
      },
    ]
  },
};

module.exports = nextConfig;
