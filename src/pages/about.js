import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About London Markets Today" />
    <h1>About</h1>
    <p>I always got confused whether <Link to={`/borough-market`}>Borough Market</Link> or <Link to={`/broadway-market`}>Broadway Market</Link> was open on Saturdays vs Sundays, so I'm building this site to help me with that. No word on whether this will help me remember how to spell 'Borough Market' though.</p>
    <p>Proof of concept prototype, <a href="https://github.com/jschuur/london-markets/projects/1">TODO's</a> on GitHub.</p>
    <p>Get in touch <a href="mailto:jschuur@jschuur.com">via email</a> or <a href="https://twitter.com/joostschuur">Twitter</a> if you want.</p>
  </Layout>
)

export default AboutPage
