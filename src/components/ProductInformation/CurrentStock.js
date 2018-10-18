import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  currentStock: {
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '20px',
    color: 'grey',
    display: 'flex',
    justifyContent: 'center'
  }
}

function CurrentStock({ stock, classes }) {
  return (
    <div className={classes.currentStock}>
      currentStock
      <span>: {stock || '0'}</span>
    </div>
  )
}

CurrentStock.propTypes = {
  classes: PropTypes.object.isRequired,
  stock: PropTypes.number
}

CurrentStock.defaultProps = {
  stock: null
}

export default withStyles(styles)(CurrentStock)
