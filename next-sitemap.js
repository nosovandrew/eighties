module.exports = {
    siteUrl: process.env.HOST || 'http://localhost:3000',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/',
            },
        ],
    },
};
