import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
//import { ButtonCircle } from 'components/ui'
import invoke from 'lodash/invoke'

import { CurrentWeek, Circle } from './style'

import MdArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import MdArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

class WeekSwitch extends PureComponent {
  getWeekTitle = week => {
    const startDateMonth = invoke(week, 'start.format', 'MMMM')
    const endDateMonth = invoke(week, 'end.format', 'MMMM')
    const year = invoke(week, 'end.format', 'YYYY')
    const weekNumber = Math.ceil(invoke(week, 'end.date') / 7)
    if (startDateMonth === endDateMonth) {
      return `${startDateMonth} ${year} : week ${weekNumber}`
    } else {
      return `${startDateMonth} - ${endDateMonth} ${year} : week ${weekNumber}`
    }
  }
  render() {
    const { week } = this.props
    const { onWeekBackward, onWeekForward } = this.props

    return (
      <Flex
        align="center"
        className={this.props.className}
        color="white"
        h={46}
        justify="space-between"
      >
        <Box flex="0 1" w={0.33} />
        <Flex align="center" flex="1 0" justify="center" w={0.33}>
          <Circle mr={25} onClick={onWeekBackward}>
            <MdArrowLeft color="#78736e" size={22} />
          </Circle>
          <CurrentWeek>
            {this.getWeekTitle(week)}
          </CurrentWeek>
          <Circle ml={26} onClick={onWeekForward}>
            <MdArrowRight color="#78736e" size={22} />
          </Circle>
        </Flex>
        <Box flex="0 1" w={0.33}>
          {/*<ButtonCircle>Publish</ButtonCircle>*/}
        </Box>
      </Flex>
    )
  }
}

export default styled(WeekSwitch)`
  width: 100%;
  min-height: 46px;
  background-color: #78736e;
`
