import React from 'react'
import styled from 'styled-components'

const StyledProductSearch = styled.div`
  background: green;
  width: 100%;
  text-align: center;
  line-height: 100px;
  height: 100px;
  font-size: 20px;
  border-radius: 4px;
`

const StyledProductSearchBlink = styled(StyledProductSearch)`
  animation: blinker 3s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }
`

function ProductSearchBox() {
  return (
    <StyledProductSearchBlink>Please start scanning</StyledProductSearchBlink>
  )
}

export default ProductSearchBox
