module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false, // Temporary redirect
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/donations",
        destination: "https://www.docswithinborders.org/api/donations",
      },
    ];
  },
};
