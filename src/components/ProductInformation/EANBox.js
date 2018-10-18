import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledContainer = styled.div`
  margin: 30px;
  text-align: center;
`

const StyledTitle = styled.div`
  color: grey;
`

const StyledBarcode = styled.div`
  font-size: 40px;
`

function EANBox({ product, productText }) {
  return (
    <StyledContainer>
      <StyledTitle>{productText}</StyledTitle>
      <StyledBarcode>{product.barcode || 'NO BARCODE'}</StyledBarcode>
    </StyledContainer>
  )
}

EANBox.propTypes = {
  product: PropTypes.object.isRequired,
  productText: PropTypes.string.isRequired
}

export default EANBox
