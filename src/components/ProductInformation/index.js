import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CurrentStock from './CurrentStock'
import EANBox from './EANBox'
import ProductName from './ProductName'
import OrderedQty from './OrderedQty'

function ProductInformation({ product, orderedQty, text }) {
  return (
    <Fragment>
      <EANBox product={product} />
      <ProductName name={product.name || product.product_name} />
      <CurrentStock
        stockText={text.stock}
        stock={product && product.stock && product.stock.qty}
      />
      <OrderedQty orderedQtyTex={text.orderedQty} qty={orderedQty} />
    </Fragment>
  )
}

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  orderedQty: PropTypes.number.isRequired
}

export default ProductInformation
