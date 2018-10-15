import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import backspaceIcon from '../../images/backspace-icon.svg'
import Button from './Button'
import ValueButtons from './ValueButtons'

const StyledKeyPad = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  grid-auto-rows: 40px;
  user-select: none;
`

const ZeroButton = styled(Button)`
  grid-column: 1/3;
`

const BackButton = styled(Button)`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Keypad({ clickHandler, disabled, decimalSeparator }) {
  return (
    <StyledKeyPad>
      <BackButton text="back" clickHandler={clickHandler} disabled={disabled}>
        <img src={backspaceIcon} />
      </BackButton>
      <ValueButtons clickHandler={clickHandler} disabled={disabled} />
      <ZeroButton text="0" clickHandler={clickHandler} disabled={disabled}>
        0
      </ZeroButton>
      <Button
        text={decimalSeparator}
        clickHandler={clickHandler}
        disabled={disabled}
      >
        {decimalSeparator}
      </Button>
    </StyledKeyPad>
  )
}

Keypad.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  decimalSeparator: PropTypes.string.isRequired
}
