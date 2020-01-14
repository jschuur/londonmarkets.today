/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const { title } = data.site.siteMetadata

  return (
    <>
      <Header siteTitle={title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          <a href="https://twitter.com/LDNMarketsToday">@LDNMarketsToday</a> © {new Date().getFullYear()} by <a href="https://twitter.com/joostschuur">Joost Schuur</a> (<Link to={`/about`}>more info</Link>). <br />
          Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a>, <a href="https://cosmicjs.com">Cosmic JS</a> and <a href="https://netlify.com">Netlify</a>.<br />
        </footer>
      </div>
      </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
