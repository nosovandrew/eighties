// folder types in root dir fixes issues with this modules
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPlugins(
    [
        withPWA({
            pwa: {
                dest: 'public',
                disable: process.env.VERCEL_ENV === 'development',
                // fix sw issue (may cause other bugs!)
                runtimeCaching,
                buildExcludes: [/middleware-manifest.json$/],
            },
        }),
    ], {
        env: {
            MONGODB_URI: process.env.MONGODB_URI,
            API_ENDPOINT: process.env.API_ENDPOINT,
            CRM_BOT: process.env.CRM_BOT,
            CRM_BOT_KEY: process.env.CRM_BOT_KEY,
            VERCEL_ENV: process.env.VERCEL_ENV,
            HOST: process.env.HOST,
        },
        reactStrictMode: true,
    }
);
