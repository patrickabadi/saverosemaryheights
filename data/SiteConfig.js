module.exports = {
  blogPostDir: "blogPosts", // The name of directory that contains your posts.
  siteTitle: "Save Rosemary Heights", // Site title.
  siteTitleAlt: "Rosemary Height Community Association", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "http://saverosemaryheights.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "Saving Rosemary Heights", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  siteGATrackingID: "", // Tracking code ID for google analytics.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "Rosemary", // Default category for posts.
  userName: "Rosemary Heights Community Association", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "South Surrey, BC", // User location to display in the author segment.
  userAvatar: "/logos/IMG_6886.png", // User avatar to display in the author segment.
  userDescription:
    "The Rosemary Heights Community association has been formed in order to protect the character of the neighborhood, preserve the sensitive forest lands next to the river, and address the issues of traffic safety and overcrowded schools and amenities.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Join Us",
      url: "http://signup.saverosemaryheights.com",
      iconClassName: "fa fa-sign-in"
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/SaveRosemaryHeights/",
      iconClassName: "fa fa-facebook"
    },
    {
      label: "Email",
      url: "mailto:saverosemaryheights@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2017-2018" // Copyright string for the footer of the website and RSS feed.
};
