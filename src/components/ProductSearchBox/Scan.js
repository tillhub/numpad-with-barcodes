import React from 'react'
import PropTypes from 'prop-types'

function Scan({ scanText }) {
  return <div>{scanText}</div>
}

Scan.propTypes = {
  scanText: PropTypes.string.isRequired
}

export default Scan
