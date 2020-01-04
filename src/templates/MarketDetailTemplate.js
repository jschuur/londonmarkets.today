import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const MarketDetailTemplate = ({ data }) => {
  const { cosmicjsMarkets: market } = data

  return (
    <Layout>
      <main>
      <h1>{market.title}</h1>
      { market.metadata.organiser && 
        <div id="organiserlink">by <Link to={`@${market.metadata.organiser.slug}`}>{market.metadata.organiser.title}</Link></div> }
      </main>
    </Layout>
  )
}

export default MarketDetailTemplate

export const query = graphql`
  query($id: String) {
    cosmicjsMarkets(id: { eq: $id }) {
      title
      metadata {
        organiser {
          slug
          title
        }
      }
    }
  }
`