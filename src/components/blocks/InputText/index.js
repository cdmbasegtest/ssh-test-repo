import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { createSuit } from 'helpers/styles'
import './styles.css'

const suit = createSuit('InputText')

class InputText extends PureComponent {
  constructor(props) {
    super(props)

    const placeholder = this.props.placeholder || 'Enter text here'

    this.state = {
      value: '',
      placeholder: placeholder
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  onKeyPress(event) {
    if (this.state.value !== '' && event.key === 'Enter') {
      this.props.onSubmit(this.state.value)

      this.setState({ value: '' })
    }
  }

  render() {
    return (
      <input
        className={suit('')}
        placeholder={this.state.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.onKeyPress}
      />
    )
  }
}

InputText.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func
}

export { InputText }
