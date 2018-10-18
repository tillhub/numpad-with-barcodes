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

The component accepts optional properties. It is fully controlled, meaning that it passes changes in the input field to outside, and also expects to be passed the current value as a prop. The same applies to product - this implies that all product search, product selection, handling has to be done outside by the caller of NumPad. As NumPad does not store the product in state, it cannot compare old to new product - increasing value upon scan has also be handled by the caller.

| Property              | type     | required | example                                                        | default                    | description                                                                                                                                                                                |
| --------------------- | -------- | -------- | -------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| handleChange          | function | yes      | text => console.log(text)                                      | n/a                        | This function will be called with the current text in the input field. It is triggered on every click in the keypad and on every change in the input field.                                |
| handleSelectProduct   | function | yes      | text => console.log(text)                                      | n/a                        | This function will be called with the selected product object from the suggestions box.                                                                                                    |
| searchProduct         | function | yes      | barcode => console.log('search product with barcode', barcode) | n/a                        | This function (async optional) will be called with the result after a barcode has been scanned. The component expects a return value of either an object with product information or null. |
| product               | object   | no       | see section 'Product' below                                    | null                       | In order for the NumPad to display product information, the product object has to have specific keys. More details below in 'Product' section.                                             |
| pickedQty             | string   | no       | '15.5'                                                         | '0'                        | The input field will be initiated with this value.                                                                                                                                         |
| orderedQty            | number   | no       | '45'                                                           | null                       | The quantity that was ordered - will be displayed in product information                                                                                                                   |
| disabled              | boolean  | no       | true                                                           | false                      | If set to true, the input field and the keypad will be greyed out and disabled.                                                                                                            |
| withoutInputField     | boolean  | no       | true                                                           | false                      | If set to true, the input field will merely display values but not accept manual entry.                                                                                                    |
| decimalSeparator      | string   | no       | ','                                                            | '.'                        | Pass in optional decimal separator. For now, only ',' is allowed as an alternative to '.'.                                                                                                 |
| width                 | string   | no       | '800px'                                                        | '400px'                    | Determines the width of the input field and keypad. Both will have equal width.                                                                                                            |
| additionalCounterInfo | node     | no       | <div>of 500</div>                                              | null                       | Node will be displayed between the input field and the keypad. For example to indicate a total, e.g. 'of 500'.                                                                             |
| additionalProductInfo | node     | no       | <div>Current Stock: 230</div>                                  | null                       | Node will be displayed under the product information field.                                                                                                                                |
| scanhText             | string   | no       | 'Scan'                                                         | 'Please start scanning...' | Text to show for the scan component.                                                                                                                                                       |
| searchText            | string   | no       | 'Search'                                                       | 'Search'                   | Text to show for the search component.                                                                                                                                                     |


```jsx
import React, { Component } from 'react'
import NumPad from '@tillhub/numpad-with-barcodes'
import mockProducts from './mockProducts'

export default class App extends Component {
  state = {
    product: null,
    qty: '0'
  }

  handleClick = () => {
    // e.g. save something to API and clear product
    this.setState({ product: null })
  }

  fetchProduct = (barcode) => {
    const result = mockProducts.find(product => product.barcode === barcode)
    return new Promise(resolve => window.setTimeout(() => resolve(result), 1000))
  }

  handleBarcode = async barcode => {
    try {
      const product = await this.fetchProduct(barcode)

      if (!product || !product.id) {
        return this.setState({ product: null, qty: '0' })
      }

      // if same product has been scanned increase qty
      // otherwise start from 1
      let newQty = '1'
      if (this.state.product) {
        if (this.state.product.id === product.id) {
          newQty = (parseFloat(this.state.qty) + 1).toString()
        }
      }
      this.setState({ product, qty: newQty })
    } catch (err) {
      console.log(err)
      return this.setState({ product: null, qty: '0' })
    }
  }

  renderCurrentStock = () =>
    <div>Current Stock: {this.state.product && this.state.product.stock && this.state.product.stock.qty}</div>

  renderTotal = () =>
    <div style={{ marginBottom: '20px' }}>OUT OF {(this.state.product && this.state.product.order_qty) || '0'}</div>

  render() {
    return (
      <div>
        <NumPad
          handleChange={value => this.setState({ qty: value })}
          decimalSeparator=','
          handleBarcode={this.handleBarcode}
          additionalProductInfo={this.renderCurrentStock()}
          additionalCounterInfo={this.renderTotal()}
          product={this.state.product}
          value={this.state.qty || '0'} // default to '0' if you never want to show an empty input field
        />
        <button onClick={this.handleClick} style={{ marginTop: '20px' }}>Save</button>
      </div>
    )
  }
}


```

### Product

NumPad expects product to be passed as a prop and this means all product search needs to be done by the caller of the NumPad. The product information needs to be passed as an object with specific keys.

```
// Product object example

{
  "id": "961cdd18-7d6e-4262-8da5-0908737cf8a0",
  "custom_id": "BEM31F011-G13",
  "name": "KISS PROOF LIP CRÈME - Liquid Lipstick - hibiscus",
  "barcode": "5694230071210",
  "stock": {
    "qty": 30
  },
  "order_qty": 100
}
```

## License

MIT © [qtotuan](https://github.com/qtotuan)
