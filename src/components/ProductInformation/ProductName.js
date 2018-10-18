import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledProductName = styled.div`
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
`

function ProductName({ name }) {
  return <StyledProductName>{name || '(no name)'}</StyledProductName>
}

ProductName.propTypes = {
  name: PropTypes.string
}

ProductName.defaultProps = {
  name: null
}

export default ProductName
