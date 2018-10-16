import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'just-debounce-it'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { grey } from '@material-ui/core/colors'
import styled from 'styled-components'
// import createSitemapSuggestions from '../../i18n/sitemap-suggestions'

const StyledFormControl = styled(FormControl)`
  width: 40rem;
  max-width: 80%;
  background: transparent;
`

const StyledInput = styled(Input)`
  color: ${grey[900]};
  margin: 5px;
  border: 0;
  padding: unset;
  background: transparent;
  height: 6rem;
`

const styles = {
  container: {
    flexGrow: 1
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: 8,
    marginBottom: 24,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
}

class ProductSearch extends React.Component {
  state = {
    suggestions: [],
    value: ''
  }

  // componentDidMount() {
  //   this.sitemapSuggestions = createSitemapSuggestions(this.props.intl)
  // }

  getSuggestionValue(suggestion) {
    return suggestion.label
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    this.setState({ value: '', suggestions: [] })
    this.props.handleProduct(suggestion)
  }
  // getSectionSuggestions (section) {
  //   const sections = ['Navigation']
  //   // this has no effect until we actually decorate API responses with a type
  //   // it can be handled in many other ways and serves as a placeholder
  //   if (section.type === 'product') sections.push('Product')
  //   return sections
  // }

  loadSuggestions = value => {
    let matchedSuggestions = []

    this.props
      .searchProducts(this.props.clientId, value)
      .then(({ results: { starts_with: items } }) => {
        matchedSuggestions = items.map(item => ({
          id: item.id,
          label: item.name,
          name: item.name,
          barcode: item.barcode,
          custom_id: item.custom_id
        }))
        return this.setState({
          suggestions: matchedSuggestions.slice(0, 20)
        })
      })
      .catch(err => {
        console.log('err', err)
        return this.setState({
          suggestions: [{ label: 'An unexpected error occured' }]
        })
      })
  }

  debouncedLoadSuggestions = debounce(this.loadSuggestions, 500)

  handleSuggestionsFetchRequested = ({ value }) => {
    this.debouncedLoadSuggestions(value)
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  shouldRenderSuggestions(value) {
    // only render suggestions when input is at least 2 characters
    return value.trim().length >= 2
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options

    return (
      <Paper {...containerProps} square style={{ zIndex: 100 }}>
        {children}
      </Paper>
    )
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)

    return (
      <div
        // to={{ pathname: suggestion.route }}
        style={{ textDecoration: 'unset' }}
      >
        <MenuItem selected={isHighlighted} component="div">
          <div>
            {parts.map(
              (part, index) =>
                part.highlight ? (
                  <strong key={String(index)} style={{ fontWeight: 800 }}>
                    {part.text}
                  </strong>
                ) : (
                  <span key={String(index)} style={{ fontWeight: 300 }}>
                    {part.text}
                  </span>
                )
            )}
          </div>
        </MenuItem>
      </div>
    )
  }

  renderInput = inputProps => {
    // const { intl } = this.props
    const { ...other } = inputProps

    return (
      <StyledFormControl fullWidth>
        <StyledInput
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          disableUnderline
          // placeholder={intl.formatMessage({
          //   id: 'pages.dispositions.tooltips.search'
          // })}
          placeholder={this.props.searchText}
          {...other}
        />
      </StyledFormControl>
    )
  }

  render() {
    const { classes } = this.props

    const allSuggestions = [...this.state.suggestions].slice(0, 10)

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        ref={ref => {
          if (!ref) return
          // because the Material UI Input component is stateless, it does not have a `ref` property
          // this hack allows the Autosuggest component to communicate with the input
          ref.input = document.querySelector(`.${classes.input} input`)
        }}
        renderInputComponent={this.renderInput}
        suggestions={allSuggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        // renderSectionTitle={section => this.renderSectionTitle(section, intl)}
        // getSectionSuggestions={this.getSectionSuggestions}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestion={(suggestion, options) =>
          this.renderSuggestion(suggestion, options)
        }
        inputProps={{
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    )
  }
}

ProductSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  searchProducts: PropTypes.func.isRequired,
  handleProduct: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
}

export default withStyles(styles)(ProductSearch)
