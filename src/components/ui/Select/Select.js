import React, { PureComponent } from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { width } from 'styled-system'

import isNil from 'lodash/isNil'
import map from 'lodash/map'
import some from 'lodash/some'

import ensureArray from 'helpers/ensureArray'

class Select extends PureComponent {
  handleChange = event => {
    const { name, onChange } = this.props

    const select = event.target
    const selectedOption = select[select.selectedIndex]

    const value = selectedOption.hasAttribute('value')
      ? selectedOption.value
      : null

    if (name) {
      onChange(name, value)
    } else {
      onChange(value)
    }
  }

  renderPlaceholder() {
    const { value, placeholder, children } = this.props

    if (value) return

    if (children) {
      const hasNullOption = some(
        ensureArray(children),
        item => item.props.value === null
      )

      if (hasNullOption) return false
    }

    return (
      <option disabled value="">
        {placeholder}
      </option>
    )
  }

  renderItems() {
    return map(this.props.items, item =>
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    )
  }

  render() {
    const { disabled, value, className } = this.props

    return (
      <select
        className={className}
        disabled={disabled}
        value={isNil(value) ? '' : value}
        onChange={this.handleChange}
      >
        {this.renderPlaceholder()}
        {this.renderItems()}
      </select>
    )
  }
}

Select.propTypes = {
  children: PT.node,
  disabled: PT.bool,
  items: PT.arrayOf(
    PT.shape({
      text: PT.string.isRequired,
      value: PT.string.isRequired
    })
  ),
  name: PT.string.isRequired,
  placeholder: PT.string,
  value: PT.string,
  onChange: PT.func
}

export default styled(Select)`
  width: 332px;
  ${width}
  height: 32px;
  padding: 5px 10px;
  background-color: white;
  font-family: Lato;
  font-size: 16px;
  color: #575757;
`
