require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `London Markets Today`,
    description: `Nearby open London street markets`,
    author: `@joostschuur`,
    siteUrl: 'https://londonmarkets.today',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
        cookieDomain: "londonmarkets.today",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: process.env.COSMIC_JS_BUCKET_SLUG,
        objectTypes: ["markets", "organisers"],
        apiAccess: {
          read_key: process.env.COSMIC_JS_READ_KEY,
        },
      },
    },
    `gatsby-plugin-netlify`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
