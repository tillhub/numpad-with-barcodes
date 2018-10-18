import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  productName: {
    textAlign: 'center',
    fontSize: '25px',
    marginBottom: '20px'
  }
}

function ProductName({ name, classes }) {
  return <div className={classes.productName}>{name || '(no name)'}</div>
}

ProductName.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
}

ProductName.defaultProps = {
  name: null
}

export default withStyles(styles)(ProductName)
