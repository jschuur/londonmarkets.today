import React from "react"
import { graphql, Link } from "gatsby";
import useGeolocation from "react-hook-geolocation"
import { getDistance } from "geolib"
import roundTo from "round-to"

import Layout from "../components/layout"
import SEO from "../components/seo"

function roundDistance(distance) {
  if(distance < 1000) {
    return `${distance} m`
  } else {
    return `${roundTo(distance / 1000, 2)} km`
  }
}

const IndexPage = ({ data }) => {
  var markets

  if (!markets) {
    markets = data.allCosmicjsMarkets.nodes
  }

  var geolocation = useGeolocation()

  if (geolocation.latitude && markets) {
    for (const market of markets) {
      if (market.metadata.lat) {
        market.distance = getDistance(
          { latitude: geolocation.latitude, longitude: geolocation.longitude },
          { latitude: market.metadata.lat, longitude: market.metadata.long },
          10
        )
      } else {
        market.distance = null
      }
    }
    // TODO: handle markets with no distance
    markets.sort((a, b) => a.distance - b.distance)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h2>Nearby markets</h2>
      <ul>
      {geolocation.latitude ? (
        <>
          {markets.map(market => (
            <li key={market.title}>
              <Link to={`/${market.slug}`}>{market.title}</Link> ({roundDistance(market.distance)})
            </li>
          ))}
        </>
      ) : (
        <>Grant access to your location to see local markets</>
      )}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allCosmicjsMarkets {
      nodes {
        title
        slug
        metadata {
          lat
          long
        }
      }
    }
  }
`;
