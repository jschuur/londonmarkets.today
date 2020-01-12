import React from "react"
import { graphql, Link } from "gatsby";

import useGeolocation from "react-hook-geolocation"
import { getDistance } from "geolib"
import opening_hours from "opening_hours"
import Timespan from "readable-timespan"
import pluralize from "pluralize"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MarketList from "../components/MarketList"

const IndexPage = ({ data }) => {
  var markets
  var timespan = new Timespan({ millisecond: false, seconds: false })

  // TODO: How often is this being initialized?
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

  var inactiveMarkets = markets.filter(market => !market.metadata.active)

  return (
    <Layout>
      <SEO title="Home" />

      { geolocation.latitude ? (
        <>
          <MarketList 
            title="Open markets" 
            markets={ markets.filter(market => market.open && market.metadata.active)} 
            noMarkets="No markets currently open"/>
          <MarketList
            title="More markets"
            markets={ markets.filter(market => !market.open && market.metadata.active)}
            noMarkets="No markets loaded"/>

      { inactiveMarkets && <p><i>{ inactiveMarkets.length } known { pluralize("markets", inactiveMarkets.length) } are on a break right now</i></p> }
        </>
      ) : (
        <>Grant access to your location to see local markets</>
      )}
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
          opening_hours
          address
          active
          lat
          long
        }
      }
    }
  }
`;
