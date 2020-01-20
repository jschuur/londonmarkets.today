import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Market from "../components/Market"

const MarketDetailTemplate = ({ data }) => {
  const { cosmicjsMarkets: market } = data

  return (
    <Layout>
      <main>
        <Market market={market} />
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
        opening_hours
        organiser {
          slug
          title
        }
      }
    }
  }
`