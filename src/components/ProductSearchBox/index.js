import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import IconSearch from '@material-ui/icons/Search'
import IconCancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import Search from './SearchProduct'
import styled from 'styled-components'
import Scan from './Scan'

const StyledContainer = styled.div`
  height: 100px;
  width: 100%;
  position: relative;
  line-height: 100px;
  font-size: 20px;
  background: green;
  text-align: center;
  border-radius: 4px;
  animation: ${({ isSearch }) =>
    isSearch ? 'unset' : 'blinker 3s linear infinite'};

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }
`

const StyledProductSuggestionToggle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 10px;
`

class ProductSearchBox extends Component {
  state = {
    search: false
  }

  render() {
    return (
      <StyledContainer isSearch={this.state.search}>
        <div style={{ userSelect: 'none' }}>
          {this.state.search ? (
            <Search
              searchProduct={this.props.searchProduct}
              searchText={this.props.searchText}
              handleProduct={productId => {
                this.props.handleSearchProduct(productId)
                this.setState({ search: false })
              }}
            />
          ) : (
            <Scan scanText={this.props.scanText} />
          )}
        </div>
        {!this.props.handleSearchProduct ? null : (
          <StyledProductSuggestionToggle>
            {!this.state.search ? (
              <Tooltip title={this.props.searchText}>
                <IconButton
                  onClick={() => {
                    this.setState({ search: true })
                  }}
                >
                  <IconSearch style={{ fontSize: 36 }} />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                onClick={() => {
                  this.setState({ search: false })
                }}
              >
                <IconCancel style={{ fontSize: 36 }} />
              </IconButton>
            )}
          </StyledProductSuggestionToggle>
        )}
      </StyledContainer>
    )
  }
}

ProductSearchBox.propTypes = {
  handleSearchProduct: PropTypes.func,
  searchText: PropTypes.string.isRequired,
  scanText: PropTypes.string.isRequired,
  searchProduct: PropTypes.func.isRequired
}

ProductSearchBox.defaultProps = {
  handleSearchProduct: () => {}
}

export default ProductSearchBox
