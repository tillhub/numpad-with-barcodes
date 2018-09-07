import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './styles.css'
import Keypad from './components/Keypad'
import makeBarcodeReader from './utils/makeBarcodeReader'
import {
  removeLastCharacter,
  removeLeadingZero
} from './utils/strings'
import ProductInformation from './components/ProductInformation'
import ProductSearchBox from './components/ProductSearchBox'

const barcodeReader = makeBarcodeReader()
const DEFAULT_WIDTH = '400px'

export default class NumPad extends Component {
  state = {
    input: this.props.startValue || '0',
    product: this.props.product
  }

  componentDidMount() {
    document
      .querySelector('body')
      .removeEventListener('keydown', this.listenerFunc)

    document
      .querySelector('body')
      .addEventListener('keydown', this.listenerFunc)
  }

  componentWillUnmount() {
    document
      .querySelector('body')
      .removeEventListener('keydown', this.listenerFunc)
  }

  componentDidUpdate(prevProps) {
    if (this.props.startValue !== prevProps.startValue) {
      this.setState({ input: this.props.startValue }) // eslint-disable-line react/no-did-update-set-state
    }

    if (this.props.product !== prevProps.product) {
      this.setState({ input: this.props.product }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  listenerFunc = e =>
    barcodeReader.handleBarcode(e, this.handleBarcode)

  handleBarcode = async (barcode) => {
    const { searchProduct } = this.props
    let product

    try {
      product = await searchProduct(barcode)
    } catch (err) {
      console.log(err)
      return null
    }

    let newQty = '1'

    // if same product has been scanned increase qty
    // otherwise start from 1
    if (this.state.product) {
      if (product) {
        if (this.state.product.id === product.id) {
          newQty = (parseFloat(this.state.input) + 1).toString()
        }
      }
    }

    this.setState({ product, input: newQty }, () => {
      this.setDisplayText(this.state.input)
    })
  }

  validate(string) {
    if (string === '') return true

    // regex matches single 0, single minus,
    // positive/negative decimal numbers (up to 2 digits after separator),
    // empty string
    let regex
    if (this.props.decimalSeparator === ',') {
      regex = /^$|^-?(0|[1-9][0-9]*)(,?|,[0-9][0-9]?)$|^-$/g
    } else {
      regex = /^$|^-?(0|[1-9][0-9]*)(\.?|\.[0-9][0-9]?)$|^-$/g
    }

    return regex.test(string)
  }

  // sets internal state for controlled input and executes user's changeHandler
  setDisplayText = (text) => {
    const displayText = removeLeadingZero(text)

    if (!this.validate(displayText)) return null

    return this.setState({ input: displayText }, () => {
      this.props.handleChange(this.state.input)
    })
  }

  handleKeypadPress = key => {
    const { input } = this.state

    let text

    if (key === 'back') {
      text = removeLastCharacter(input && input.toString())
    } else if (key === 'C') {
      text = '0'
    } else {
      text = input ? `${input.toString()}${key}` : key
    }

    this.setDisplayText(text)
  }

  render() {
    const { disabled, withoutInputField, decimalSeparator, width, additionalProductInfo, additionalCounterInfo, product } = this.props
    const { input } = this.state

    return (
      <div className={styles.wrapper} style={{ width }}>
        <div className={styles.productInformationContainer}>
          {product ? (
            <React.Fragment>
              <ProductInformation product={product} />
              {additionalProductInfo}
            </React.Fragment>
          ) : (
            <ProductSearchBox />
          )}
        </div>

        <input
          className={classnames(styles.inputField)}
          value={input || '0'}
          onChange={e => this.setDisplayText(e.target.value)}
          disabled={!product || disabled || withoutInputField}
        />

        {additionalCounterInfo}

        <Keypad
          disabled={!product || disabled}
          clickHandler={this.handleKeypadPress}
          decimalSeparator={decimalSeparator}
        />
      </div>
    )
  }
}

NumPad.propTypes = {
  handleChange: PropTypes.func.isRequired,
  startValue: PropTypes.string,
  disabled: PropTypes.bool,
  withoutInputField: PropTypes.bool,
  decimalSeparator: PropTypes.string,
  width: PropTypes.string,
  additionalProductInfo: PropTypes.node,
  additionalCounterInfo: PropTypes.node,
  searchProduct: PropTypes.func.isRequired,
  product: PropTypes.object
}

NumPad.defaultProps = {
  handleChange: () => { },
  startValue: '0',
  disabled: false,
  withoutInputField: false,
  decimalSeparator: '.',
  width: DEFAULT_WIDTH,
  additionalProductInfo: null,
  additionalCounterInfo: null,
  product: null
}
