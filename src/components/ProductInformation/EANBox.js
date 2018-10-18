import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    margin: '30px',
    textAlign: 'center'
  },
  barcode: {
    fontSize: '40px'
  },
  title: {
    color: 'grey'
  }
}

function EANBox({ product, classes }) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>product</div>
      <div className={classes.barcode}>{product.barcode || 'NO BARCODE'}</div>
    </div>
  )
}

EANBox.propTypes = {
  product: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EANBox)
