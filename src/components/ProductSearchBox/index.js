import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from '../../styles.css'

function ProductSearchBox() {
  return (
    <div className={classnames(styles.productSearchContainer, styles.blink)}>
      Please start scanning
    </div>
  )
}

ProductSearchBox.propTypes = {
  //
}

export default ProductSearchBox
