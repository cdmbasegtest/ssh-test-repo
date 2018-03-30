import React, { PureComponent } from 'react'
import { Cell, Tr, HeaderDate } from './style'
import { Flex } from 'rebass'
import { ButtonCircle } from 'components/ui'

// import MdAdd from 'react-icons/lib/md/add'

const HeaderCell = ({ date }) =>
  <Cell>
    <HeaderDate>
      {date}
    </HeaderDate>
  </Cell>

export default class HeaderRow extends PureComponent {
  render() {
    const { week } = this.props

    return (
      <Tr>
        <Flex align="center" justify="center" w={175}>
          <ButtonCircle
            bg="#4eb2b4"
            color="#fff"
            fontSize="12px"
            h="27px"
            w={140}
          >
            New employee
          </ButtonCircle>
        </Flex>
        {Array.from(week.by('day')).map(day => {
          return (
            <HeaderCell date={day.format('ddd, MMM D')} key={day.format('D')} />
          )
        })}
      </Tr>
    )
  }
}
