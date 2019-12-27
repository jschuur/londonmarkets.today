import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const MarketDetailTemplate = ({ data }) => {
  const { cosmicjsMarkets: market } = data

  return (
    <Layout>
      <h1>{market.title}</h1>
    </Layout>
  )
}

export default MarketDetailTemplate

export const query = graphql`
  query($id: String) {
    cosmicjsMarkets(id: { eq: $id }) {
      title
    }
  }
`