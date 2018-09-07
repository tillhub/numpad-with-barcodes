# @tillhub/numpad-with-barcodes
> Numpad that detects input from barcode scanners

[![NPM](https://img.shields.io/npm/v/@tillhub/numpad-with-barcodes.svg)](https://www.npmjs.com/package/@tillhub/numpad-with-barcodes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @tillhub/numpad-with-barcodes
```

## Usage

```jsx
import React, { Component } from 'react'

import Numpad from '@tillhub/numpad-with-barcodes'

class Example extends Component {
  render () {
    return (
      <Numpad />
    )
  }
}
```

### Properties

The component accepts optional properties.

| Property              | type     | required | example                                                        | default  | description                                                                                                                                                                                |
|-----------------------|----------|----------|----------------------------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| handleChange          | function | yes      | text => console.log(text)                                      | n/a      | This function will be called with the current text in the input field. It is triggered on every click in the keypad and on every change in the input field.                                |
| searchProduct         | function | yes      | barcode => console.log('search product with barcode', barcode) | n/a      | This function (async optional) will be called with the result after a barcode has been scanned. The component expects a return value of either an object with product information or null. |
| startValue            | string   | no       | '15'                                                           | null     | The input field will be initiated with this value.                                                                                                                                         |
| disabled              | boolean  | no       | true                                                           | false    | If set to true, the input field and the keypad will be greyed out and disabled.                                                                                                            |
| withoutInputField     | boolean  | no       | true                                                           | false    | If set to true, the input field will merely display values but not accept manual entry.                                                                                                    |
| decimalSeparator      | string   | no       | ','                                                            | '.'      | Pass in optional decimal separator. For now, only ',' is allowed as an alternative to '.'.                                                                                                 |
| width                 | string   | no       | '800px'                                                        | '400px'  | Determines the width of the input field and keypad. Both will have equal width.                                                                                                            |
| additionalCounterInfo | node     | no       | <div>of 500</div>                                              | null     | Node will be displayed between the input field and the keypad. For example to indicate a total, e.g. 'of 500'.                                                                             |
| additionalProductInfo | node     | no       | <div>Current Stock: 230</div>                                  | null     | Node will be displayed under the product information field.                                                                                                                                |


```jsx
import React, { Component } from 'react'
import NumPad from '@tillhub/numpad-with-barcodes'
import mockProducts from './mockProducts'

export default class App extends Component {
  state = {
    product: null
  }

  fetchProduct = (barcode) => {
    // do some async API fetching...
  }

  searchProduct = (barcode) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.fetchProduct(barcode)
        this.setState({ product })
        if (product.id) {
          return resolve(product)
        } else {
          return reject(null)
        }
      } catch (err) {
        console.log(err)

        return reject(null)
      }
    })

  }

  renderCurrentStock = () => <div>Current Stock: {this.state.product && this.state.product.stock && this.state.product.stock.qty}</div>
  renderTotal = () => <div style={{ marginBottom: '20px' }}>OUT OF {this.state.product && this.state.product.order_qty || '0'}</div>

  render() {
    return (
      <div>
        <NumPad
          handleChange={value => console.log(value)}
          decimalSeparator=','
          searchProduct={this.searchProduct}
          additionalProductInfo={this.renderCurrentStock()}
          additionalCounterInfo={this.renderTotal()}
      />
      </div>
    )
  }
}

```

## License

MIT © [qtotuan](https://github.com/qtotuan)
