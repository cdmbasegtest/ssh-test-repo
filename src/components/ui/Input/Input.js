import React, { PureComponent } from 'react'
import styled from 'styled-components'

import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'

import { ENTER, ESCAPE } from 'constants/keyCodes'

class Input extends PureComponent {
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

  triggerEvent(fn, value) {
    if (this.props.name) {
      fn(this.props.name, value)
    } else {
      fn(value)
    }
  }

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value)
    }
  }

  handleChange = event => {
    const { specialType, onChange } = this.props
    let { value } = event.target

    if (specialType === 'integer') {
      value = value ? parseInt(value, 10) : null
      if (isNaN(value)) return
    }

    this.triggerEvent(onChange, value)
  }

  handleFocus = event => {
    const { selectOnFocus, onFocus } = this.props

    if (selectOnFocus) {
      const field = this.refs.field
      const value = field.value

      field.setSelectionRange(0, value.length)
    }

    if (onFocus) onFocus(event.target.value)
  }

  handleKeyDown = event => {
    const { onKeyDown, onSubmit, onCancel } = this.props
    const { value } = event.target

    if (onKeyDown) onKeyDown(event)

    if (onSubmit && event.keyCode === ENTER) {
      event.preventDefault()
      this.triggerEvent(onSubmit, value)
    }

    if (onCancel && event.keyCode === ESCAPE) {
      event.preventDefault()
      this.triggerEvent(onCancel, value)
    }
  }

  render() {
    const {
      disabled,
      placeholder,
      type,
      value,
      maxLength,
      className
    } = this.props

    return (
      <input
        autoComplete="off"
        className={className}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        ref="field"
        type={type}
        value={isNil(value) ? '' : value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

Input.defaultProps = {
  type: 'text'
}

export default styled(Input)`
  background-color: white;
  width: 366px;
  height: 32px;
  border: solid 1px #d7d7d7;
  font-family: Lato;
  font-size: 16px;
  font-weight: bold;
  color: #575757;
  padding: 6px 7px;
`
