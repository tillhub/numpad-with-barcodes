import React, { Component } from 'react'
import NumPad from '@tillhub/numpad-with-barcodes'
import mockProducts from './mockProducts'

export default class App extends Component {
  state = {
    product: null
  }

  handleClick = () => {
    // e.g. save something to API and clear product
    this.setState({ product: null })
  }

  fetchProduct = (barcode) => {
    const result = mockProducts.find(product => product.barcode === barcode)
    return new Promise(resolve => window.setTimeout(() => resolve(result), 1000))
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
  renderTotal = () => <div style={{ marginBottom: '20px' }}>OUT OF {(this.state.product && this.state.product.order_qty) || '0'}</div>

  render() {
    return (
      <div>
        <NumPad
          handleChange={value => console.log(value)}
          decimalSeparator=','
          searchProduct={this.searchProduct}
          additionalProductInfo={this.renderCurrentStock()}
          additionalCounterInfo={this.renderTotal()}
          product={this.state.product}
        />
        <button onClick={this.handleClick} style={{ marginTop: '20px' }}>Save</button>
      </div>
    )
  }
}
