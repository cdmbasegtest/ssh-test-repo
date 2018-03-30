import React from 'react'
import { H1, Header, EmployeesContainer, Search } from './styles'

import { Scrollable } from 'components/ui'
import Employee from './Employee'
import { onlyUpdateForKeys } from 'recompose'

const Employees = ({ employees, onEmployeeLoad }) =>
  <EmployeesContainer>
    <Header>
      <H1>Employees</H1>
    </Header>
    <Scrollable w={1}>
      {employees.map(employee =>
        <Employee
          employee={employee}
          key={employee.id}
          onEmployeeLoad={onEmployeeLoad}
        />
      )}
    </Scrollable>
    <Search placeholder="Search by name" />
  </EmployeesContainer>

export default onlyUpdateForKeys(['employees'])(Employees)
