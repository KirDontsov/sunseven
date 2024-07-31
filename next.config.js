const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // renders only 1 time
  reactStrictMode: false,
  cssModules: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  cssLoaderOptions: {
    importLoaders: 1,
  },
  localIdentName: '[]',
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/yandex_cde14065ca884149.html',
    },
    {
      source: '/',
      destination: '/yandex_cd50f689e0fff974.html',
    },
  ],
  experimental: {
    legacyBrowsers: false,
  },
  // effector swc нужен для серверных компонентов
  // experimental: {
  //   swcPlugins: [
  //       "@effector/swc-plugin",
  //       {
  //         "factories": ["src/createEffectStatus", "~/createCommonPending"]
  //       }
  //     ],
  // },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'topvybor',
    project: 'topvybor',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
