import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles.css'

function ProductInformation({ product }) {
  return (
    <React.Fragment>
      <div className={styles.barcode}>
        {product.barcode || 'NO BARCODE'}
      </div>
      <div className={styles.productName}>{product.name || '(no name)'}</div>
    </React.Fragment>
  )
}

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductInformation
