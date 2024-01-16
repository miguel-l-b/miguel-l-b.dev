/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://miguellb.net',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://miguellb.net/server-sitemap-index.xml', // <==== Add here
    ],
  },
}
