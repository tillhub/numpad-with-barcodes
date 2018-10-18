import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CurrentStock from './CurrentStock'
import EANBox from './EANBox'
import ProductName from './ProductName'
import OrderedQty from './OrderedQty'

const StyledBarcode = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`

const StyledProductName = styled.div`
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
`

function ProductInformation({ product, orderedQty }) {
  return (
    <Fragment>
      <EANBox product={product} />
      <ProductName name={product.name || product.product_name} />
      <CurrentStock stock={product && product.stock && product.stock.qty} />
      <OrderedQty qty={orderedQty} />
    </Fragment>
  )
}

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired,
  orderedQty: PropTypes.number.isRequired
}

export default ProductInformation
