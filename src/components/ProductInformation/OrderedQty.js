import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledOrderedQty = styled.div`
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  color: grey;
  display: flex;
  justify-content: center;
`

function OrderedQty({ qty, orderedQtyText }) {
  return (
    <StyledOrderedQty>
      {orderedQtyText}
      <span>: {qty || '---'}</span>
    </StyledOrderedQty>
  )
}

OrderedQty.propTypes = {
  qty: PropTypes.number,
  orderedQtyText: PropTypes.text.isRequired
}

OrderedQty.defaultProps = {
  qty: null
}

export default OrderedQty
