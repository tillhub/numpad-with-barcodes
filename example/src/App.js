import React, { Component } from 'react'
import NumPad from '@tillhub/numpad-with-barcodes'
import mockProducts from './mockProducts'

export default class App extends Component {
  fetchProduct = (barcode) => {
    const result = mockProducts.find(product => product.barcode === barcode)
    return new Promise(resolve => window.setTimeout(() => resolve(result), 1000))
  }

  searchProduct = (barcode) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.fetchProduct(barcode)
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

  render() {
    return (
      <div>
        <NumPad
          handleChange={value => console.log(value)}
          decimalSeparator=','
          searchProduct={this.searchProduct}
          additionalProductInfo={<div>Current Stock: 230</div>}
          additionalCounterInfo={<div style={{ marginBottom: '20px' }}>OUT OF 50</div>}
      />
      </div>
    )
  }
}
