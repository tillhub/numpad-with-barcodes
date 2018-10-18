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
  },
  formControl: {
    width: '40rem',
    maxWidth: '80%',
    background: 'transparent'
  },
  input: {
    color: grey[900],
    margin: '5px',
    border: 0,
    padding: 'unset',
    background: 'transparent',
    height: '6rem'
  }
}

class SearchProduct extends React.Component {
  state = {
    suggestions: [],
    value: ''
  }

  getSuggestionValue(suggestion) {
    return suggestion.label
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    this.setState({ value: '', suggestions: [] })
    this.props.handleSelectProduct(suggestion)
  }

  loadSuggestions = value => {
    let matchedSuggestions = []

    this.props
      .searchProduct(value)
      .then(({ data: { starts_with: items } }) => {
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
    const { classes, searchText } = this.props
    const { ...other } = inputProps

    return (
      <FormControl fullWidth className={classes.formControl}>
        <Input
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          className={classes.input}
          disableUnderline
          placeholder={searchText}
          {...other}
        />
      </FormControl>
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

SearchProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  searchProduct: PropTypes.func.isRequired,
  handleSelectProduct: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired
}

export default withStyles(styles)(SearchProduct)
