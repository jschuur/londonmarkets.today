import React from "react"
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <p>Nearby open London street markets</p>
    <u>
      {data.allCosmicjsMarkets.nodes.map(node => (
        <li><Link to={node.slug}>{node.title}</Link></li>
      ))}
    </u>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allCosmicjsMarkets {
      nodes {
        title
        slug
      }
    }
  }
`;
