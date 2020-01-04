import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const OrganiserTemplate = ({ data }) => {
  const { cosmicjsOrganisers: organiser } = data
  const { allCosmicjsMarkets: markets } = data


  return (
    <Layout>
      <h1>Markets by {organiser.title}</h1>
      <ul>
        { markets.edges.map(market => (
        <li><Link to={market.node.slug}>{market.node.title}</Link></li>
        ))}
      </ul>
    </Layout>
  )
}

export default OrganiserTemplate

export const query = graphql`
  query($id: String) {
    cosmicjsOrganisers(id: {eq: $id}) {
      title
      id
    }
    allCosmicjsMarkets(filter: {metadata: {organiser: {_id: {eq: $id}}}}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`