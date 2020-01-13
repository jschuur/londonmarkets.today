import React from 'react'
import { Link } from 'gatsby'
import roundTo from "round-to"

function roundDistance(distance) {
  if(distance < 1000) {
    return `${distance} m`
  } else {
    return `${roundTo(distance / 1000, 2)} km`
  }
}

export default function MarketList({ markets, title, noMarkets }) {
  console.log(markets);
  return (
    <div className="markets">
      <h2>{ title } { markets && (<>({ markets.length })</>)}</h2>
      { markets.length ? (
        <ul>
          { markets
            .map(market => {
              console.log(market);
              let mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.metadata.address)}`
              
              return (
                <li key={market.title}>
                  <Link to={`/${market.slug}`}>{market.title}</Link>&nbsp;
                  { market.open ? (
                      <>
                        (<a target="lmdirections" href={mapsLink}>{roundDistance(market.distance)}</a>)<br /> 
                        {market.nextChange}
                      </>
                    ) : (
                      <>
                        ({roundDistance(market.distance)})<br />
                        {market.nextChange}
                      </>
                    )}
                </li>
              )
            })
          }
        </ul>
      ) : (
        <p><i>{ noMarkets }</i></p>
      )}
    </div>
  )
}
