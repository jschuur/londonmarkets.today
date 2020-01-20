import React from 'react'
import { Link } from 'gatsby'

export default function Market({ market }) {
  const { organiser, opening_hours } = market.metadata

  return (
    <>
      <h1>{market.title}</h1>

      { organiser && (
        <p>
          A <Link to={`/@${ organiser.slug }`}>{ organiser.title }</Link> market
        </p>
      )}

      { opening_hours && (
        <>
          <h3>Opening Hours</h3>
          { opening_hours }
        </>
      )}

    </>
  )
}
