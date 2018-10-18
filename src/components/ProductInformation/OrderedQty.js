import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  orderedQty: {
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '20px',
    color: 'grey',
    display: 'flex',
    justifyContent: 'center'
  }
}

function OrderedQty({ qty, classes }) {
  return (
    <div className={classes.orderedQty}>
      orderedQty
      <span>: {qty || '---'}</span>
    </div>
  )
}

OrderedQty.propTypes = {
  classes: PropTypes.object.isRequired,
  qty: PropTypes.number
}

OrderedQty.defaultProps = {
  qty: null
}

export default withStyles(styles)(OrderedQty)
