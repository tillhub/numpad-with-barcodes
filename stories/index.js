import React from 'react'
import Numpad from '../src/'

import { storiesOf } from '@storybook/react'

storiesOf('Numpad', module).add('basic', () => (
  <Numpad
    handleChange={() => {}}
    handleBarcode={() => {}}
    startValue="0"
    disabled={false}
  />
))
