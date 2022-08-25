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

    config.module.rules.push({
      test: /\.hbs/,
      use: {
        loader: "handlebars-loader",
        options: {},
      },
    });

    return config;
  },
};

module.exports = nextConfig;
