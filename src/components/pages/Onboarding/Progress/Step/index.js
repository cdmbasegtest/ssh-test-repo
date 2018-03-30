import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Flex } from 'rebass'

import { Circle, Name, Index } from './styles'

class Step extends PureComponent {
  handleClick = () => {
    const { step, isSelectable, onSelect } = this.props
    if (isSelectable) onSelect(step.id)
  }

  render() {
    const { step, number } = this.props

    return (
      <Flex align="center" direction="column" onClick={this.handleClick}>
        <Circle {...this.props} align="center" justify="center">
          <Index>
            {number}
          </Index>
        </Circle>

        <Name {...this.props}>
          {step.text}
        </Name>
      </Flex>
    )
  }
}

Step.propTypes = {
  isCompleted: PT.bool.isRequired,
  isSelectable: PT.bool.isRequired,
  isSelected: PT.bool.isRequired,
  number: PT.number.isRequired,
  step: PT.shape({
    id: PT.string.isRequired,
    text: PT.string.isRequired
  }),
  onSelect: PT.func.isRequired
}

export default Step
