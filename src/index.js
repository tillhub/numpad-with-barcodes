import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Keypad from '@tillhub/numpad'
import makeBarcodeReader from './utils/makeBarcodeReader'
import ProductInformation from './components/ProductInformation'
import ProductSearchBox from './components/ProductSearchBox'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ width }) => `width: ${width}`};
`

const StyledProductInformationContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

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

  listenerFunc = e => barcodeReader.handleBarcode(e, this.props.handleBarcode)

  render() {
    const {
      disabled,
      withoutInputField,
      decimalSeparator,
      width,
      additionalProductInfo,
      additionalCounterInfo,
      product,
      value,
      searchText,
      scanText,
      handleChange,
      searchProduct
    } = this.props
    return (
      <StyledWrapper width={width}>
        <StyledProductInformationContainer>
          {product ? (
            <React.Fragment>
              <ProductInformation product={product} />
              {additionalProductInfo}
            </React.Fragment>
          ) : (
            <ProductSearchBox
              searchText={searchText}
              scanText={scanText}
              searchProduct={searchProduct}
            />
          )}
        </StyledProductInformationContainer>

        <Keypad
          startValue={value}
          disabled={!product || disabled}
          decimalSeparator={decimalSeparator}
          withoutInputField={withoutInputField}
          handleChange={handleChange}
        >
          {additionalCounterInfo}
        </Keypad>
      </StyledWrapper>
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
  searchText: PropTypes.string,
  scanText: PropTypes.string,
  additionalProductInfo: PropTypes.node,
  additionalCounterInfo: PropTypes.node,
  handleBarcode: PropTypes.func.isRequired,
  searchProduct: PropTypes.func.isRequired,
  product: PropTypes.object
}

NumPad.defaultProps = {
  handleChange: () => {},
  value: '',
  disabled: false,
  withoutInputField: false,
  decimalSeparator: '.',
  width: DEFAULT_WIDTH,
  additionalProductInfo: null,
  additionalCounterInfo: null,
  product: null,
  searchText: 'Search',
  scanText: 'Please start scanning...'
}
