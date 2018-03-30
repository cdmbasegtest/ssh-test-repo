import React, { PureComponent } from 'react'
import PT from 'prop-types'
import styled from 'styled-components'
import { Avatar } from 'components/ui'
import { Flex } from 'rebass'
import { buildFullname } from 'helpers/employee'
import get from 'lodash/get'
import { onlyUpdateForKeys } from 'recompose'

import { EmployeeName } from './styles'

class Employee extends PureComponent {
  onEmployeeSelect = () => {
    this.props.onEmployeeLoad(this.props.employee.id)
  }

  render() {
    const { employee, ...rest } = this.props
    return (
      <Flex onClick={this.onEmployeeSelect} {...rest}>
        <Avatar small src={get(employee, 'profile.avatar.url')} />
        <EmployeeName>
          {buildFullname(employee)}
        </EmployeeName>
      </Flex>
    )
  }
}

Employee.propTypes = {
  employee: PT.object.isRequired,
  onEmployeeLoad: PT.func.isRequired
}

export default onlyUpdateForKeys(['employee'])(styled(Employee)`
  align-items: center;
  padding-left: 28px;
  background-color: white;
  cursor: pointer;
  height: 60px;

  &:hover {
    background-color: #f6f4f1;
  }
`)
