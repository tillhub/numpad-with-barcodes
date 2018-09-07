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
