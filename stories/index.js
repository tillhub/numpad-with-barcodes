import React from 'react'
import Numpad from '../src'

import { storiesOf } from '@storybook/react'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>

storiesOf('Numpad', module)
  .addDecorator(CenterDecorator)

  .add('basic', () => (
    <Numpad
      handleChange={() => {}}
      handleBarcode={() => {}}
      value=""
      disabled={false}
      searchProduct={() => {}}
    />
  ))
