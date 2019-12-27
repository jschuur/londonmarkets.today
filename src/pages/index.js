import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <p>Nearby open London street markets</p>
    <u>
      {data.allCosmicjsMarkets.nodes.map(node => (
        <li>{node.title}</li>
      ))}
    </u>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allCosmicjsMarkets {
      nodes {
        metadata {
          active
          address
          description
          lat
          long
          url
        }
        title
        id
        order
      }
    }
  }
`;
