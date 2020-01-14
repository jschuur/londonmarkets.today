import React, { useState } from 'react'
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
  var [sortByDistance, setSortByDistance] = useState(true)

  //TODO: don't sort in index.js
  if(sortByDistance) {
    markets.sort((a, b) => a.distance - b.distance)
  } else {
    // TODO: sort by distance then time
    markets.sort((a, b) => a.nextChange - b.nextChange)
  }

  return (
    <div className="markets">
      <h2>{ title } { markets && (<>({ markets.length })</>)}</h2>

      { markets.length ? (
        <div className="marketlist">
          {/* TODO: Better toggles */}
          sort by { sortByDistance ? (
            <button onClick={() => { setSortByDistance(false) }}>distance</button>
          ) : (
            <button onClick={() => { setSortByDistance(true) }}>time</button>
          )}
          <ul>
            { markets
              .map(market => {
                let mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.metadata.address)}`
                
                return (
                  <li key={market.title}>
                    <Link to={`/${market.slug}`}>{market.title}</Link>&nbsp;
                    { market.open ? (
                        <>
                          (<a target="lmdirections" href={mapsLink}>{roundDistance(market.distance)}</a>)<br /> 
                          {market.nextChangeStr}
                        </>
                      ) : (
                        <>
                          ({roundDistance(market.distance)})<br />
                          {market.nextChangeStr}
                        </>
                      )}
                  </li>
                )
              })
            }
          </ul>
        </div>
      ) : (
        <p><i>{ noMarkets }</i></p>
      )}
    </div>
  )
}
