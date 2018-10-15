import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import styles from '../../styles.css'

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
    <React.Fragment>
      <StyledBarcode>{product.barcode || 'NO BARCODE'}</StyledBarcode>
      <StyledProductName>
        {product.name || product.product_name || '(no name)'}
      </StyledProductName>
    </React.Fragment>
  )
}

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInformation
