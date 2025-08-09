/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://saverosemaryheights.com',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    try {
      const { getAllBlogPosts } = require('./sitemap-helpers')
      
      const blogPosts = getAllBlogPosts()
      
      console.log(`Found ${blogPosts.length} blog posts for sitemap`)
      
      const paths = []
      
      // Add blog posts
      blogPosts.forEach((post) => {
        paths.push({
          loc: post.url,
          lastmod: new Date(post.date).toISOString(),
          changefreq: 'weekly',
          priority: post.featured ? 0.9 : 0.7
        })
      })
      
      console.log(`Generated ${paths.length} additional sitemap paths`)
      return paths
    } catch (error) {
      console.warn('Error generating additional paths:', error.message)
      return []
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ]
  }
}
