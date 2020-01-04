const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const markets = await graphql(`
    query MarketsQuery {
      allCosmicjsMarkets {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  markets.data.allCosmicjsMarkets.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/${slug}`,
      component: path.resolve("./src/templates/MarketDetailTemplate.js"),
      context: {
        id
      },
    })
  })

  const organisers = await graphql(`
    query OrganisersQuery {
      allCosmicjsOrganisers {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)

  organisers.data.allCosmicjsOrganisers.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/@${slug}`,
      component: path.resolve("./src/templates/OrganiserTemplate.js"),
      context: {
        id
      },
    })
  })
}
