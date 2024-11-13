module.exports = {
  reactStrictMode: true, // Ensure that React Strict Mode is enabled (optional)
  experimental: {
    appDir: true, // Enable this if you're using the App Directory
  },

  // Define your redirects (this is your existing code)
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },

  // Tailwind CSS content configuration (add this to ensure Tailwind compiles correctly)
  future: {
    strictPostcssConfiguration: true, // Optional: Ensures Tailwind works smoothly with PostCSS
  },

  // Purge settings for production (Tailwind CSS 2.x and 3.x)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If using App Directory structure
  ],
};
