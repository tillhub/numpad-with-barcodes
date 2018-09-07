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

  listenerFunc = e =>
    barcodeReader.handleBarcode(e, this.props.searchProduct)

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

    this.props.handleChange(displayText)
  }

  handleKeypadPress = key => {
    const { value } = this.props

    let text

    if (key === 'back') {
      text = removeLastCharacter(value && value.toString())
    } else if (key === 'C') {
      text = '0'
    } else {
      text = value ? `${value.toString()}${key}` : key
    }

    this.setDisplayText(text)
  }

  render() {
    const {
      disabled,
      withoutInputField,
      decimalSeparator,
      width,
      additionalProductInfo,
      additionalCounterInfo,
      product,
      value
    } = this.props

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
          value={value || '0'}
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
  value: PropTypes.string,
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
  value: '0',
  disabled: false,
  withoutInputField: false,
  decimalSeparator: '.',
  width: DEFAULT_WIDTH,
  additionalProductInfo: null,
  additionalCounterInfo: null,
  product: null
}
