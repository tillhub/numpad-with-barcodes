import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledCurrentStock = styled.div`
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  color: grey;
  display: flex;
  justify-content: center;
`

function CurrentStock({ stock, stockText }) {
  return (
    <StyledCurrentStock>
      {stockText}: {stock || '0'}
    </StyledCurrentStock>
  )
}

CurrentStock.propTypes = {
  stock: PropTypes.number,
  stockText: PropTypes.string.isRequired
}

CurrentStock.defaultProps = {
  stock: null
}

export default CurrentStock
