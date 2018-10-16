import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledBarcode = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`

const StyledProductName = styled.div`
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
`

function ProductInformation({ product }) {
  return (
    <Fragment>
      <StyledBarcode>{product.barcode || 'NO BARCODE'}</StyledBarcode>
      <StyledProductName>
        {product.name || product.product_name || '(no name)'}
      </StyledProductName>
    </Fragment>
  )
}

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInformation
