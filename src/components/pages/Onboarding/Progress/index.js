import React, { PureComponent } from 'react'
import PT from 'prop-types'
import { Flex, Box } from 'rebass'

import includes from 'lodash/includes'
import map from 'lodash/map'

import Step from './Step'

class Progress extends PureComponent {
  render() {
    const { step, steps, completedSteps, onStepSelect } = this.props

    const stepList = map(steps, (item, i) => {
      const isSelected = item.id === step
      const isCompleted = includes(completedSteps, item.id)

      return (
        <Box flex="1 1 auto" key={item.id}>
          <Step
            isCompleted={isCompleted}
            isSelectable={i <= completedSteps.length}
            isSelected={isSelected}
            number={i + 1}
            step={item}
            onSelect={onStepSelect}
          />
        </Box>
      )
    })

    return (
      <Flex align="center">
        {stepList}
      </Flex>
    )
  }
}

Progress.propTypes = {
  completedSteps: PT.arrayOf(PT.string),
  step: PT.string.isRequired,
  steps: PT.arrayOf(
    PT.shape({
      id: PT.string.isRequired,
      text: PT.string.isRequired
    }).isRequired
  ).isRequired,
  onStepSelect: PT.func.isRequired
}

export default Progress
