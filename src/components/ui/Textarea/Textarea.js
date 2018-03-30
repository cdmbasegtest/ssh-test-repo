import React, { PureComponent } from 'react'
import PT from 'prop-types'

import { ENTER } from 'constants/keyCodes'
import styled from 'styled-components';


class Textarea extends PureComponent {
  componentDidMount() {
    if (this.props.autoFocus) this.focus()
  }

  blur() {
    this.refs.field.blur()
  }

  focus = () => {
    const field = this.refs.field
    const value = field.value

    field.focus()
    field.value = ''
    field.value = value
  }

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value)
    }
  }

  handleChange = event => {
    const { name, onChange } = this.props
    const { value } = event.target

    if (name) {
      onChange(name, value)
    } else {
      onChange(value)
    }
  }

  handleKeyDown = event => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }

    if (event.ctrlKey && event.keyCode === ENTER) {
      event.preventDefault()

      if (this.props.onSubmit) {
        this.props.onSubmit(event.target.value)
      }
    }
  }

  render() {
    const { value, placeholder, disabled, rows, maxLength, style, className } = this.props

    return (
      <textarea
        autoComplete="off"
        className={className}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        ref="field"
        rows={rows}
        style={style}
        value={value || ''}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

Textarea.propTypes = {
  autoFocus: PT.bool,
  disabled: PT.bool,
  error: PT.oneOfType([PT.string, PT.bool]),
  maxLength: PT.number,
  name: PT.string,
  placeholder: PT.oneOfType([PT.string, PT.number]),
  rows: PT.oneOfType([PT.string, PT.number]),
  value: PT.oneOfType([PT.string, PT.number]),
  onBlur: PT.func,
  onChange: PT.func,
  onKeyDown: PT.func,
  onSubmit: PT.func
}

Textarea.defaultProps = {
  rows: 3
}

export default styled(Textarea)`
    display: inline-block;
    width: 100%;
    padding: 11px 10px;
    resize: none;
    vertical-align: middle;
    border-radius: 4px;
    outline: none;
    font-size: var(--base-input-font-size);
    transition: border-color .15s ease, background-color .15s ease;

    &:invalid {
      box-shadow: none;
    }

    &::placeholder {
      color: var(--color-gray-700);
    }
`
