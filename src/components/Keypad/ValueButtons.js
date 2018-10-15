import React from 'react'
import Button from './Button'

const buttonValues = ['C', '7', '8', '9', '4', '5', '6', '1', '2', '3']

export default function ValueButtons({ clickHandler, disabled }) {
  return buttonValues.map(value => (
    <Button
      text={value}
      clickHandler={clickHandler}
      key={value}
      disabled={disabled}
    >
      {value}
    </Button>
  ))
}
