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
      handleSelectProduct={product => {
        console.log('product', product)
      }}
      value=""
      disabled={false}
      searchProduct={() =>
        Promise.resolve({
          data: {
            starts_with: [
              { id: 'asdf', name: 'asdf', barcode: 'asdf', custom_id: 'asdf' },
              { id: 'qwer', name: 'qwer', barcode: 'qwer', custom_id: 'qwer' },
              { id: 'zxcv', name: 'zxcv', barcode: 'zxcv', custom_id: 'zxcv' }
            ]
          }
        })
      }
    />
  ))
