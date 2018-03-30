import React, { PureComponent } from 'react'
import { Flex, Circle as RCircle } from 'rebass'
import { css } from 'styled-components'
import { darken } from 'polished'
import map from 'lodash/map'

const colors = {
  yellow: '#ffe94d',
  orange: '#f7a959',
  red: '#de6f6f',
  pink: '#e997d3',
  purple: '#a797e8',
  blue: '#97cce8',
  green: '#9fe897',
  black: '#9b9b9b',
  gray: '#e0e0e0'
}

const ColorsPalette = ({ onColorSelected, selectedColor }) => {
  return (
    <Flex justify="space-around">
      {map(colors, (value, key) =>
        <CircleColor
          color={key}
          key={key}
          selected={selectedColor === key}
          onSelect={onColorSelected}
        />
      )}
    </Flex>
  )
}

export default ColorsPalette

const Circle = RCircle.extend`
  background-color: ${p => p.defaultColor};
  &:hover {
    background-color: ${p => p.hoverColor};
  }
  ${p =>
    p.selected &&
    css`
    background-color: ${p => p.selectedColor};
    border: 2px solid ${p => p.borderColor};
    box-shadow: 0 2px 12px 2px ${p => p.selectedColor};
  `};
`

class CircleColor extends PureComponent {
  onClick = () => {
    return this.props.onSelect(this.props.color)
  }

  render() {
    const { color, size, selected, ...rest } = this.props
    const defaultColor = colors[color]
    const hoverColor = darken(0.1, defaultColor)
    const selectedColor = darken(0.1, hoverColor)
    const borderColor = darken(0.025, selectedColor)
    return (
      <Circle
        borderColor={borderColor}
        defaultColor={defaultColor}
        hoverColor={hoverColor}
        selected={selected}
        selectedColor={selectedColor}
        size={size ? size : 34}
        onClick={this.onClick}
        {...rest}
      />
    )
  }
}
