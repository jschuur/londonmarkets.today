import React from "react"
import { graphql, Link } from "gatsby";
import useGeolocation from "react-hook-geolocation"
import { getDistance } from "geolib"
import roundTo from "round-to"
import opening_hours from "opening_hours"
import Timespan from "readable-timespan"

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
  var timespan = new Timespan({ millisecond: false, seconds: false })

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

      if(market.metadata.opening_hours) {
        // TODO: handle syntax errors in opening hour data
        let oh = new opening_hours(market.metadata.opening_hours)
        market.open = oh.getState()

        let timeToClosing = new Date(oh.getNextChange()) - Date.now()
        market.nextChange = `closes in ${timespan.parse(timeToClosing)}`;
      }
    }
    // TODO: handle markets with no distance and sort by open
    markets.sort((a, b) => a.distance - b.distance)
  }

  return (
    <Layout>
      <SEO title="Home" />

      <h2>Open markets</h2>
      {geolocation.latitude ? (
        <div className="markets">
        <ul>
          { markets
            .filter(market => market.open)
            .map(market => {
              let mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.metadata.address)}`
              
              return (
                <li key={market.title}>
                  <Link to={`/${market.slug}`}>{market.title}</Link>
                  (<a target="lmdirections" href={mapsLink}>{roundDistance(market.distance)}</a>, {market.nextChange})
                </li>
              )}
            )
          }
        </ul>

        <h2>More markets</h2>
          <ul>
            {markets
              .filter(market => !market.open)
              .map(market => (
                <li key={market.title}>
                  <Link to={`/${market.slug}`}>{market.title}</Link> ({roundDistance(market.distance)})
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <>Grant access to your location to see local markets</>
      )}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allCosmicjsMarkets(filter: {metadata: {active: {eq: true}}}) {
      nodes {
        title
        slug
        metadata {
          opening_hours
          address
          lat
          long
        }
      }
    }
  }
`;
