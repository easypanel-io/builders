/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ejs/,
      use: {
        loader: "ejs-compiled-loader",
        options: {
          resourcePath: "./builders",
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
